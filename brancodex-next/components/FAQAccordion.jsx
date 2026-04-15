/**
 * components/FAQAccordion.jsx
 *
 * Client component — interactive accordion matching the original faq.html.
 * - One item open at a time (JS-controlled, like the original JS logic)
 * - Smooth max-height + opacity transition (not relying on <details> native toggle)
 * - fadeInAccordion CSS animation fires on open
 * - Chevron rotates on open
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import faqData from "../data/faqData";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    // One open at a time — matches original JS: close all others when one opens
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <>
      <div className="faq-list" id="faq-container">
        {faqData.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`faq-item${isOpen ? " faq-item--open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
              >
                <i
                  className={`fas ${item.icon} faq-icon`}
                  aria-hidden="true"
                ></i>
                <span>{item.question}</span>
                <i
                  className="fas fa-chevron-down faq-chevron"
                  aria-hidden="true"
                ></i>
              </button>
              <div
                id={`faq-answer-${i}`}
                className="faq-answer"
                aria-hidden={!isOpen}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="faq-bottom-cta">
        <p>Still have a question?</p>
        <Link href="/#contact" className="faq-cta-btn">
          Send us a message
        </Link>
      </div>
    </>
  );
}
