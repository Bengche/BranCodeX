/**
 * components/Services.jsx
 *
 * 'use client' — needed for the scroll slider button interactivity.
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';

const services = [
  {
    icon: 'fas fa-layer-group',
    title: 'Custom Web Development',
    description:
      'Responsive, lightning-fast, and brand-aligned architectures built using Next.js and Node.js to maximize conversion.',
  },
  {
    icon: 'fab fa-wordpress',
    title: 'Premium WordPress Design',
    description:
      'Beyond templates. We build custom, editable WordPress ecosystems that look premium and scale with your business needs.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Strategic SEO & Growth',
    description:
      'Technical on-page SEO, speed tuning, and data-driven optimization to ensure your brand dominates search results.',
  },
  {
    icon: 'fas fa-tools',
    title: 'Maintenance & Tuning',
    description:
      'Continuous security updates, performance monitoring, and reliability support to keep your digital assets running 24/7.',
  },
];

export default function Services() {
  const sliderRef = useRef(null);

  function moveSlider(direction) {
    if (!sliderRef.current) return;
    const card  = sliderRef.current.querySelector('.service-card-new');
    if (!card) return;
    const cardWidth = card.offsetWidth + 24; // card width + gap
    sliderRef.current.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }

  return (
    <section
      id="services"
      className="plans-section"
      style={{ backgroundColor: '#0f172a', overflow: 'hidden' }}
    >
      <div className="plans-header text-center mb-10">
        <h2 className="section-title" style={{ color: '#ffffff' }}>
          Our Expertise
        </h2>
        <p className="plans-intro" style={{ color: '#94a3b8' }}>
          High-performance digital engineering tailored for growth. We don&apos;t
          just build websites; we build business tools.
        </p>
      </div>

      <div className="services-slider-container">
        <div className="services-wrapper" ref={sliderRef}>
          {services.map((service) => (
            <div key={service.title} className="service-card-new">
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link href="/faq" className="services-link">
                View Full Scope <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          <button
            className="ctrl-btn prev"
            onClick={() => moveSlider(-1)}
            aria-label="Previous service"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="ctrl-btn next"
            onClick={() => moveSlider(1)}
            aria-label="Next service"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
