/**
 * components/WhatsAppButton.jsx
 *
 * Small floating WhatsApp shortcut (bottom-left).
 */

export default function WhatsAppButton() {
  return (
    <div id="bx-wa-container">
      <a
        href="https://wa.me/237654155218"
        target="_blank"
        rel="noopener noreferrer"
        id="bx-wa-link"
        className="wa-fab"
        aria-label="Chat with BranCodeX on WhatsApp"
        title="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp" aria-hidden="true"></i>
      </a>
    </div>
  );
}
