import Link from "next/link";

const steps = [
  {
    num: "01",
    icon: "fa-comments",
    title: "Discovery",
    desc: "We start with a free consultation to understand your business, goals, and target audience. No pressure — just an honest conversation about what you need.",
    duration: "Day 1",
    color: "#22c55e",
  },
  {
    num: "02",
    icon: "fa-pencil-ruler",
    title: "Design",
    desc: "We create wireframes and a full visual mockup. You review every detail, give feedback, and approve the design before we write a single line of code.",
    duration: "Days 2–4",
    color: "#3b82f6",
  },
  {
    num: "03",
    icon: "fa-code",
    title: "Build",
    desc: "Our team develops your complete website — all pages, animations, forms, and integrations. Built clean, fast, secure, and mobile-first from day one.",
    duration: "Days 4–12",
    color: "#8b5cf6",
  },
  {
    num: "04",
    icon: "fa-magnifying-glass",
    title: "Review",
    desc: "You get full access to the live preview and test every page yourself. Request changes — we refine until every detail meets your exact standards.",
    duration: "Days 12–14",
    color: "#f59e0b",
  },
  {
    num: "05",
    icon: "fa-rocket",
    title: "Launch",
    desc: "We deploy to your custom domain, configure SSL and DNS, run final checks, and go live. Your new website is ready to win clients from day one.",
    duration: "Day 14",
    color: "#ef4444",
  },
];

export default function HowWeWork() {
  return (
    <section className="hww-section" id="process">
      <div className="hww-inner">
        <div className="hww-header" data-aos="fade-up">
          <span className="hww-badge">OUR PROCESS</span>
          <h2>How We Work</h2>
          <p>
            From your first message to a live website — here is exactly what
            happens, step by step, with full transparency.
          </p>
        </div>

        <div className="hww-steps">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="hww-step"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              {/* Number + connector */}
              <div className="hww-step-left">
                <div
                  className="hww-step-num"
                  style={{
                    background: `${step.color}18`,
                    borderColor: `${step.color}50`,
                    color: step.color,
                  }}
                >
                  {step.num}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="hww-connector"
                    style={{ borderColor: `${step.color}30` }}
                  />
                )}
              </div>

              {/* Card */}
              <div className="hww-step-card">
                <div className="hww-step-card-top">
                  <div
                    className="hww-step-icon"
                    style={{ color: step.color, background: `${step.color}18` }}
                  >
                    <i className={`fas ${step.icon}`}></i>
                  </div>
                  <div className="hww-step-heading">
                    <h3 className="hww-step-title">{step.title}</h3>
                    <span
                      className="hww-step-duration"
                      style={{ color: step.color }}
                    >
                      <i className="fas fa-clock"></i> {step.duration}
                    </span>
                  </div>
                </div>
                <p className="hww-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hww-footer" data-aos="fade-up">
          <div className="hww-footer-box">
            <div className="hww-footer-icon">
              <i className="fas fa-shield-halved"></i>
            </div>
            <div className="hww-footer-text">
              <strong>Ongoing Support After Launch</strong>
              <span>
                We offer monthly maintenance plans — security updates, content
                edits, performance monitoring, and priority support.
              </span>
            </div>
          </div>
          <Link href="/#contact" className="hww-start-btn">
            Start Step 1 — Free Consultation
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
