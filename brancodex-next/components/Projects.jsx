/**
 * components/Projects.jsx
 *
 * Two featured builds with real screenshots, plus smaller builds as links.
 */

import Image from "next/image";

const featured = [
  {
    name: "Njimbong",
    url: "https://www.njimbong.com/",
    image: "/images/work/njimbong.jpg",
    alt: "Njimbong marketplace home page showing the search bar and categories",
    summary:
      "A buy-and-sell marketplace for Cameroon. Sellers are identity-verified and payments are held in escrow until the buyer is satisfied.",
    stack: "Next.js, Node.js",
  },
  {
    name: "Fonlok",
    url: "https://www.fonlok.com/",
    image: "/images/work/fonlok.jpg",
    alt: "Fonlok escrow payment service home page",
    summary:
      "An escrow service for MTN MoMo and Orange Money deals. Fonlok holds the money until buyer and seller are both happy, so neither side has to trust a stranger.",
    stack: "Web app, mobile money integration",
  },
];

const smaller = [
  {
    name: "Job Finder",
    url: "https://jobvibe.netlify.app/",
    note: "React, live job search by country and category",
  },
  {
    name: "Country Information",
    url: "https://country-info-searcher.netlify.app/",
    note: "JavaScript and a REST API, facts about any country",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="sec sec--alt" aria-labelledby="work-title">
      <div className="sec-inner">
        <header className="sec-head">
          <h2 id="work-title">Selected work</h2>
          <p>
            Two products we built and run for real users in Cameroon. Open them
            and try them.
          </p>
        </header>

        <div className="work-grid">
          {featured.map((p) => (
            <article key={p.name} className="work-card">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="work-shot"
                aria-label={`Visit ${p.name}`}
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  width={1280}
                  height={600}
                  sizes="(max-width: 900px) 100vw, 520px"
                />
              </a>
              <div className="work-body">
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <p className="work-stack">{p.stack}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Visit {p.name} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="work-more">
          Smaller builds:{" "}
          {smaller.map((p, i) => (
            <span key={p.name}>
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                {p.name}
              </a>{" "}
              ({p.note}){i < smaller.length - 1 ? "; " : "."}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
