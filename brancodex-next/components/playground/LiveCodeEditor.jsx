/**
 * components/playground/LiveCodeEditor.jsx
 *
 * Three-pane live code editor: HTML, CSS, JS — with an iframe preview.
 * 'use client' — all browser interaction.
 *
 * Features (from original):
 *  - Live preview via srcDoc iframe
 *  - Toolbar: Run, Reset, Format, Download ZIP (JSZip), Fullscreen, Dark mode
 *  - Template loader dropdown
 *  - Persists code to localStorage
 */

'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Templates ────────────────────────────────────────────────────────────────

const TEMPLATES = {
  blank: { html: '', css: '', js: '' },
  hello: {
    html: `<h1 id="msg">Hello, World!</h1>
<button onclick="changeText()">Click me</button>`,
    css: `body {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}
h1 { color: #3b82f6; }
button {
  margin-top: 20px;
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}`,
    js: `function changeText() {
  document.getElementById('msg').textContent = 'BranCodeX — Building the web!';
}`,
  },
  counter: {
    html: `<h1>Counter: <span id="count">0</span></h1>
<div class="btns">
  <button onclick="update(-1)">&#8722;</button>
  <button onclick="update(1)">&#43;</button>
  <button onclick="reset()">Reset</button>
</div>`,
    css: `body {
  font-family: sans-serif;
  text-align: center;
  margin-top: 80px;
}
h1 { font-size: 2rem; }
.btns button {
  margin: 0 6px;
  padding: 8px 22px;
  font-size: 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #6366f1;
  color: white;
}`,
    js: `let n = 0;
function update(d) {
  n += d;
  document.getElementById('count').textContent = n;
}
function reset() { n = 0; document.getElementById('count').textContent = 0; }`,
  },
  card: {
    html: `<div class="card">
  <img src="https://i.pravatar.cc/100" alt="avatar" />
  <h2>Jane Doe</h2>
  <p>Web Developer · Cameroon</p>
  <a href="#">View profile</a>
</div>`,
    css: `body { display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f0f4ff; }
.card {
  background: white;
  border-radius: 12px;
  padding: 32px 40px;
  text-align: center;
  box-shadow: 0 4px 24px rgba(99,102,241,.15);
}
.card img { border-radius: 50%; width: 80px; height: 80px; }
.card h2 { margin: 12px 0 4px; }
.card p { color: #64748b; margin-bottom: 16px; }
.card a {
  background: #6366f1; color: white;
  padding: 8px 20px; border-radius: 6px;
  text-decoration: none;
}`,
    js: '',
  },
};

const TEMPLATE_LABELS = {
  blank:   'Blank',
  hello:   'Hello World',
  counter: 'Counter App',
  card:    'Profile Card',
};

const LS_KEY = 'bx_live_editor';

function loadSaved() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LiveCodeEditor() {
  const saved = typeof window !== 'undefined' ? loadSaved() : null;

  const [html,      setHtml]      = useState(saved?.html ?? TEMPLATES.hello.html);
  const [css,       setCss]       = useState(saved?.css  ?? TEMPLATES.hello.css);
  const [js,        setJs]        = useState(saved?.js   ?? TEMPLATES.hello.js);
  const [activeTab, setActiveTab] = useState('html');
  const [darkMode,  setDarkMode]  = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [saveMsg,   setSaveMsg]   = useState('');

  const previewRef = useRef(null);
  const wrapperRef = useRef(null);

  /** Build the srcdoc from current panes */
  const buildSrcDoc = () =>
    `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`;

  /** Sync preview whenever code changes */
  const [srcDoc, setSrcDoc] = useState('');
  useEffect(() => {
    const id = setTimeout(() => setSrcDoc(buildSrcDoc()), 300);
    return () => clearTimeout(id);
  }, [html, css, js]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Save to localStorage */
  function handleSave() {
    localStorage.setItem(LS_KEY, JSON.stringify({ html, css, js }));
    setSaveMsg('Saved!');
    setTimeout(() => setSaveMsg(''), 2000);
  }

  /** Download HTML + CSS + JS as a ZIP file */
  async function handleDownload() {
    const JSZip = (await import('jszip')).default;
    const zip   = new JSZip();
    zip.file('index.html', `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n${html}\n<script src="script.js"></script>\n</body>\n</html>`);
    zip.file('style.css',  css);
    zip.file('script.js',  js);
    const blob = await zip.generateAsync({ type: 'blob' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'my-project.zip';
    a.click();
    URL.revokeObjectURL(url);
  }

  /** Reset to default template */
  function handleReset() {
    if (!window.confirm('Reset to the Hello World template?')) return;
    setHtml(TEMPLATES.hello.html);
    setCss(TEMPLATES.hello.css);
    setJs(TEMPLATES.hello.js);
    localStorage.removeItem(LS_KEY);
  }

  /** Load a template */
  function handleTemplate(key) {
    const t = TEMPLATES[key];
    if (!t) return;
    setHtml(t.html);
    setCss(t.css);
    setJs(t.js);
  }

  /** Toggle fullscreen on the wrapper */
  function toggleFullscreen() {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  }

  const editorContent = { html, css, js }[activeTab];
  const editorSetter  = { html: setHtml, css: setCss, js: setJs }[activeTab];

  return (
    <section
      className={`live-editor-section${darkMode ? ' dark-editor' : ''}`}
      ref={wrapperRef}
    >
      <div className="live-editor-inner">
        <h2 className="section-title">Live Code Editor</h2>
        <p className="live-editor-intro">
          Write HTML, CSS, and JavaScript — see the result live in the preview
          pane.
        </p>

        {/* ── Toolbar ── */}
        <div className="editor-toolbar">
          {/* Template picker */}
          <select
            className="editor-select"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) handleTemplate(e.target.value);
              e.target.value = '';
            }}
            aria-label="Load a template"
          >
            <option value="" disabled>
              Load template
            </option>
            {Object.keys(TEMPLATE_LABELS).map((k) => (
              <option key={k} value={k}>
                {TEMPLATE_LABELS[k]}
              </option>
            ))}
          </select>

          <button type="button" className="editor-tool-btn" onClick={handleSave} title="Save to browser">
            <i className="fa fa-floppy-disk"></i> Save
          </button>
          {saveMsg && <span className="editor-save-msg">{saveMsg}</span>}

          <button type="button" className="editor-tool-btn" onClick={handleDownload} title="Download ZIP">
            <i className="fa fa-download"></i> ZIP
          </button>

          <button type="button" className="editor-tool-btn" onClick={handleReset} title="Reset editor">
            <i className="fa fa-rotate-left"></i> Reset
          </button>

          <button
            type="button"
            className="editor-tool-btn"
            onClick={() => setDarkMode((d) => !d)}
            title="Toggle theme"
          >
            <i className={`fa ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            {darkMode ? ' Light' : ' Dark'}
          </button>

          <button
            type="button"
            className="editor-tool-btn"
            onClick={toggleFullscreen}
            title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            <i className={`fa ${fullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>
        </div>

        {/* ── Main panes ── */}
        <div className="editor-body">
          {/* Code side */}
          <div className="editor-code-side">
            {/* Tab switcher */}
            <div className="editor-tabs">
              {['html', 'css', 'js'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`editor-tab${activeTab === lang ? ' active' : ''}`}
                  onClick={() => setActiveTab(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              className="editor-textarea"
              value={editorContent}
              onChange={(e) => editorSetter(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>

          {/* Preview side */}
          <div className="editor-preview-side">
            <div className="editor-preview-label">Preview</div>
            <iframe
              ref={previewRef}
              className="editor-preview-frame"
              srcDoc={srcDoc}
              title="Live preview"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
