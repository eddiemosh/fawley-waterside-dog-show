import React, {useEffect, useMemo, useState} from 'react';
import './App.css';

const API_BASE = process.env.REACT_APP_PAYMENT_API || 'https://api.fawleydogshow.com';
// Toggle payments via environment variable. Set REACT_APP_ENABLE_PAYMENTS=true to enable.
const PAYMENTS_ENABLED = process.env.REACT_APP_ENABLE_PAYMENTS === 'true';

const funClasses = [
  {name: 'Best Puppy', key: 'puppy', price: 4},
  {name: 'Prettiest', key: 'prettiest', price: 4},
  {name: 'Handsome', key: 'handsome', price: 4},
  {name: 'Waggiest Tail', key: 'waggiest_tale', price: 4},
  {name: "Child's Best Friend", key: 'childs_best_friend', price: 4},
  {name: 'Scruffiest', key: 'scruffiest', price: 4},
  {name: 'Fluffiest', key: 'fluffiest', price: 4},
  {name: 'Fancy Dress', key: 'fancy_dress', price: 4},
  {name: 'Best Rescue', key: 'best_rescue', price: 4},
  {name: 'Best Trick', key: 'best_trick', price: 4},
];

const money = (value) => `£${Number(value || 0).toFixed(2)}`;

const buildTicketPayload = (quantities, ticketList) => {
  return ticketList.reduce((payload, ticket) => {
    const quantity = quantities[ticket.key] || 0;
    if (quantity > 0) {
      payload[ticket.key] = quantity;
    }
    return payload;
  }, {});
};

function App() {
  const [quantities, setQuantities] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [thankYouOrder, setThankYouOrder] = useState(null);
  const [thankYouLoading, setThankYouLoading] = useState(false);
  const [adminOrders, setAdminOrders] = useState([]);
  const [adminRevenue, setAdminRevenue] = useState(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [orderLookupId, setOrderLookupId] = useState('');
  const [orderLookupResult, setOrderLookupResult] = useState(null);
  const [orderLookupLoading, setOrderLookupLoading] = useState(false);
  const [orderLookupError, setOrderLookupError] = useState('');

  const orderIdFromUrl = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('orderId') || '';
  }, []);

  const sessionIdFromUrl = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('session_id') || '';
  }, []);

  const orderPath = useMemo(() => window.location.pathname, []);
  const isAdminPage = orderPath === '/admin';

  const calculateTicketStats = (orders) => {
    const stats = funClasses.reduce((acc, ticket) => {
      acc[ticket.key] = 0;
      return acc;
    }, {});

    orders.forEach((order) => {
      const tickets = order.regular_class_tickets || {};
      Object.entries(tickets).forEach(([key, quantity]) => {
        if (stats[key] !== undefined) {
          stats[key] += Number(quantity) || 0;
        }
      });
    });

    return stats;
  };

  useEffect(() => {
    const loadAdmin = async () => {
      if (!isAdminPage) return;
      setAdminLoading(true);
      setAdminError('');

      try {
        const [ordersResponse, revenueResponse] = await Promise.all([
          fetch(`${API_BASE}/order`),
          fetch(`${API_BASE}/analytics/revenue`),
        ]);

        const ordersData = await ordersResponse.json();
        const revenueData = await revenueResponse.json();

        if (!ordersResponse.ok) {
          throw new Error(ordersData.detail || 'Failed to load orders.');
        }
        if (!revenueResponse.ok) {
          throw new Error(revenueData.detail || 'Failed to load revenue summary.');
        }

        setAdminOrders(Array.isArray(ordersData) ? ordersData : []);
        setAdminRevenue(revenueData.total_revenue ?? 0);
      } catch (error) {
        setAdminError(error.message || 'Unable to load admin data.');
      } finally {
        setAdminLoading(false);
      }
    };

    loadAdmin();
  }, [isAdminPage]);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderIdFromUrl) return;
      setThankYouLoading(true);
      setErrorMessage('');

      try {
        if (orderPath.endsWith('/order-success')) {
          if (!sessionIdFromUrl) {
            throw new Error('Payment could not be verified. No Stripe session ID was provided.');
          }
          const verifyResponse = await fetch(
            `${API_BASE}/payment/verify?order_id=${orderIdFromUrl}&session_id=${sessionIdFromUrl}`
          );
          const verifyData = await verifyResponse.json();
          if (!verifyResponse.ok || !verifyData.success) {
            throw new Error(verifyData.detail || 'Payment was not completed.');
          }
        } else if (orderPath.endsWith('/order-failure')) {
          setErrorMessage('Payment was not completed. Please try again or contact support.');
          return;
        }

        const response = await fetch(`${API_BASE}/order?order_id=${orderIdFromUrl}`);
        if (!response.ok) {
          throw new Error('Unable to load order details.');
        }
        const data = await response.json();
        if (orderPath.endsWith('/order-success') && !data.order_status) {
          throw new Error('Payment was not completed for this order.');
        }
        setThankYouOrder(data);
      } catch (error) {
        setErrorMessage(error.message || 'Unable to load thank you details.');
        setThankYouOrder(null);
        console.error(error);
      } finally {
        setThankYouLoading(false);
      }
    };
    loadOrder();
  }, [orderIdFromUrl, orderPath, sessionIdFromUrl]);

  const filteredClasses = useMemo(() => {
    if (!searchTerm.trim()) return funClasses;
    return funClasses.filter((ticket) =>
      ticket.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }, [searchTerm]);

  const totalAmount = useMemo(() => {
    return funClasses.reduce((sum, ticket) => {
      const quantity = quantities[ticket.key] || 0;
      return sum + ticket.price * quantity;
    }, 0) * 100;
  }, [quantities]);

  const totalAmountWithDonation = useMemo(() => {
    const donation = parseFloat(donationAmount) || 0;
    return totalAmount + Math.round(donation * 100);
  }, [totalAmount, donationAmount]);

  const selectedCount = useMemo(
    () => Object.values(quantities).reduce((sum, value) => sum + (value || 0), 0),
    [quantities]
  );

  const handleCheckout = async () => {
    if (!PAYMENTS_ENABLED) {
      setErrorMessage('Payments are temporarily disabled. Please check back later.');
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage('Please enter your first and last name before paying.');
      return;
    }

    if (selectedCount === 0) {
      setErrorMessage('Please select at least one class before checkout.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const donation = parseFloat(donationAmount) || 0;
      const payload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email_address: email.trim(),
        doggie_info: {},
        regular_class_tickets: buildTicketPayload(quantities, funClasses),
        donation_amount: donation,
      };

      const response = await fetch(`${API_BASE}/payment/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Payment request failed.');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Payment request did not return a checkout URL.');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Unable to start payment. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Donation is included in the main payment payload as `donation_amount`.

  const handleQuantity = (ticketKey, delta) => {
    setQuantities((prev) => {
      const current = prev[ticketKey] || 0;
      const next = Math.max(0, current + delta);
      return next === 0 ? Object.fromEntries(Object.entries(prev).filter(([key]) => key !== ticketKey)) : {...prev, [ticketKey]: next};
    });
    setErrorMessage('');
  };

  const getOrderSummary = () => {
    const items = [];
    if (!thankYouOrder) return items;

    const combined = {
      ...((thankYouOrder.regular_class_tickets && thankYouOrder.regular_class_tickets) || {}),
    };

    Object.entries(combined).forEach(([key, quantity]) => {
      if (!quantity) return;
      const ticket = funClasses.find((item) => item.key === key) || {name: key, price: 4};
      items.push({name: ticket.name, quantity, price: ticket.price});
    });

    return items;
  };

  const orderSummaryItems = getOrderSummary();

  const adminTicketStats = calculateTicketStats(adminOrders);

  const handleLookupOrder = async (event) => {
    event.preventDefault();
    if (!orderLookupId.trim()) {
      setOrderLookupError('Enter an order ID first.');
      return;
    }

    setOrderLookupLoading(true);
    setOrderLookupError('');
    setOrderLookupResult(null);

    try {
      const response = await fetch(`${API_BASE}/order?order_id=${encodeURIComponent(orderLookupId.trim())}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Order not found.');
      }
      setOrderLookupResult(data);
    } catch (error) {
      setOrderLookupError(error.message || 'Unable to look up order.');
    } finally {
      setOrderLookupLoading(false);
    }
  };

  const renderAdminPage = () => (
    <main className="app-shell light-shell">
      <header className="hero light-hero">
        <p className="eyebrow">Admin</p>
        <h1>Orders and analysis</h1>
        <p className="tagline">View revenue, ticket totals, and search for any order by ID.</p>
        <button className="facebook-button" type="button" onClick={() => (window.location.href = '/')}>Back to home</button>
      </header>

      <section className="section light-section">
        <div className="section-header">
          <div>
            <h2>Summary</h2>
            <p className="section-copy">Live data is loaded from the backend order and analytics endpoints.</p>
          </div>
        </div>
        {adminLoading ? (
          <p className="section-copy">Loading admin data…</p>
        ) : adminError ? (
          <p className="status error">{adminError}</p>
        ) : (
          <div className="admin-stats-grid">
            <article className="admin-stat-card">
              <span>Total revenue</span>
              <strong>{money(adminRevenue)}</strong>
            </article>
            <article className="admin-stat-card">
              <span>Total orders</span>
              <strong>{adminOrders.length}</strong>
            </article>
            <article className="admin-stat-card">
              <span>Paid orders</span>
              <strong>{adminOrders.filter((order) => order.order_status).length}</strong>
            </article>
            <article className="admin-stat-card">
              <span>Donation orders</span>
              <strong>{adminOrders.filter((order) => Number(order.donation_amount || 0) > 0).length}</strong>
            </article>
          </div>
        )}
      </section>

      <section className="section light-section">
        <div className="section-header">
          <div>
            <h2>Ticket analysis</h2>
            <p className="section-copy">Counts are aggregated from all orders currently in the database.</p>
          </div>
        </div>
        <div className="admin-ticket-list">
          {funClasses.map((ticket) => (
            <div key={ticket.key} className="admin-ticket-row">
              <span>{ticket.name}</span>
              <strong>{adminTicketStats[ticket.key] || 0}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section light-section">
        <div className="section-header">
          <div>
            <h2>Order lookup</h2>
            <p className="section-copy">Enter an order ID to fetch the full order record.</p>
          </div>
        </div>
        <form className="admin-lookup-form" onSubmit={handleLookupOrder}>
          <input
            className="search-input"
            type="text"
            value={orderLookupId}
            onChange={(event) => setOrderLookupId(event.target.value)}
            placeholder="Order ID"
          />
          <button className="checkout-button" type="submit" disabled={orderLookupLoading}>
            {orderLookupLoading ? 'Looking up…' : 'Find order'}
          </button>
        </form>
        {orderLookupError && <p className="status error">{orderLookupError}</p>}
        {orderLookupResult && (
          <div className="admin-order-panel">
            <div className="summary-row">
              <span>Order ID</span>
              <strong>{orderLookupResult.order_id}</strong>
            </div>
            <div className="summary-row">
              <span>Name</span>
              <strong>{orderLookupResult.first_name} {orderLookupResult.last_name}</strong>
            </div>
            <div className="summary-row">
              <span>Status</span>
              <strong>{orderLookupResult.order_status ? 'Paid' : 'Pending'}</strong>
            </div>
            <div className="summary-row">
              <span>Total</span>
              <strong>{money(orderLookupResult.amount)}</strong>
            </div>
            {Number(orderLookupResult.donation_amount || 0) > 0 && (
              <div className="summary-row">
                <span>Donation</span>
                <strong>{money(orderLookupResult.donation_amount)}</strong>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="section light-section">
        <div className="section-header">
          <div>
            <h2>Recent orders</h2>
            <p className="section-copy">Most recent entries from the order collection.</p>
          </div>
        </div>
        <div className="admin-orders-list">
          {adminOrders.slice(0, 20).map((order) => (
            <div key={order.order_id} className="admin-order-row">
              <div>
                <strong>{order.first_name} {order.last_name}</strong>
                <p>{order.order_id}</p>
              </div>
              <div>
                <strong>{money(order.amount)}</strong>
                <p>{order.order_status ? 'Paid' : 'Pending'}{Number(order.donation_amount || 0) > 0 ? ` · Donation ${money(order.donation_amount)}` : ''}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );

  const renderThankYouPage = () => (
    <main className="app-shell light-shell">
      <header className="hero light-hero">
        <p className="eyebrow">Order complete</p>
        <h1>Thank you for booking!</h1>
        <p className="tagline">Your order has been received and the ticket summary is below.</p>
      </header>
      <section className="section light-section thank-you-section">
        {thankYouLoading ? (
          <p className="section-copy">Loading your order details…</p>
        ) : errorMessage ? (
          <>
            <p className="thank-you-copy">Payment verification failed.</p>
            <p className="section-copy">{errorMessage}</p>
            <div style={{marginTop: '1rem'}}>
              <button className="checkout-button" type="button" onClick={() => (window.location.href = '/')}>
                Back to home
              </button>
            </div>
          </>
        ) : thankYouOrder ? (
          <>
            <p className="thank-you-copy">Hi {thankYouOrder.first_name || 'Guest'} — your order is confirmed.</p>
            <p className="order-id">Order ID: {thankYouOrder.order_id}</p>
            <div className="order-summary">
              {orderSummaryItems.map((item) => (
                <div key={item.name} className="order-summary-item">
                  <span>{item.name} × {item.quantity}</span>
                  <strong>£{(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>
            {thankYouOrder.donation_amount && Number(thankYouOrder.donation_amount) > 0 && (
              <div className="order-summary-item" style={{marginTop: '0.5rem'}}>
                <span>Donation</span>
                <strong>£{Number(thankYouOrder.donation_amount).toFixed(2)}</strong>
              </div>
            )}
            <div className="summary-row" style={{marginTop: '1rem', fontWeight: 700}}>
              <span>Total paid</span>
              <strong>£{Number(thankYouOrder.amount).toFixed(2)}</strong>
            </div>
            <button
              className="facebook-button"
              type="button"
              onClick={() => window.open('https://www.facebook.com/profile.php?id=61554694584616', '_blank')}
            >
              Visit our Facebook page
            </button>
            <div style={{marginTop: '1rem'}}>
              <button className="checkout-button" type="button" onClick={() => (window.location.href = '/')}>
                Back to home
              </button>
            </div>
          </>
        ) : (
          <p className="section-copy">We could not find your order. Please contact support if you need help.</p>
        )}
      </section>
    </main>
  );

  if (isAdminPage) {
    return renderAdminPage();
  }

  if (orderIdFromUrl) {
    return renderThankYouPage();
  }

  return (
    <main className="app-shell light-shell">
      <header className="hero light-hero">
        <p className="eyebrow">Sunday 6th Sept</p>
        <h1>Fawley Waterside Dog Show</h1>
        <p className="tagline">Book your fun class tickets now. No account needed.</p>
      </header>

      <section className="section light-section">
        <div className="section-header header-with-search">
          <div>
            <h2>Fun classes available</h2>
            <p className="section-copy">Choose any of these fun classes below. Each class is priced at £4.</p>
          </div>
          <span className="badge light-badge">{selectedCount} selected</span>
        </div>
        <div className="search-row">
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search classes..."
          />
        </div>
        <div className="ticket-grid">
          {filteredClasses.map((ticket) => {
            const quantity = quantities[ticket.key] || 0;
            return (
              <article key={ticket.key} className={`ticket-card light-card ${quantity > 0 ? 'selected' : ''}`}>
                <div>
                  <p className="ticket-type">{ticket.name}</p>
                  <p className="ticket-price">£{ticket.price}</p>
                </div>
                <div className="quantity-control">
                  <button
                    className="qty-btn"
                    type="button"
                    aria-label={`Remove one ${ticket.name}`}
                    onClick={() => handleQuantity(ticket.key, -1)}
                    disabled={quantity === 0}
                  >
                    −
                  </button>
                  <span className="qty-count">{quantity}</span>
                  <button
                    className="qty-btn"
                    type="button"
                    aria-label={`Add one ${ticket.name}`}
                    onClick={() => handleQuantity(ticket.key, 1)}
                  >
                    +
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="event-note">
          Final events: Sausage & Spoon Race and Overall Best in Show happen at the end and are not purchasable.
        </p>
      </section>

      <section className="section contact-section light-section">
        <div className="section-header">
          <div>
            <h2>Customer details</h2>
            <p className="section-copy">First and last name are required. Email is optional for receipts.</p>
          </div>
        </div>
        <div className="contact-grid">
          <label className="field">
            <span>First name *</span>
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Required"
            />
          </label>
          <label className="field">
            <span>Last name *</span>
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Required"
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Optional for receipt"
            />
          </label>
        </div>
      </section>

      <aside className="summary-sheet light-sheet">
        <div className="summary-row">
          <span>Selected classes</span>
          <strong>{selectedCount}</strong>
        </div>
        <div className="summary-row">
          <span>Payment total</span>
          <strong>£{(totalAmountWithDonation / 100).toFixed(2)}</strong>
        </div>
        {PAYMENTS_ENABLED ? (
          <>
              <div style={{marginBottom: '0.75rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem'}}>Donate (optional)</label>
                <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Amount £"
                    style={{flex: '1'}}
                  />
                  <span style={{fontSize: '0.9rem', color: '#475569'}}>will be added to total</span>
                </div>
              </div>
              <button className="checkout-button" type="button" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Starting payment...' : `Pay £${(totalAmountWithDonation / 100).toFixed(2)}`}
              </button>
            <p className="summary-note">Secure Stripe checkout. No account creation required.</p>
          </>
        ) : (
          <>
            <button className="checkout-button" type="button" disabled>
              Payments temporarily disabled
            </button>
            <p className="summary-note">Payments are disabled while we perform maintenance.</p>
          </>
        )}
        {errorMessage && <p className="status error">{errorMessage}</p>}
      </aside>
    </main>
  );
}

export default App;
