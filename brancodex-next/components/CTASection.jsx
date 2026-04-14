/**
 * components/CTASection.jsx
 *
 * Server Component — no interactivity needed.
 * Encourages visitors to start a project.
 */

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="cta-section" data-aos="fade-up">
      <div className="cta-inner">
        <h2 className="cta-heading">Ready to build something great?</h2>
        <p className="cta-subtext">
          Tell us your vision and we will engineer the solution — from Bamenda,
          Cameroon to the global market.
        </p>
        <div className="cta-actions">
          <Link href="/#contact" className="cta-btn primary">
            Start your project
          </Link>
          <Link href="/#plans" className="cta-btn secondary">
            View packages
          </Link>
        </div>
      </div>
    </section>
  );
}
