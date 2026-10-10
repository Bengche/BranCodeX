/**
 * components/Hero.jsx
 *
 * Server component. One promise, two actions, three facts.
 */

import Link from "next/link";

const facts = [
  { label: "Delivery", value: "3 to 14 days" },
  { label: "First year", value: "Hosting and domain included" },
  { label: "Payments", value: "MoMo, Orange Money and cards" },
];

export default function Hero() {
  return (
    <header id="hero" className="hero">
      <div className="hero-inner">
        <p className="hero-kicker">
          Web development agency in Bamenda, Cameroon
        </p>
        <h1>Websites that bring your business customers.</h1>
        <p className="hero-lead">
          We design and build fast, search-friendly websites and online stores
          for businesses in Cameroon and abroad. Your site works on every phone,
          and you deal directly with the people building it.
        </p>

        <div className="hero-actions">
          <Link href="/#contact" className="btn btn--primary">
            Get a free quote
          </Link>
          <Link href="/#projects" className="btn btn--ghost">
            See our work
          </Link>
        </div>

        <dl className="hero-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
