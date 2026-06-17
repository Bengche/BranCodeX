"use client";

import { useState } from "react";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function LoginPage() {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState(null);
  const [showPw, setShowPw]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res  = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("bx_token", data.token);
        localStorage.setItem("bx_user",  JSON.stringify(data.user));
        setMsg({ type: "success", text: `Welcome back, ${data.user.name}! Redirecting…` });
        setTimeout(() => { window.location.href = "/"; }, 1500);
      } else {
        setMsg({ type: "error", text: data?.error || "Login failed." });
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
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your BranCodeX account.</p>

        {msg && (
          <div className={`auth-msg auth-msg--${msg.type}`}>
            <i className={`fa ${msg.type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"}`} />
            {" "}{msg.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">Email address</label>
            <input id="login-email" type="email" required placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="auth-field auth-field--pw">
            <label htmlFor="login-pw">Password</label>
            <div className="auth-pw-wrap">
              <input id="login-pw" type={showPw ? "text" : "password"} required
                placeholder="Your password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="auth-pw-toggle" onClick={() => setShowPw((v) => !v)}>
                <i className={`fa ${showPw ? "fa-eye-slash" : "fa-eye"}`} />
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? <><i className="fa fa-spinner fa-spin" /> Signing in…</> : "Sign In"}
          </button>
        </form>

        <p className="auth-footer-link">
          Don&apos;t have an account? <Link href="/auth/register">Create one</Link>
        </p>
      </div>
    </main>
  );
}
