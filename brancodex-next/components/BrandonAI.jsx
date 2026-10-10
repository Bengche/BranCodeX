/**
 * components/BrandonAI.jsx
 *
 * Chat widget (bottom-right). Messages go to /api/chat, which adds the
 * system prompt and talks to Groq on the server.
 */
"use client";

import { useState, useRef, useEffect } from "react";

const WELCOME_HTML =
  "Hi, I&rsquo;m Brandon from BranCodeX. Ask me about pricing, timelines or what we can build for you.";

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Turns the model's plain text into safe HTML: only http(s), mailto and tel links.
function formatReply(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(((?:https?:|mailto:|tel:)[^)\s]+)\)/g, (_, label, url) => {
      const external = url.startsWith("http");
      return `<a href="${url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

export default function BrandonAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", html: WELCOME_HTML },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([]);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  function resetChat() {
    setHistory([]);
    setMessages([{ type: "bot", html: WELCOME_HTML }]);
  }

  async function sendMessage(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;

    const nextHistory = [...history, { role: "user", content: text }];
    setMessages((prev) => [...prev, { type: "user", html: escapeHtml(text) }]);
    setHistory(nextHistory);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextHistory }),
      });
      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (!response.ok || !reply) {
        throw new Error(data?.error?.message || "Invalid response");
      }

      setMessages((prev) => [...prev, { type: "bot", html: formatReply(reply) }]);
      setHistory([...nextHistory, { role: "assistant", content: reply }]);
    } catch (err) {
      setHistory(history);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          html: `Sorry, I could not answer that just now. You can reach the team on <a href="https://wa.me/237654155218" target="_blank" rel="noopener noreferrer">WhatsApp</a> or at <a href="mailto:contact@brancodex.com">contact@brancodex.com</a>.`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div id="brancodex-chat-container">
      {isOpen && (
        <div
          id="brancodex-chat-window"
          role="dialog"
          aria-label="Chat with Brandon"
        >
          <div id="brancodex-chat-header">
            <div className="chat-title">
              <span id="brancodex-status" aria-hidden="true"></span>
              <span id="header-name">Brandon, BranCodeX</span>
            </div>
            <div className="chat-actions">
              <button
                type="button"
                title="New chat"
                aria-label="Start a new chat"
                onClick={resetChat}
                className="header-btn"
              >
                <i className="fas fa-rotate-right" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="header-btn"
              >
                <i className="fas fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <div id="brancodex-messages" ref={messagesRef} aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`grok-msg ${msg.type}-msg`}
                dangerouslySetInnerHTML={{ __html: msg.html }}
              />
            ))}
            {isTyping && <div className="grok-msg bot-msg">Typing…</div>}
          </div>

          <form id="brancodex-input-area" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              id="brancodex-user-input"
              placeholder="Type your question"
              aria-label="Your message"
              maxLength={1000}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button id="brancodex-send-btn" type="submit" disabled={isTyping}>
              Send
            </button>
          </form>
        </div>
      )}
      <button
        id="brancodex-bubble"
        type="button"
        aria-label={isOpen ? "Close chat" : "Chat with Brandon"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <i
          className={`fas ${isOpen ? "fa-xmark" : "fa-comment-dots"}`}
          aria-hidden="true"
        ></i>
      </button>
    </div>
  );
}
