"use client";

import { useState, useEffect } from "react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [formName, setFormName] = useState("");
  const [formReview, setFormReview] = useState("");
  const [formRating, setFormRating] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("testimonials") || "[]");
    setTestimonials(stored);
    if (!sessionStorage.getItem("userId")) {
      sessionStorage.setItem("userId", Date.now().toString());
    }
    setUserId(sessionStorage.getItem("userId"));
  }, []);

  function openModal() {
    setFormName("");
    setFormReview("");
    setFormRating("");
    setUploadedImage("");
    setCurrentEditIndex(null);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setCurrentEditIndex(null);
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const testimonialData = {
      name: formName,
      review: formReview,
      rating: parseInt(formRating),
      photo: uploadedImage || "https://i.pravatar.cc/100",
      userId,
    };
    let updated;
    if (currentEditIndex !== null) {
      updated = [...testimonials];
      updated[currentEditIndex] = testimonialData;
    } else {
      updated = [testimonialData, ...testimonials];
    }
    setTestimonials(updated);
    localStorage.setItem("testimonials", JSON.stringify(updated));
    closeModal();
  }

  function editTestimonial(index) {
    const t = testimonials[index];
    setFormName(t.name);
    setFormReview(t.review);
    setFormRating(String(t.rating));
    setUploadedImage(t.photo);
    setCurrentEditIndex(index);
    setShowModal(true);
  }

  function deleteTestimonial(index) {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const updated = [...testimonials];
    updated.splice(index, 1);
    setTestimonials(updated);
    localStorage.setItem("testimonials", JSON.stringify(updated));
  }

  return (
    <section id="testimonials" className="bg-gray-900 mb-16 mt-16 text-white min-h-screen">
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
            <option
              className="filter-btn active flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition font-semibold"
              value="all"
            >
               All
            </option>
            <option
              className="filter-btn flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition font-semibold"
              value="1"
            >
              ⭐1 Star
            </option>
            <option
              className="filter-btn flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition font-semibold"
              value="2"
            >
              ⭐2 Stars
            </option>
            <option
              className="filter-btn flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition font-semibold"
              value="3"
            >
              ⭐3 Stars
            </option>
            <option
              className="filter-btn flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition font-semibold"
              value="4"
            >
              ⭐4 Stars
            </option>
            <option
              className="filter-btn flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 hover:bg-yellow-400 hover:text-gray-900 transition font-semibold"
              value="5"
            >
              ⭐5 Stars
            </option>
          </select>
        </div>

        <div className="relative">
          <div
            id="testimonialScrollArea"
            style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "0.5rem" }}
          >
            <div
              id="testimonialList"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {testimonials.map((t, index) => {
                if (filter !== "all" && t.rating < parseInt(filter)) return null;
                return (
                  <div
                    className="testimonial-card"
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <img src={t.photo} alt={t.name} />
                    <h4>{t.name}</h4>
                    <div className="stars">{"⭐".repeat(t.rating)}</div>
                    <p>{t.review}</p>
                    {t.userId === userId && (
                      <div className="card-actions">
                        <button onClick={() => editTestimonial(index)} className="edit-btn">✏ Edit</button>
                        <button onClick={() => deleteTestimonial(index)} className="delete-btn">🗑 Delete</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div id="loadingMore" className="text-center text-gray-400 py-4 hidden">
            Loading Reviews...
          </div>
        </div>
      </div>

      {showModal && (
        <div
          id="testimonialModal"
          className="modal-overlay fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
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
            <form id="testimonialForm" className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="t-name" className="block font-semibold mb-1">Name</label>
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
                <label htmlFor="t-review" className="block font-semibold mb-1">Review</label>
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
                <label htmlFor="t-photo" className="block font-semibold mb-1">Photo</label>
                <input type="file" id="t-photo" accept="image/*" className="w-full" onChange={handlePhotoChange} />
                {uploadedImage && <img src={uploadedImage} className="mt-2 testimonial-img" alt="Preview" />}
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
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded font-bold transition"
              >
                ✅ Add Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
