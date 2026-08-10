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
  const [thankYouOrder, setThankYouOrder] = useState(null);
  const [thankYouLoading, setThankYouLoading] = useState(false);

  const orderIdFromUrl = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('orderId') || '';
  }, []);

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderIdFromUrl) return;
      setThankYouLoading(true);
      try {
        const response = await fetch(`${API_BASE}/order?order_id=${orderIdFromUrl}`);
        if (!response.ok) {
          throw new Error('Unable to load order details.');
        }
        const data = await response.json();
        setThankYouOrder(data);
      } catch (error) {
        setErrorMessage('Unable to load thank you details.');
        console.error(error);
      } finally {
        setThankYouLoading(false);
      }
    };
    loadOrder();
  }, [orderIdFromUrl]);

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
      const payload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email_address: email.trim(),
        doggie_info: {},
        regular_class_tickets: buildTicketPayload(quantities, funClasses),
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
            <div className="summary-row" style={{marginTop: '1rem', fontWeight: 700}}>
              <span>Total paid</span>
              <strong>£{Number(thankYouOrder.amount).toFixed(2)}</strong>
            </div>
            <button
              className="facebook-button"
              type="button"
              onClick={() => window.open('https://facebook.com/fawleydogshow', '_blank')}
            >
              Visit our Facebook page
            </button>
          </>
        ) : (
          <p className="section-copy">We could not find your order. Please contact support if you need help.</p>
        )}
      </section>
    </main>
  );

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
          <strong>£{(totalAmount / 100).toFixed(2)}</strong>
        </div>
        {PAYMENTS_ENABLED ? (
          <>
            <button className="checkout-button" type="button" onClick={handleCheckout} disabled={loading}>
              {loading ? 'Starting payment...' : `Pay £${(totalAmount / 100).toFixed(2)}`}
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
