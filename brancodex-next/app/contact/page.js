import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact BranCodeX | Get a Free Quote",
  description:
    "Get in touch with BranCodeX — web development agency in Bamenda, Cameroon. Send us a message, book a free consultation, or reach us on WhatsApp. We respond within 24 hours.",
  alternates: { canonical: "https://brancodex.com/contact" },
  openGraph: {
    title: "Contact BranCodeX | Get a Free Quote",
    description:
      "Ready to build your website? Contact BranCodeX today. Free consultation, fast response.",
    url: "https://brancodex.com/contact",
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #0a1120 0%, #0f172a 100%)",
          padding: "7rem 1.5rem 3rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: "640px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(34,197,94,0.1)",
              color: "#22c55e",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: "999px",
              padding: "0.3rem 1rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              marginBottom: "1.25rem",
            }}
          >
            GET IN TOUCH
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 900,
              color: "#f0f6ff",
              margin: "0 0 1rem",
              lineHeight: 1.15,
            }}
          >
            Let&apos;s Build Something{" "}
            <span style={{ color: "#22c55e" }}>Great Together</span>
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              margin: "0 auto",
            }}
          >
            Whether you need a landing page, a full website, or a custom web
            app — we&apos;d love to hear about your project. We respond within
            24 hours.
          </p>

          {/* Quick contact badges */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            <a
              href="https://wa.me/237654155218"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#25d366",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.875rem",
                padding: "0.55rem 1.25rem",
                borderRadius: "0.625rem",
                textDecoration: "none",
              }}
            >
              <i className="fab fa-whatsapp"></i> WhatsApp Us
            </a>
            <a
              href="mailto:contact@brancodex.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(34,197,94,0.1)",
                color: "#22c55e",
                border: "1px solid rgba(34,197,94,0.25)",
                fontWeight: 700,
                fontSize: "0.875rem",
                padding: "0.55rem 1.25rem",
                borderRadius: "0.625rem",
                textDecoration: "none",
              }}
            >
              <i className="fas fa-envelope"></i> contact@brancodex.com
            </a>
          </div>
        </div>
      </section>

      {/* Reuse the existing Contact form component */}
      <Contact />

      {/* Info cards */}
      <section
        style={{
          background: "#0f172a",
          padding: "3rem 1.5rem 5rem",
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {[
            {
              icon: "fas fa-clock",
              title: "Response Time",
              body: "We reply to all enquiries within 24 hours, usually much faster.",
            },
            {
              icon: "fas fa-globe",
              title: "Remote-First",
              body: "We work with clients worldwide over email, WhatsApp, and video call.",
            },
            {
              icon: "fas fa-shield-alt",
              title: "No Spam",
              body: "Your contact details are never shared or sold. See our Privacy Policy.",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: "#192133",
                border: "1px solid #1e293b",
                borderRadius: "1rem",
                padding: "1.5rem",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(34,197,94,0.1)",
                  borderRadius: "0.625rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#22c55e",
                  fontSize: "1rem",
                  flexShrink: 0,
                }}
              >
                <i className={card.icon}></i>
              </div>
              <div>
                <p
                  style={{
                    color: "#f0f6ff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    margin: "0 0 0.35rem",
                  }}
                >
                  {card.title}
                </p>
                <p style={{ color: "#94a3b8", fontSize: "0.83rem", margin: 0, lineHeight: 1.6 }}>
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
