/**
 * components/Services.jsx
 */

const services = [
  {
    title: "Business websites",
    text: "Company sites and landing pages built with Next.js or WordPress. They load quickly on mobile data, are set up to be found on Google, and are easy for you to update.",
  },
  {
    title: "Online stores",
    text: "Product catalogue, cart and checkout, with MTN MoMo, Orange Money and card payments, and an admin panel to manage products and orders.",
  },
  {
    title: "Custom web apps",
    text: "Marketplaces, dashboards, booking systems and internal tools, with the database and backend built to fit how your business works.",
  },
  {
    title: "SEO and maintenance",
    text: "Technical SEO and speed tuning before launch, then security updates, backups and content edits on a monthly plan.",
  },
];

export default function Services() {
  return (
    <section id="services" className="sec" aria-labelledby="services-title">
      <div className="sec-inner">
        <header className="sec-head">
          <h2 id="services-title">What we build</h2>
          <p>
            Most clients start with a website or a store. If you need something
            more specific, we can build that too.
          </p>
        </header>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.title} className="service">
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
