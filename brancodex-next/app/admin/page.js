"use client";

import { useState, useEffect, useCallback } from "react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const TABS = [
  "messages",
  "testimonials",
  "availability",
  "challenges",
  "leaderboard",
  "users",
  "newsletter",
];
const TAB_LABELS = {
  messages: { label: "Messages", icon: "fa-envelope" },
  testimonials: { label: "Testimonials", icon: "fa-star" },
  availability: { label: "Availability", icon: "fa-circle-dot" },
  challenges: { label: "Challenges", icon: "fa-trophy" },
  leaderboard: { label: "Leaderboard", icon: "fa-ranking-star" },
  users: { label: "Users", icon: "fa-users" },
  newsletter: { label: "Newsletter", icon: "fa-paper-plane" },
};

function api(path, token, opts = {}) {
  return fetch(`${BACKEND_URL}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(opts.headers || {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  }).then((r) => r.json());
}

// ── Auth Gate ─────────────────────────────────────────────────────────────────
function AuthGate({ onAuth }) {
  const [email, setEmail] = useState("contact@brancodex.com");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function tryAuth(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        sessionStorage.setItem("bx_admin", data.token);
        onAuth(data.token);
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch {
      setError("Could not reach the server.");
    }
    setLoading(false);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="bran">Bran</span>
          <span className="code">Code</span>
          <span className="x">X</span>
        </div>
        <h1 className="auth-title">Admin Dashboard</h1>
        <p className="auth-sub">Sign in with your admin credentials.</p>
        {error && (
          <div className="auth-msg auth-msg--error">
            <i className="fa fa-triangle-exclamation" /> {error}
          </div>
        )}
        <form className="auth-form" onSubmit={tryAuth}>
          <div className="auth-field">
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              placeholder="contact@brancodex.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-field auth-field--pw">
            <label htmlFor="admin-password">Password</label>
            <div className="auth-pw-wrap">
              <input
                id="admin-password"
                type={showPw ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                <i className={`fa ${showPw ? "fa-eye-slash" : "fa-eye"}`} />
              </button>
            </div>
          </div>
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <i className="fa fa-spinner fa-spin" /> Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

// ── Newsletter Admin Panel ────────────────────────────────────────────────────
function NewsletterAdminPanel({ token, subscribers, onRefresh }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);

  const active = subscribers.filter((s) => s.subscribed);

  async function handleSend(e) {
    e.preventDefault();
    if (!confirm(`Send this newsletter to ${active.length} subscriber(s)?`))
      return;
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/newsletter/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, body }),
      });
      const data = await res.json();
      if (res.ok) {
        setSendResult({
          type: "success",
          text: `Sent to ${data.sent} subscriber(s).${data.failed ? ` (${data.failed} failed)` : ""}`,
        });
        setSubject("");
        setBody("");
      } else {
        setSendResult({ type: "error", text: data?.error || "Send failed." });
      }
    } catch {
      setSendResult({ type: "error", text: "Network error." });
    }
    setSending(false);
  }

  async function handleDelete(id) {
    if (!confirm("Remove this subscriber?")) return;
    await fetch(`${BACKEND_URL}/api/admin/newsletter/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    onRefresh();
  }

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">
        Newsletter — {active.length} active subscriber
        {active.length !== 1 ? "s" : ""}
      </h2>

      {/* Compose & send */}
      <div className="admin-card" style={{ marginBottom: "28px" }}>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 700,
            marginBottom: "16px",
            color: "#f1f5f9",
          }}
        >
          Compose &amp; Send
        </h3>
        <form onSubmit={handleSend}>
          <div className="admin-field">
            <label>Subject</label>
            <input
              type="text"
              required
              maxLength={200}
              placeholder="e.g. New project launched — check it out!"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Message body (plain text or basic HTML)</label>
            <textarea
              required
              rows={8}
              placeholder="Write your update here…"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{
                width: "100%",
                resize: "vertical",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "8px",
                padding: "10px 14px",
                color: "#f1f5f9",
                fontSize: "14px",
              }}
            />
          </div>
          {sendResult && (
            <div
              className={`auth-msg auth-msg--${sendResult.type}`}
              style={{ marginBottom: "12px" }}
            >
              <i
                className={`fa ${sendResult.type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"}`}
              />{" "}
              {sendResult.text}
            </div>
          )}
          <button
            type="submit"
            className="admin-save-btn"
            disabled={sending || active.length === 0}
          >
            {sending ? (
              <>
                <i className="fa fa-spinner fa-spin" /> Sending…
              </>
            ) : (
              <>
                <i className="fa fa-paper-plane" /> Send to {active.length}{" "}
                subscriber{active.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
          {active.length === 0 && (
            <p style={{ color: "#64748b", fontSize: "13px", marginTop: "8px" }}>
              No active subscribers yet.
            </p>
          )}
        </form>
      </div>

      {/* Subscriber list */}
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#94a3b8",
          marginBottom: "12px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        All Subscribers ({subscribers.length})
      </h3>
      {subscribers.length === 0 && (
        <p className="admin-empty">No subscribers yet.</p>
      )}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Subscribed on</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s) => (
            <tr key={s.id}>
              <td>{s.email}</td>
              <td>
                <span
                  className={`admin-status-badge admin-status--${s.subscribed ? "approved" : "rejected"}`}
                >
                  {s.subscribed ? "Active" : "Unsubscribed"}
                </span>
              </td>
              <td>{new Date(s.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  className="admin-action-btn admin-action-btn--reject"
                  onClick={() => handleDelete(s.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ token }) {
  const [tab, setTab] = useState("messages");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const load = useCallback(
    async (t) => {
      setLoading(true);
      const map = {
        messages: "/api/admin/contacts",
        testimonials: "/api/admin/testimonials",
        availability: "/api/admin/availability",
        challenges: "/api/admin/challenges",
        leaderboard: "/api/admin/leaderboard",
        users: "/api/admin/users",
        newsletter: "/api/admin/newsletter",
      };
      try {
        const result = await api(map[t], token);
        setData((prev) => ({ ...prev, [t]: result }));
      } catch {
        /* */
      }
      setLoading(false);
    },
    [token],
  );

  useEffect(() => {
    load(tab);
  }, [tab, load]);

  async function markRead(id) {
    await api(`/api/admin/contacts/${id}/read`, token, {
      method: "PATCH",
      body: {},
    });
    load("messages");
  }

  async function setTestimonialStatus(id, status) {
    await api(`/api/admin/testimonials/${id}`, token, {
      method: "PATCH",
      body: { status },
    });
    load("testimonials");
  }

  async function deleteLeaderboardEntry(id) {
    if (!confirm("Delete this entry?")) return;
    await api(`/api/admin/leaderboard/${id}`, token, { method: "DELETE" });
    load("leaderboard");
  }

  // Availability form
  const avail = data.availability || {};
  const [avStatus, setAvStatus] = useState("");
  const [avMessage, setAvMessage] = useState("");
  useEffect(() => {
    if (data.availability) {
      setAvStatus(data.availability.status || "available");
      setAvMessage(data.availability.message || "");
    }
  }, [data.availability]);

  async function saveAvailability(e) {
    e.preventDefault();
    await api("/api/admin/availability", token, {
      method: "PATCH",
      body: { status: avStatus, message: avMessage },
    });
    load("availability");
    alert("Availability updated.");
  }

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div className="admin-logo">
          <span className="bran">Bran</span>
          <span className="code">Code</span>
          <span className="x">X</span>
          <span className="admin-badge">Admin</span>
        </div>
      </div>

      <div className="admin-layout">
        {/* Sidebar */}
        <nav className="admin-sidebar">
          {TABS.map((t) => (
            <button
              key={t}
              className={`admin-nav-btn${tab === t ? " active" : ""}`}
              onClick={() => setTab(t)}
            >
              <i className={`fa ${TAB_LABELS[t].icon}`} />
              <span>{TAB_LABELS[t].label}</span>
              {t === "messages" && data.messages && (
                <span className="admin-unread-dot">
                  {data.messages.filter((m) => !m.read).length || null}
                </span>
              )}
              {t === "testimonials" && data.testimonials && (
                <span className="admin-unread-dot">
                  {data.testimonials.filter((m) => m.status === "pending")
                    .length || null}
                </span>
              )}
              {t === "newsletter" && data.newsletter && (
                <span className="admin-unread-dot">
                  {data.newsletter.filter((s) => s.subscribed).length || null}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="admin-content">
          {loading && (
            <div className="admin-loading">
              <i className="fa fa-spinner fa-spin" /> Loading…
            </div>
          )}

          {/* MESSAGES */}
          {tab === "messages" && !loading && (
            <div className="admin-section">
              <h2 className="admin-section-title">Contact Messages</h2>
              {(!data.messages || data.messages.length === 0) && (
                <p className="admin-empty">No messages yet.</p>
              )}
              {(data.messages || []).map((m) => (
                <div
                  key={m.id}
                  className={`admin-card${m.read ? " admin-card--read" : ""}`}
                >
                  <div className="admin-card-head">
                    <strong>{m.name}</strong>
                    <a href={`mailto:${m.email}`} className="admin-email-link">
                      {m.email}
                    </a>
                    <span className="admin-date">
                      {new Date(m.created_at).toLocaleDateString()}
                    </span>
                    {!m.read && (
                      <button
                        className="admin-action-btn"
                        onClick={() => markRead(m.id)}
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                  <p className="admin-card-body">{m.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* TESTIMONIALS */}
          {tab === "testimonials" && !loading && (
            <div className="admin-section">
              <h2 className="admin-section-title">Testimonials</h2>
              {(!data.testimonials || data.testimonials.length === 0) && (
                <p className="admin-empty">No testimonials yet.</p>
              )}
              {(data.testimonials || []).map((t) => (
                <div
                  key={t.id}
                  className={`admin-card admin-card--${t.status}`}
                >
                  <div className="admin-card-head">
                    <strong>{t.name}</strong>
                    <span>{"⭐".repeat(t.rating)}</span>
                    <span
                      className={`admin-status-badge admin-status--${t.status}`}
                    >
                      {t.status}
                    </span>
                    <span className="admin-date">
                      {new Date(t.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="admin-card-body">{t.review}</p>
                  <div className="admin-card-actions">
                    {t.status !== "approved" && (
                      <button
                        className="admin-action-btn admin-action-btn--approve"
                        onClick={() => setTestimonialStatus(t.id, "approved")}
                      >
                        Approve
                      </button>
                    )}
                    {t.status !== "rejected" && (
                      <button
                        className="admin-action-btn admin-action-btn--reject"
                        onClick={() => setTestimonialStatus(t.id, "rejected")}
                      >
                        Reject
                      </button>
                    )}
                    {t.status !== "pending" && (
                      <button
                        className="admin-action-btn"
                        onClick={() => setTestimonialStatus(t.id, "pending")}
                      >
                        Set Pending
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AVAILABILITY */}
          {tab === "availability" && !loading && (
            <div className="admin-section">
              <h2 className="admin-section-title">Availability Status</h2>
              <form className="admin-avail-form" onSubmit={saveAvailability}>
                <div className="admin-field">
                  <label>Status</label>
                  <select
                    value={avStatus}
                    onChange={(e) => setAvStatus(e.target.value)}
                  >
                    <option value="available">
                      Available — taking new projects
                    </option>
                    <option value="limited">Limited — partially booked</option>
                    <option value="busy">Busy — not taking new projects</option>
                  </select>
                </div>
                <div className="admin-field">
                  <label>Message (shown on site)</label>
                  <input
                    type="text"
                    value={avMessage}
                    onChange={(e) => setAvMessage(e.target.value)}
                    maxLength={200}
                  />
                </div>
                <button type="submit" className="admin-save-btn">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* CHALLENGES */}
          {tab === "challenges" && !loading && (
            <div className="admin-section">
              <h2 className="admin-section-title">Weekly Challenges</h2>
              {(!data.challenges || data.challenges.length === 0) && (
                <p className="admin-empty">No challenges yet.</p>
              )}
              {(data.challenges || []).map((c) => (
                <div
                  key={c.id}
                  className={`admin-card${c.active ? " admin-card--active" : ""}`}
                >
                  <div className="admin-card-head">
                    <strong>{c.title}</strong>
                    <span className="admin-status-badge">{c.type}</span>
                    {c.active && (
                      <span className="admin-status-badge admin-status--approved">
                        ACTIVE
                      </span>
                    )}
                    <span className="admin-date">Week of {c.week_start}</span>
                  </div>
                  <p className="admin-card-body">{c.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* LEADERBOARD */}
          {tab === "leaderboard" && !loading && (
            <div className="admin-section">
              <h2 className="admin-section-title">Leaderboard Entries</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Game</th>
                    <th>Player</th>
                    <th>Score</th>
                    <th>Badges</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {(data.leaderboard || []).map((e) => (
                    <tr key={e.id}>
                      <td>{e.game}</td>
                      <td>{e.player}</td>
                      <td>{e.score}</td>
                      <td>{(e.badges || []).join(", ") || "—"}</td>
                      <td>{new Date(e.played_at).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="admin-action-btn admin-action-btn--reject"
                          onClick={() => deleteLeaderboardEntry(e.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* USERS */}
          {tab === "users" && !loading && (
            <div className="admin-section">
              <h2 className="admin-section-title">Registered Users</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Verified</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.users || []).map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.verified ? "✅" : "⏳"}</td>
                      <td>{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* NEWSLETTER */}
          {tab === "newsletter" && !loading && (
            <NewsletterAdminPanel
              token={token}
              subscribers={data.newsletter || []}
              onRefresh={() => load("newsletter")}
            />
          )}
        </div>
      </div>
    </main>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("bx_admin") || null;
  });

  if (!token) return <AuthGate onAuth={setToken} />;
  return <Dashboard token={token} />;
}
