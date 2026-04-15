import Link from "next/link";

export const metadata = {
  title: "Terms of Service | BranCodeX",
  description:
    "Read the Terms of Service for BranCodeX web development services — project scope, payments, intellectual property, and client responsibilities.",
  alternates: { canonical: "https://brancodex.com/terms" },
  robots: { index: true, follow: true },
};

export default function Terms() {
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
            Terms of Service
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem" }}>
            Last updated: {updated}
          </p>
        </div>

        <Section title="1. Agreement to Terms">
          <p>
            By engaging BranCodeX (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) for web development
            services or by using this website, you (&ldquo;Client&rdquo;, &ldquo;you&rdquo;) agree to
            be bound by these Terms of Service. If you do not agree, do not use
            our services.
          </p>
          <p>
            These terms apply to all projects, consultations, and contracts
            between BranCodeX and any client, regardless of location.
          </p>
        </Section>

        <Section title="2. Services">
          <p>BranCodeX provides the following services:</p>
          <ul>
            <li>Custom website and web application development</li>
            <li>Landing page and e-commerce store design</li>
            <li>UI/UX design and branding</li>
            <li>Website maintenance and updates</li>
            <li>SEO and performance optimisation</li>
          </ul>
          <p>
            The exact scope of work for each project is defined in a separate
            project proposal or contract signed by both parties. These Terms
            apply alongside that agreement.
          </p>
        </Section>

        <Section title="3. Project Process & Timeline">
          <p>
            Once a project is agreed upon, we will provide an estimated
            timeline. Timelines are estimates, not guarantees. Delays caused by
            late delivery of client materials (content, images, feedback) are
            not the responsibility of BranCodeX and may extend the timeline
            without penalty.
          </p>
          <p>
            We will keep you updated throughout the project with regular
            check-ins. You are expected to provide feedback within a reasonable
            timeframe (typically 3&ndash;5 business days per revision round).
          </p>
        </Section>

        <Section title="4. Payment">
          <p>
            Payment terms are outlined in the individual project proposal.
            Unless otherwise agreed in writing:
          </p>
          <ul>
            <li>
              A <strong style={{ color: "#e2e8f0" }}>50% deposit</strong> is
              required before work begins.
            </li>
            <li>
              The remaining <strong style={{ color: "#e2e8f0" }}>50%</strong> is
              due upon project completion, before the final files or live
              deployment are handed over.
            </li>
            <li>
              Invoices unpaid after 14 days may incur a late fee of 5% per
              month.
            </li>
          </ul>
          <p>
            All prices are quoted in USD or XAF as agreed. Payments accepted
            via bank transfer, Mobile Money (MTN/Orange), PayPal, or other
            methods agreed in the proposal.
          </p>
        </Section>

        <Section title="5. Revisions">
          <p>
            Each project package includes a defined number of revision rounds
            as stated in the proposal. Additional revisions beyond the agreed
            scope will be billed at our current hourly rate or a flat fee
            agreed in writing before work begins.
          </p>
          <p>
            A &ldquo;revision&rdquo; means adjustments to approved designs or
            copy — it does not include new features or significant scope
            changes, which are treated as new work.
          </p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            Upon receipt of full payment, you own all final deliverables,
            including the website design, custom code, and content created
            specifically for your project.
          </p>
          <p>
            BranCodeX retains the right to:
          </p>
          <ul>
            <li>
              Display your project in our portfolio and case studies unless
              you request otherwise in writing before project completion.
            </li>
            <li>
              Retain ownership of any reusable code libraries, frameworks, or
              tools developed independently and used within your project.
            </li>
          </ul>
          <p>
            Third-party assets (fonts, stock images, plugins, npm packages)
            remain subject to their own licences. It is your responsibility
            to ensure you have the appropriate licences for any content you
            provide to us.
          </p>
        </Section>

        <Section title="7. Client Responsibilities">
          <p>You agree to:</p>
          <ul>
            <li>
              Provide accurate, complete, and lawful content and materials for
              the project.
            </li>
            <li>
              Not request content that is illegal, defamatory, or infringes
              third-party intellectual property.
            </li>
            <li>
              Respond to requests for feedback and approval in a timely manner.
            </li>
            <li>
              Pay all invoices by the agreed due dates.
            </li>
          </ul>
        </Section>

        <Section title="8. Cancellation & Refunds">
          <p>
            If you cancel a project after work has commenced, you forfeit the
            deposit and must pay for all work completed up to the cancellation
            date, calculated at our standard hourly rate.
          </p>
          <p>
            If BranCodeX cancels a project for any reason, any deposit paid
            will be refunded in full within 14 days.
          </p>
        </Section>

        <Section title="9. Confidentiality">
          <p>
            Both parties agree to keep confidential any proprietary or
            sensitive information shared during the project (business plans,
            unreleased products, internal processes). This obligation survives
            the end of the project for a period of two (2) years.
          </p>
        </Section>

        <Section title="10. Limitation of Liability">
          <p>
            BranCodeX&apos;s total liability for any claim arising out of or
            relating to our services is limited to the total fees paid by you
            for the specific project giving rise to that claim.
          </p>
          <p>
            We are not liable for indirect, incidental, special, or
            consequential damages, including lost profits or data, even if
            advised of the possibility of such damages.
          </p>
          <p>
            We are not responsible for third-party services (hosting providers,
            domain registrars, payment gateways) used by your website after
            handover.
          </p>
        </Section>

        <Section title="11. Website Use">
          <p>
            You may use <strong style={{ color: "#e2e8f0" }}>brancodex.com</strong> for
            lawful purposes only. You must not:
          </p>
          <ul>
            <li>Attempt to gain unauthorised access to our systems.</li>
            <li>Scrape, copy, or reproduce our content without permission.</li>
            <li>
              Use our AI chat (Brandon) in a way that violates Groq&apos;s or our
              own terms.
            </li>
          </ul>
        </Section>

        <Section title="12. Governing Law">
          <p>
            These Terms are governed by the laws of the Republic of Cameroon.
            Any disputes that cannot be resolved amicably will be submitted to
            the competent courts of Bamenda, Cameroon, unless both parties
            agree in writing to an alternative dispute resolution mechanism.
          </p>
        </Section>

        <Section title="13. Changes to These Terms">
          <p>
            We may update these Terms at any time. The &ldquo;Last updated&rdquo; date
            at the top reflects the most recent revision. Continuing to use our
            services after an update constitutes acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="14. Contact">
          <p>
            If you have questions about these Terms, please contact:
          </p>
          <p>
            <strong style={{ color: "#e2e8f0" }}>BranCodeX — Beng Brandon Che</strong>
            <br />
            Bamenda, Cameroon
            <br />
            <a href="mailto:contact@brancodex.com" style={{ color: "#22c55e" }}>
              contact@brancodex.com
            </a>
            <br />
            <a href="https://wa.me/237654155218" style={{ color: "#22c55e" }}>
              WhatsApp: +237 654 155 218
            </a>
          </p>
        </Section>

        {/* Back links */}
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
            href="/privacy-policy"
            style={{
              color: "#64748b",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            Privacy Policy
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
