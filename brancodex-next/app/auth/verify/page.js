"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

function VerifyInner() {
  const params = useSearchParams();
  const token  = params.get("token");
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [msg, setMsg]       = useState("");

  useEffect(() => {
    if (!token) return setStatus("error"), setMsg("No verification token found in this link.");

    fetch(`${BACKEND_URL}/api/auth/verify?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) { setStatus("success"); setMsg(data.message); }
        else         { setStatus("error");   setMsg(data.error || "Verification failed."); }
      })
      .catch(() => { setStatus("error"); setMsg("Network error. Please try again."); });
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="auth-page">
      <div className="auth-card auth-card--verify">
        <div className="auth-logo">
          <span className="bran">Bran</span><span className="code">Code</span><span className="x">X</span>
        </div>

        {status === "loading" && (
          <>
            <div className="auth-verify-icon auth-verify-icon--loading">
              <i className="fa fa-spinner fa-spin" />
            </div>
            <h1 className="auth-title">Verifying your email…</h1>
            <p className="auth-sub">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="auth-verify-icon auth-verify-icon--success">
              <i className="fa fa-circle-check" />
            </div>
            <h1 className="auth-title">Email Verified!</h1>
            <p className="auth-sub">{msg}</p>
            <p className="auth-sub" style={{ marginTop: 4 }}>
              A welcome email has been sent to your inbox.
            </p>
            <Link href="/auth/login" className="auth-submit-btn" style={{ display: "block", marginTop: 24, textAlign: "center", textDecoration: "none" }}>
              Continue to Sign In
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="auth-verify-icon auth-verify-icon--error">
              <i className="fa fa-circle-xmark" />
            </div>
            <h1 className="auth-title">Verification Failed</h1>
            <p className="auth-sub">{msg}</p>
            <p className="auth-sub" style={{ marginTop: 4 }}>
              The link may have expired. Register again to get a new one.
            </p>
            <Link href="/auth/register" className="auth-submit-btn" style={{ display: "block", marginTop: 24, textAlign: "center", textDecoration: "none" }}>
              Back to Register
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyInner />
    </Suspense>
  );
}
