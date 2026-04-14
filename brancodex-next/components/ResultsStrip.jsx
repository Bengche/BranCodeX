/**
 * components/ResultsStrip.jsx
 *
 * The four key-stats strip below the hero.
 * Pure display — no interactivity needed. Server Component.
 */

const stats = [
  { value: '3–14 days',       label: 'Average delivery timeline' },
  { value: '95%+',            label: 'Performance-focused builds' },
  { value: 'SEO-ready',       label: 'Structured for search visibility' },
  { value: 'Cameroon → Global', label: 'Serving Bamenda, Cameroon, and worldwide' },
];

export default function ResultsStrip() {
  return (
    <section className="results-section" aria-label="Key results">
      <div className="results-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="result-card">
            <div className="result-value">{stat.value}</div>
            <div className="result-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
