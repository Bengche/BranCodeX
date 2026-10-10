/**
 * components/ProcessSteps.jsx
 *
 * Short version of the process for the home page. The full page lives at
 * /our-process.
 */

import Link from "next/link";

const steps = [
  {
    title: "Talk",
    text: "A free call to understand your business, your goals and your budget. You get a clear scope and price.",
  },
  {
    title: "Design",
    text: "We send a mockup of your pages. You approve the design before any code is written.",
  },
  {
    title: "Build and review",
    text: "We build the site and give you a live preview. You ask for changes until you are happy.",
  },
  {
    title: "Launch",
    text: "We connect your domain, set up SSL, test on real phones and go live. We stay available afterwards.",
  },
];

export default function ProcessSteps() {
  return (
    <section id="process" className="sec sec--alt" aria-labelledby="process-title">
      <div className="sec-inner">
        <header className="sec-head">
          <h2 id="process-title">How a project works</h2>
          <p>Four steps from first message to a live website.</p>
        </header>

        <ol className="steps">
          {steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="sec-more">
          <Link href="/our-process" className="text-link">
            Read the full process <span aria-hidden="true">&rarr;</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
