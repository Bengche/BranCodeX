/**
 * components/PlaygroundTeaser.jsx
 *
 * Server Component — simple feature-highlight linking to /playground.
 */

import Link from "next/link";

const features = [
  {
    icon: "fa-solid fa-face-grin-squint",
    title: "Random Jokes",
    desc: "Fetch real jokes from the internet and laugh a little.",
  },
  {
    icon: "fa-solid fa-brain",
    title: "General Quiz",
    desc: "Test your knowledge on Cameroon history, science, sports, and more.",
  },
  {
    icon: "fa-solid fa-code",
    title: "Live Code Editor",
    desc: "Write HTML, CSS, and JavaScript in-browser and preview it instantly.",
  },
];

export default function PlaygroundTeaser() {
  return (
    <section
      id="playground-teaser"
      className="playground-teaser-section"
      data-aos="fade-up"
    >
      <div className="playground-teaser-inner">
        <h2 className="section-title">Interactive Playground</h2>
        <p className="playground-teaser-intro">
          Beyond just showcasing work — BranCodeX gives you tools to learn,
          explore, and have fun.
        </p>

        <div className="playground-features-grid">
          {features.map((f) => (
            <div key={f.title} className="playground-feature-card">
              <i className={f.icon}></i>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        <Link href="/playground" className="go-playground-btn">
          Explore the Playground
        </Link>
      </div>
    </section>
  );
}
