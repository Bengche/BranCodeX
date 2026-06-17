"use client";

import { useState } from "react";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function RegisterPage() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState(null); // { type: 'success'|'error', text }
  const [showPw, setShowPw]     = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) return setMsg({ type: "error", text: "Passwords do not match." });

    setLoading(true);
    setMsg(null);
    try {
      const res  = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({ type: "success", text: "Account created! Check your email for a verification link." });
        setName(""); setEmail(""); setPassword(""); setConfirm("");
      } else {
        const first = data?.errors?.[0]?.msg || data?.error || "Registration failed.";
        setMsg({ type: "error", text: first });
      }
    } catch {
      setMsg({ type: "error", text: "Network error. Please try again." });
    }
    setLoading(false);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="bran">Bran</span><span className="code">Code</span><span className="x">X</span>
        </div>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Join the BranCodeX community — free, forever.</p>

        {msg && (
          <div className={`auth-msg auth-msg--${msg.type}`}>
            <i className={`fa ${msg.type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"}`} />
            {" "}{msg.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="reg-name">Full name</label>
            <input id="reg-name" type="text" required placeholder="Beng Brandon"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="auth-field">
            <label htmlFor="reg-email">Email address</label>
            <input id="reg-email" type="email" required placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="auth-field auth-field--pw">
            <label htmlFor="reg-pw">Password</label>
            <div className="auth-pw-wrap">
              <input id="reg-pw" type={showPw ? "text" : "password"} required
                placeholder="Min. 8 chars, 1 uppercase, 1 number"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="auth-pw-toggle" onClick={() => setShowPw((v) => !v)}>
                <i className={`fa ${showPw ? "fa-eye-slash" : "fa-eye"}`} />
              </button>
            </div>
          </div>
          <div className="auth-field">
            <label htmlFor="reg-confirm">Confirm password</label>
            <input id="reg-confirm" type={showPw ? "text" : "password"} required
              placeholder="Repeat your password"
              value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? <><i className="fa fa-spinner fa-spin" /> Creating account…</> : "Create Account"}
          </button>
        </form>

        <p className="auth-footer-link">
          Already have an account? <Link href="/auth/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
