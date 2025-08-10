import React, { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [email_address, setEmail_address] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [ratings, setRatings] = useState({
    activities: 0,
    value_for_money: 0,
    atmosphere: 0,
    food_and_drinks: 0,
    vendors: 0,
    overall_experience: 0,
  });

  const aspects = [
    { key: 'activities', label: 'Activities' },
    { key: 'value', label: 'Value for Money' },
    { key: 'atmosphere', label: 'Atmosphere' },
    { key: 'food', label: 'Food and Drink' },
    { key: 'vendors', label: 'Other Vendors' },
    { key: 'overall', label: 'Overall Experience' },
  ];

  const handleStarClick = (aspect, value) => {
    setRatings(r => ({ ...r, [aspect]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!feedback.trim()) {
      setError('Feedback is required.');
      return;
    }
    try {
      // Replace with your actual API endpoint
      const res = await fetch('api.fawleydogshow.com/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback, email_address, ratings }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Failed to submit feedback.');
      }
    } catch {
      setError('Failed to submit feedback.');
    }
  };

  if (submitted) {
    return (
      <div style={{ marginTop: 40, textAlign: 'center', padding: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: '#2d7a5f' }}>Thank you for your feedback!</h2>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 420,
      margin: '32px auto',
      padding: '24px 16px',
      border: '1px solid #e0e0e0',
      borderRadius: 16,
      background: '#fff',
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#2d7a5f' }}>Customer Feedback</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>Rate the following aspects:</div>
          {aspects.map(({ key, label }) => (
            <div key={key} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ minWidth: 110 }}>{label}:</span>
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  onClick={() => handleStarClick(key, star)}
                  style={{
                    cursor: 'pointer',
                    color: ratings[key] >= star ? '#FFD600' : '#BDBDBD',
                    fontSize: 28,
                    transition: 'color 0.15s',
                    userSelect: 'none',
                  }}
                  aria-label={star + ' star'}
                  role="button"
                >
                  ★
                </span>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="feedback" style={{ fontWeight: 500, fontSize: 16 }}>Your Feedback <span style={{ color: '#e57373' }}>*</span></label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            rows={5}
            style={{
              width: '100%',
              marginTop: 8,
              borderRadius: 10,
              border: '1px solid #bdbdbd',
              padding: 12,
              fontSize: 16,
              resize: 'vertical',
              background: '#fafafa',
              boxSizing: 'border-box',
            }}
            required
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="email" style={{ fontWeight: 500, fontSize: 16 }}>Email (optional, for us to contact you)</label>
          <input
            id="email"
            type="email"
            value={email_address}
            onChange={e => setEmail_address(e.target.value)}
            style={{
              width: '100%',
              marginTop: 8,
              borderRadius: 10,
              border: '1px solid #bdbdbd',
              padding: 12,
              fontSize: 16,
              background: '#fafafa',
              boxSizing: 'border-box',
            }}
            placeholder="Leave blank to stay anonymous"
            autoComplete="email"
          />
        </div>
        <div style={{ marginBottom: 20, color: '#888', fontSize: 15, textAlign: 'left' }}>
          {email_address.trim() === '' ? 'Submitting as: Anonymous' : `Submitting as: ${email_address}`}
        </div>
        {error && <div style={{ color: '#e57373', marginBottom: 16, fontWeight: 500 }}>{error}</div>}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px 0',
            background: 'linear-gradient(90deg, #2d7a5f 0%, #4caf50 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 1,
            boxShadow: '0 2px 8px rgba(76,175,80,0.08)',
            marginTop: 8,
            transition: 'background 0.2s',
          }}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
