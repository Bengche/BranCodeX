/**
 * components/About.jsx
 */

import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="sec sec--alt" aria-labelledby="about-title">
      <div className="sec-inner about">
        <header className="sec-head">
          <h2 id="about-title">About BranCodeX</h2>
        </header>

        <div className="about-body">
          <p>
            BranCodeX is a small web development team in Bamenda, Cameroon,
            led by Beng Brandon Che, a full-stack developer. We build websites,
            online stores and web apps for clients in Cameroon and around the
            world, in English and French.
          </p>
          <p>
            You deal directly with the people doing the work, so questions get
            answered quickly and nothing gets lost between a sales team and the
            developers. We build with Next.js, React, Node.js, PostgreSQL and
            WordPress, and we choose the right one for your project.
          </p>
          <p>
            <Link href="/faq" className="text-link">
              Read the FAQ <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
