/**
 * components/Testimonials.jsx
 *
 * 'use client' — reads/writes localStorage for user-submitted reviews.
 * Features: add, edit, delete own reviews; star-rating filter; photo upload.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function getStoredTestimonials() {
  try {
    return JSON.parse(localStorage.getItem("testimonials") || "[]");
  } catch {
    return [];
  }
}

function saveTestimonials(list) {
  localStorage.setItem("testimonials", JSON.stringify(list));
}

/** Fallback avatar using the user's initials. */
function InitialsAvatar({ name }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div className="testimonial-initials-avatar" aria-hidden="true">
      {initials}
    </div>
  );
}

// ─── Star rating picker ───────────────────────────────────────────────────────

function StarPicker({ value, onChange }) {
  return (
    <div className="star-picker" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n !== 1 ? "s" : ""}`}
          className={`star-pick-btn${value >= n ? " filled" : ""}`}
          onClick={() => onChange(n)}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
}

// ─── Individual card ─────────────────────────────────────────────────────────

function TestimonialCard({ testimonial, ownerId, onEdit, onDelete }) {
  const isOwner = testimonial.userId === ownerId;
  const stars = Array.from({ length: 5 }, (_, i) => i < testimonial.stars);

  return (
    <article className="testimonial-card" data-aos="fade-up">
      <div className="tc-header">
        <div className="tc-avatar">
          {testimonial.photo ? (
            <Image
              src={testimonial.photo}
              alt={`${testimonial.name} photo`}
              width={52}
              height={52}
              className="rounded-full object-cover"
              unoptimized /* base64 data URIs only */
            />
          ) : (
            <InitialsAvatar name={testimonial.name} />
          )}
        </div>
        <div>
          <p className="tc-name">{testimonial.name}</p>
          <p className="tc-role">{testimonial.role || "Client"}</p>
        </div>
        {isOwner && (
          <div className="tc-owner-actions" aria-label="Manage your review">
            <button
              type="button"
              className="tc-action-btn"
              title="Edit review"
              onClick={() => onEdit(testimonial)}
            >
              <i className="fa fa-pen"></i>
            </button>
            <button
              type="button"
              className="tc-action-btn delete"
              title="Delete review"
              onClick={() => onDelete(testimonial.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        )}
      </div>

      <div
        className="tc-stars"
        aria-label={`${testimonial.stars} out of 5 stars`}
      >
        {stars.map((filled, i) => (
          <span key={i} className={`star-icon${filled ? " filled" : ""}`}>
            &#9733;
          </span>
        ))}
      </div>

      <blockquote className="tc-text">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>
      <p className="tc-date">{testimonial.date}</p>
    </article>
  );
}

// ─── Modal (add / edit) ───────────────────────────────────────────────────────

const emptyForm = { name: "", role: "", stars: 5, text: "", photo: "" };

function TestimonialModal({ editing, onClose, onSubmit }) {
  const [form, setForm] = useState(editing ? { ...editing } : { ...emptyForm });
  const fileInputRef = useRef(null);

  function handleField(field, val) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  function handlePhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => handleField("photo", ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedText = form.text.trim();
    const trimmedName = form.name.trim();
    if (!trimmedName || !trimmedText) return;
    if (trimmedText.length < 20) {
      alert("Please write at least 20 characters in your review.");
      return;
    }
    onSubmit(form);
  }

  /* Lock body scroll while modal is open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={editing ? "Edit your review" : "Add a review"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="modal-heading">
          {editing ? "Edit Your Review" : "Share Your Experience"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <label className="modal-label">
            Your full name *
            <input
              className="modal-input"
              type="text"
              value={form.name}
              maxLength={60}
              required
              onChange={(e) => handleField("name", e.target.value)}
              placeholder="e.g. Amina Tabi"
            />
          </label>

          {/* Role / company */}
          <label className="modal-label">
            Role / company (optional)
            <input
              className="modal-input"
              type="text"
              value={form.role}
              maxLength={80}
              onChange={(e) => handleField("role", e.target.value)}
              placeholder="e.g. CEO at StartupCM"
            />
          </label>

          {/* Stars */}
          <div className="modal-label">
            Rating *
            <StarPicker
              value={form.stars}
              onChange={(v) => handleField("stars", v)}
            />
          </div>

          {/* Review text */}
          <label className="modal-label">
            Your review *
            <textarea
              className="modal-input modal-textarea"
              value={form.text}
              minLength={20}
              maxLength={500}
              required
              rows={4}
              onChange={(e) => handleField("text", e.target.value)}
              placeholder="Tell us about your experience (min. 20 characters)..."
            />
          </label>

          {/* Photo upload */}
          <div className="modal-label">
            Profile photo (optional)
            <button
              type="button"
              className="upload-photo-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              {form.photo ? "Change photo" : "Upload photo"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhoto}
            />
            {form.photo && (
              <Image
                src={form.photo}
                alt="Preview"
                width={48}
                height={48}
                className="photo-preview"
                unoptimized
              />
            )}
          </div>

          <button type="submit" className="modal-submit-btn">
            {editing ? "Save changes" : "Submit review"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [filterStars, setFilterStars] = useState(0); // 0 = all
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [userId, setUserId] = useState("");

  /* Load from localStorage on mount; set or read a per-session user ID. */
  useEffect(() => {
    setItems(getStoredTestimonials());
    let uid = sessionStorage.getItem("bx_uid");
    if (!uid) {
      uid = generateId();
      sessionStorage.setItem("bx_uid", uid);
    }
    setUserId(uid);
  }, []);

  const displayed =
    filterStars === 0 ? items : items.filter((t) => t.stars === filterStars);

  function handleSubmit(form) {
    if (editing) {
      // Update existing
      const updated = items.map((t) =>
        t.id === editing.id ? { ...t, ...form } : t,
      );
      setItems(updated);
      saveTestimonials(updated);
    } else {
      // Add new
      const newItem = {
        ...form,
        id: generateId(),
        userId,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
      const updated = [newItem, ...items];
      setItems(updated);
      saveTestimonials(updated);
    }
    closeModal();
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this review?")) return;
    const updated = items.filter((t) => t.id !== id);
    setItems(updated);
    saveTestimonials(updated);
  }

  function openEdit(testimonial) {
    setEditing(testimonial);
    setShowModal(true);
  }

  function closeModal() {
    setEditing(null);
    setShowModal(false);
  }

  return (
    <section id="testimonials" className="testimonials-section">
      <h2 className="section-title" data-aos="fade-up">
        What Clients Say
      </h2>
      <p className="testimonials-intro" data-aos="fade-up" data-aos-delay="100">
        Real feedback from real clients. Every review stored locally — no
        account required.
      </p>

      {/* Controls row */}
      <div className="testi-controls" data-aos="fade-up" data-aos-delay="150">
        {/* Star filter */}
        <div className="testi-filter">
          <label htmlFor="star-filter" className="testi-filter-label">
            Filter by:
          </label>
          <select
            id="star-filter"
            className="testi-filter-select"
            value={filterStars}
            onChange={(e) => setFilterStars(Number(e.target.value))}
          >
            <option value={0}>All reviews</option>
            <option value={5}>5 stars</option>
            <option value={4}>4 stars</option>
            <option value={3}>3 stars</option>
            <option value={2}>2 stars</option>
            <option value={1}>1 star</option>
          </select>
        </div>

        {/* Add review button */}
        <button
          type="button"
          className="add-review-btn"
          onClick={() => {
            setEditing(null);
            setShowModal(true);
          }}
        >
          <i className="fa fa-plus"></i> Add your review
        </button>
      </div>

      {/* Cards grid */}
      {displayed.length > 0 ? (
        <div className="testimonials-grid">
          {displayed.map((t) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              ownerId={userId}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="no-reviews-msg">
          {filterStars > 0
            ? `No ${filterStars}-star reviews yet.`
            : "No reviews yet. Be the first!"}
        </p>
      )}

      {/* Modal */}
      {showModal && (
        <TestimonialModal
          editing={editing}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
}
