"use client";

import { useState, useEffect } from "react";

// Fallback rate if API is unavailable
const FALLBACK_RATE = 620;

export default function CurrencyBadge() {
  const [rate, setRate] = useState(null);
  const [open, setOpen] = useState(false);
  const [usd, setUsd] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((data) => {
        if (data.result === "success" && data.rates?.XAF) {
          setRate(data.rates.XAF);
        } else {
          setRate(FALLBACK_RATE);
        }
      })
      .catch(() => setRate(FALLBACK_RATE))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !rate) return null;

  const xaf = Math.round(usd * rate).toLocaleString();
  const displayRate = Math.round(rate).toLocaleString();

  return (
    <div className={`currency-badge${open ? " currency-badge--open" : ""}`}>
      <button
        className="currency-badge-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle currency converter"
        title="Live USD / XAF rate"
      >
        <span className="currency-live-dot" aria-hidden="true" />
        <span className="currency-rate-text">
          1 USD ≈ {displayRate} XAF
        </span>
        <i
          className={`fas fa-chevron-${open ? "down" : "up"} currency-chevron`}
        ></i>
      </button>

      {open && (
        <div className="currency-converter-panel">
          <div className="currency-converter-title">
            <i className="fas fa-arrows-rotate"></i> Live Converter
          </div>
          <div className="currency-fields">
            <div className="currency-field">
              <label className="currency-field-label">USD $</label>
              <input
                type="number"
                min="1"
                value={usd}
                onChange={(e) => setUsd(Number(e.target.value) || 1)}
                className="currency-field-input"
              />
            </div>
            <div className="currency-equals">
              <i className="fas fa-equals"></i>
            </div>
            <div className="currency-field">
              <label className="currency-field-label">XAF</label>
              <div className="currency-field-value">{xaf}</div>
            </div>
          </div>
          <p className="currency-source">
            <i className="fas fa-circle-info"></i> Live rate · ExchangeRate-API
          </p>
        </div>
      )}
    </div>
  );
}
