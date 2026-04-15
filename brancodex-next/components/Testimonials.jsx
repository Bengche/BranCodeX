"use client";

import { useState, useEffect, useRef } from "react";

const IMGBB_API_KEY = "69c45289e2873d6bd5719277ac377ceb";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [formName, setFormName] = useState("");
  const [formReview, setFormReview] = useState("");
  const [formRating, setFormRating] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    loadAllTestimonials();
  }, []);

  // Attach IntersectionObserver to cards for scroll-in animation
  useEffect(() => {
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".testimonial-card");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card) => {
      card.classList.remove("visible");
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, [testimonials, filter]);

  async function loadAllTestimonials() {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }

  function openModal() {
    setFormName("");
    setFormReview("");
    setFormRating("");
    setPhotoFile(null);
    setPhotoPreview("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formRating) {
      alert("Please select a rating.");
      return;
    }
    setSubmitting(true);
    try {
      let photo_url = "";
      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        if (data?.data?.url) photo_url = data.data.url;
      }
      await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              name: formName,
              review: formReview,
              rating: formRating,
              photo_url,
              created_at: new Date().toISOString(),
            },
          ],
        }),
      });
      alert("✅ Testimonial submitted!");
      closeModal();
      loadAllTestimonials();
    } catch {
      alert("❌ Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const filtered =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => String(t.rating) === String(filter));

  return (
    <section
      id="testimonials"
      className="bg-gray-900 mb-16 mt-16 text-white min-h-screen"
    >
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            🌟 Reviews
          </h2>
          <button
            id="openModal"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-5 py-2 rounded-lg shadow transition"
            onClick={openModal}
          >
            ➕ Add a Review
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <select
            id="testimonialFilter"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-5 py-2 rounded-lg shadow transition"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="1">⭐ 1 Star</option>
            <option value="2">⭐⭐ 2 Stars</option>
            <option value="3">⭐⭐⭐ 3 Stars</option>
            <option value="4">⭐⭐⭐⭐ 4 Stars</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
          </select>
        </div>

        <div className="relative">
          <div
            id="testimonialScrollArea"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              paddingRight: "0.5rem",
            }}
          >
            {loading ? (
              <div className="text-center text-gray-400 py-8">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center text-gray-400 col-span-2 py-8">
                No testimonials found for this filter.
              </div>
            ) : (
              <div
                id="testimonialList"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                ref={listRef}
              >
                {filtered.map((t, i) => (
                  <div
                    key={i}
                    className="testimonial-card flex flex-col md:flex-row items-center gap-4"
                  >
                    <span className="testimonial-quote">&ldquo;</span>
                    <img
                      src={
                        t.photo_url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}`
                      }
                      className="testimonial-img mb-2 md:mb-0"
                      alt="User Photo"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <strong className="text-lg">{t.name}</strong>
                        <span className="testimonial-stars text-yellow-400">
                          {"★".repeat(Number(t.rating))}
                        </span>
                      </div>
                      <p className="italic text-gray-200 mb-2">
                        &ldquo;{t.review}&rdquo;
                      </p>
                      <div className="text-xs text-gray-400">
                        {new Date(t.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div
          id="testimonialModal"
          className="modal-overlay fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="modal-content bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              type="button"
              id="closeModal"
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-6 text-center text-yellow-400">
              📝 Add Your Review
            </h3>
            <form
              id="testimonialForm"
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="t-name" className="block font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="t-name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-900 text-white"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="t-review" className="block font-semibold mb-1">
                  Review
                </label>
                <textarea
                  id="t-review"
                  placeholder="Your Review"
                  className="w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-900 text-white"
                  required
                  value={formReview}
                  onChange={(e) => setFormReview(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor="t-photo" className="block font-semibold mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  id="t-photo"
                  accept="image/*"
                  className="w-full"
                  onChange={handlePhotoChange}
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    className="mt-2 testimonial-img"
                    alt="Preview"
                  />
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Rating</label>
                <select
                  id="t-rating"
                  required
                  className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                  value={formRating}
                  onChange={(e) => setFormRating(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1">⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
              </div>
              <button
                type="submit"
                id="addReviewBtn"
                disabled={submitting}
                className={`w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded font-bold transition${
                  submitting ? " btn-disabled" : ""
                }`}
              >
                {submitting ? "⏳ Submitting..." : "✅ Add Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
