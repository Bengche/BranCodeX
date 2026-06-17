"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

function SnippetViewer() {
  const params = useSearchParams();
  const id     = params.get("id") || (typeof window !== "undefined" ? window.location.pathname.split("/").pop() : "");

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    if (!id) { setLoading(false); setError(true); return; }
    fetch(`${BACKEND_URL}/api/snippets/${id}`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((d) => setSnippet(d))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  function forkInEditor() {
    if (!snippet) return;
    const params = new URLSearchParams({
      ch_html: snippet.html,
      ch_css:  snippet.css,
      ch_js:   snippet.js,
    });
    window.location.href = `/playground?${params.toString()}`;
  }

  const srcDoc = snippet
    ? `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${snippet.css}</style></head><body>${snippet.html}<script>${snippet.js}</script></body></html>`
    : "";

  if (loading) return (
    <main className="snippet-page">
      <div className="snippet-loading"><i className="fa fa-spinner fa-spin" /> Loading snippet…</div>
    </main>
  );

  if (error || !snippet) return (
    <main className="snippet-page">
      <div className="snippet-error">
        <i className="fa fa-circle-xmark" />
        <h1>Snippet not found</h1>
        <p>This snippet may have been removed or the link is invalid.</p>
        <Link href="/playground" className="snippet-back-btn">Go to Playground</Link>
      </div>
    </main>
  );

  return (
    <main className="snippet-page">
      <div className="snippet-header">
        <div className="snippet-logo">
          <Link href="/">
            <span className="bran">Bran</span><span className="code">Code</span><span className="x">X</span>
          </Link>
        </div>
        <div className="snippet-meta">
          <span><i className="fa fa-eye" /> {snippet.views} view{snippet.views !== 1 ? "s" : ""}</span>
          <span><i className="fa fa-calendar" /> {new Date(snippet.created_at).toLocaleDateString()}</span>
          <span className="snippet-id">#{snippet.id}</span>
        </div>
        <div className="snippet-actions">
          <button className="snippet-fork-btn" onClick={forkInEditor}>
            <i className="fa fa-code-fork" /> Fork in Editor
          </button>
          <Link href="/playground" className="snippet-back-btn">
            <i className="fa fa-arrow-left" /> Playground
          </Link>
        </div>
      </div>

      <div className="snippet-preview-wrap">
        <iframe
          srcDoc={srcDoc}
          title={`Snippet #${snippet.id}`}
          className="snippet-preview-frame"
          sandbox="allow-scripts"
        />
      </div>

      {/* Tabs showing source */}
      <SnippetCode snippet={snippet} />
    </main>
  );
}

function SnippetCode({ snippet }) {
  const [tab, setTab] = useState("html");
  const content = { html: snippet.html, css: snippet.css, js: snippet.js }[tab] || "";

  return (
    <div className="snippet-code-panel">
      <div className="snippet-code-tabs">
        {["html", "css", "js"].map((t) => (
          <button key={t} className={`snippet-code-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      <pre className="snippet-code-pre"><code>{content || `/* No ${tab} code */`}</code></pre>
    </div>
  );
}

export default function SnippetPage() {
  return (
    <Suspense fallback={null}>
      <SnippetViewer />
    </Suspense>
  );
}
