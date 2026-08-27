"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const TYPE_LABELS = { css: "CSS", js: "JavaScript", html: "HTML", puzzle: "Puzzle" };

function buildSrcDoc(html, css, js) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}<script>${js}\x3c/script></body></html>`;
}

function ChallengeEditor() {
  const params = useSearchParams();

  const initHtml  = params.get("ch_html")  || "";
  const initCss   = params.get("ch_css")   || "";
  const initJs    = params.get("ch_js")    || "";
  const title     = params.get("ch_title") || "Weekly Challenge";
  const type      = params.get("ch_type")  || "";

  const [html, setHtml]           = useState(initHtml);
  const [css, setCss]             = useState(initCss);
  const [js, setJs]               = useState(initJs);
  const [activeTab, setActiveTab] = useState("html");
  const [srcDoc, setSrcDoc]       = useState("");
  const [saveMsg, setSaveMsg]     = useState("");
  const wrapperRef                = useRef(null);

  useEffect(() => {
    const id = setTimeout(() => setSrcDoc(buildSrcDoc(html, css, js)), 300);
    return () => clearTimeout(id);
  }, [html, css, js]);

  const tabValue  = { html, css, js }[activeTab];
  const tabSetter = { html: setHtml, css: setCss, js: setJs }[activeTab];

  function handleDownload() {
    import("jszip").then(({ default: JSZip }) => {
      const zip = new JSZip();
      zip.file(
        "index.html",
        `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n${html}\n<script src="script.js">\x3c/script>\n</body>\n</html>`,
      );
      zip.file("style.css", css);
      zip.file("script.js", js);
      zip.generateAsync({ type: "blob" }).then((blob) => {
        const url = URL.createObjectURL(blob);
        const a   = document.createElement("a");
        a.href     = url;
        a.download = "challenge-solution.zip";
        a.click();
        URL.revokeObjectURL(url);
      });
    });
  }

  function handleReset() {
    if (!window.confirm("Reset to the original starter code?")) return;
    setHtml(initHtml);
    setCss(initCss);
    setJs(initJs);
  }

  function handleSave() {
    localStorage.setItem("bx_challenge_editor", JSON.stringify({ html, css, js }));
    setSaveMsg("Saved!");
    setTimeout(() => setSaveMsg(""), 2000);
  }

  const typeLabel = TYPE_LABELS[type] || (type ? type.toUpperCase() : null);

  return (
    <main className="challenge-page">
      {/* Header */}
      <header className="challenge-pg-header">
        <div className="challenge-pg-header-inner">
          <Link href="/playground" className="challenge-back-link">
            <i className="fa fa-arrow-left" /> Back to Playground
          </Link>
          <div className="challenge-pg-meta">
            {typeLabel && (
              <span className={`wc-type-badge ${type}`}>{typeLabel}</span>
            )}
            <h1 className="challenge-pg-title">{title}</h1>
          </div>
        </div>
      </header>

      {/* Editor body */}
      <div className="challenge-editor-wrap" ref={wrapperRef}>
        {/* Code pane */}
        <div className="challenge-code-pane">
          <div className="editor-tabs">
            {["html", "css", "js"].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`editor-tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
            {/* Mini toolbar inside pane */}
            <div className="challenge-pane-toolbar">
              <button type="button" className="editor-tool-btn" onClick={handleSave} title="Save to browser">
                <i className="fa fa-floppy-disk" /> Save
              </button>
              {saveMsg && <span className="editor-save-msg">{saveMsg}</span>}
              <button type="button" className="editor-tool-btn" onClick={handleReset} title="Reset to starter code">
                <i className="fa fa-rotate-left" /> Reset
              </button>
              <button type="button" className="editor-tool-btn" onClick={handleDownload} title="Download ZIP">
                <i className="fa fa-download" /> ZIP
              </button>
            </div>
          </div>
          <textarea
            className="editor-textarea challenge-textarea"
            value={tabValue}
            onChange={(e) => tabSetter(e.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>

        {/* Preview pane */}
        <div className="challenge-preview-pane">
          <div className="editor-preview-label">
            <i className="fa fa-eye" /> Preview
          </div>
          <iframe
            title="challenge-preview"
            className="editor-preview-frame"
            srcDoc={srcDoc}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </main>
  );
}

export default function ChallengePage() {
  return (
    <Suspense
      fallback={
        <main className="challenge-page challenge-loading">
          <p>Loading challenge…</p>
        </main>
      }
    >
      <ChallengeEditor />
    </Suspense>
  );
}
