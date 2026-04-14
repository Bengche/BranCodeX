"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bcx_cookie_consent");
    if (!stored) setTimeout(() => setShow(true), 2000);
  }, []);

  const accept = () => {
    localStorage.setItem("bcx_cookie_consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("bcx_cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        <div className="cookie-icon">
          <i className="fas fa-cookie-bite"></i>
        </div>
        <div className="cookie-text">
          <strong>We use cookies</strong>
          <p>
            We use cookies to improve your experience, analyze site traffic, and
            understand how visitors use our site. You can accept or decline
            non-essential cookies.
          </p>
        </div>
        <div className="cookie-actions">
          <button onClick={accept} className="cookie-btn cookie-btn--accept">
            Accept All
          </button>
          <button onClick={decline} className="cookie-btn cookie-btn--decline">
            Decline
          </button>
        </div>
        <button
          className="cookie-close"
          onClick={decline}
          aria-label="Close cookie banner"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}
