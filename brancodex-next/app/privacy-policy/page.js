import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | BranCodeX",
  description:
    "Learn how BranCodeX collects, uses, and protects your personal data in compliance with GDPR, CCPA, and applicable privacy laws.",
  alternates: { canonical: "https://brancodex.com/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  const updated = "April 15, 2026";

  return (
    <main className="nf-main" style={{ alignItems: "flex-start", paddingTop: "7rem" }}>
      <article
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          width: "100%",
          color: "#94a3b8",
          lineHeight: "1.8",
          fontSize: "0.95rem",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
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
              marginBottom: "1rem",
            }}
          >
            LEGAL
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#f0f6ff",
              margin: "0 0 0.75rem",
              lineHeight: 1.2,
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem" }}>
            Last updated: {updated}
          </p>
        </div>

        <Section title="1. Who We Are">
          <p>
            BranCodeX (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a web development agency
            operated by Beng Brandon Che, based in Bamenda, Cameroon. We build
            websites and digital products for clients worldwide. You can reach
            us at{" "}
            <a href="mailto:contact@brancodex.com" style={{ color: "#22c55e" }}>
              contact@brancodex.com
            </a>
            .
          </p>
        </Section>

        <Section title="2. What Data We Collect">
          <p>We collect the following personal data:</p>
          <ul>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Contact form submissions</strong> — your name,
              email address, and message when you use the contact form on our
              website.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Booking requests</strong> — your name and email
              if you schedule a consultation via Calendly.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Usage analytics</strong> — anonymised page views
              and interaction data collected by Vercel Analytics (no personally
              identifiable information is stored).
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Cookies</strong> — a single functional cookie
              that records whether you have accepted or declined our cookie
              notice. We do not use advertising or tracking cookies.
            </li>
          </ul>
          <p>
            We do <strong style={{ color: "#e2e8f0" }}>not</strong> collect
            payment card data, passwords, or any sensitive personal information.
          </p>
        </Section>

        <Section title="3. How We Use Your Data">
          <p>We use your data solely to:</p>
          <ul>
            <li>Respond to your enquiries and project requests.</li>
            <li>Schedule and manage consultations.</li>
            <li>
              Improve our website through aggregated, anonymised analytics.
            </li>
          </ul>
          <p>
            We will never sell, rent, or share your personal data with
            third-party marketers.
          </p>
        </Section>

        <Section title="4. Legal Basis for Processing (GDPR)">
          <p>
            If you are located in the European Economic Area (EEA) or the
            United Kingdom, our legal basis for processing your data is:
          </p>
          <ul>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Consent</strong> — you voluntarily submit your
              information via a contact form.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Legitimate interests</strong> — understanding
              how our site is used to improve it.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Contract performance</strong> — processing data
              needed to deliver a service you have requested.
            </li>
          </ul>
        </Section>

        <Section title="5. Third-Party Services">
          <p>We use the following trusted third-party processors:</p>
          <ul>
            <li>
              <strong style={{ color: "#e2e8f0" }}>EmailJS</strong> — transmits contact form data
              to our email inbox. Their privacy policy is available at{" "}
              <a
                href="https://www.emailjs.com/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#22c55e" }}
              >
                emailjs.com
              </a>
              .
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Calendly</strong> — manages consultation
              bookings. Their privacy policy is at{" "}
              <a
                href="https://calendly.com/legal/privacy-notice"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#22c55e" }}
              >
                calendly.com
              </a>
              .
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Vercel Analytics</strong> — privacy-preserving,
              cookieless analytics. No personal data is stored. See{" "}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#22c55e" }}
              >
                vercel.com
              </a>
              .
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Groq (AI chat)</strong> — your chat messages
              are sent to Groq&apos;s API to generate responses. Do not share sensitive
              personal information in the chat. Groq&apos;s privacy policy is at{" "}
              <a
                href="https://groq.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#22c55e" }}
              >
                groq.com
              </a>
              .
            </li>
          </ul>
        </Section>

        <Section title="6. Data Retention">
          <p>
            Contact form messages delivered to our inbox are retained for as
            long as necessary to complete your request, then deleted. We do not
            maintain a separate database of enquiries.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>
            Depending on your location, you have the right to:
          </p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Withdraw consent at any time (GDPR).</li>
            <li>
              Opt out of the sale of personal information (CCPA — we do not
              sell data, so this is automatically satisfied).
            </li>
            <li>Lodge a complaint with your local data protection authority.</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{" "}
            <a href="mailto:contact@brancodex.com" style={{ color: "#22c55e" }}>
              contact@brancodex.com
            </a>
            .
          </p>
        </Section>

        <Section title="8. Cookies">
          <p>
            We use one functional cookie to remember your cookie consent
            preference. No third-party tracking or advertising cookies are
            placed. You can clear cookies at any time via your browser settings.
          </p>
        </Section>

        <Section title="9. Security">
          <p>
            Our website is served over HTTPS with strict transport security
            headers. We apply industry-standard security headers (X-Frame-Options,
            X-Content-Type-Options, Referrer-Policy, etc.) on every response.
            No system is 100% secure, but we take reasonable technical measures
            to protect your data in transit.
          </p>
        </Section>

        <Section title="10. Children's Privacy">
          <p>
            Our services are not directed at children under 13. We do not
            knowingly collect personal data from children. If you believe a
            child has submitted data to us, please contact us and we will delete
            it promptly.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            We may update this policy from time to time. The &ldquo;Last updated&rdquo;
            date at the top of this page will always reflect the most recent
            revision. Continued use of our website after an update constitutes
            acceptance of the revised policy.
          </p>
        </Section>

        <Section title="12. Contact">
          <p>
            For any privacy-related questions, contact us at:
          </p>
          <p>
            <strong style={{ color: "#e2e8f0" }}>BranCodeX — Beng Brandon Che</strong>
            <br />
            Bamenda, Cameroon
            <br />
            <a href="mailto:contact@brancodex.com" style={{ color: "#22c55e" }}>
              contact@brancodex.com
            </a>
          </p>
        </Section>

        {/* Back link */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #1e293b" }}>
          <Link
            href="/"
            style={{
              color: "#22c55e",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
          <span style={{ margin: "0 1rem", color: "#334155" }}>·</span>
          <Link
            href="/terms"
            style={{
              color: "#64748b",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            Terms of Service
          </Link>
        </div>
      </article>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2
        style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "#f0f6ff",
          margin: "0 0 0.75rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #1e293b",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
