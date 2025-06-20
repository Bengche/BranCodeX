// Filtering

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".filter-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    projectCards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Lightbox
const lightbox = document.getElementById("lightbox-modal");
const lightboxImg = document.getElementById("lightbox-img");
const triggers = document.querySelectorAll(".lightbox-trigger");
const closeBtn = document.querySelector(".close-lightbox");

triggers.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
  });
});

closeBtn.onclick = () => {
  lightbox.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
};

const modal = document.getElementById("testimonialModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const testimonialForm = document.getElementById("testimonialForm");
const testimonialList = document.getElementById("testimonialList");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");

// Assign unique ID to session if not already
if (!sessionStorage.getItem("userId")) {
  sessionStorage.setItem("userId", Date.now().toString());
}

let userId = sessionStorage.getItem("userId");
let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];

let currentEditIndex = null;
let uploadedImage = "";

// Preview uploaded image
photoInput.addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    uploadedImage = e.target.result;
    photoPreview.src = uploadedImage;
    photoPreview.style.display = "block";
  };
  if (file) reader.readAsDataURL(file);
});
// Open modal
openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  testimonialForm.reset();
  photoPreview.style.display = "none";
  uploadedImage = "";
  currentEditIndex = null;
});

// Close modal
closeModalBtn.addEventListener("click", () => (modal.style.display = "none"));

testimonialForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const review = document.getElementById("review").value;
  const rating = parseInt(document.getElementById("rating").value);

  const testimonialData = {
    name,
    review,
    rating,
    photo: uploadedImage || "https://i.pravatar.cc/100",
    userId,
  };

  if (currentEditIndex !== null) {
    testimonials[currentEditIndex] = testimonialData;
  } else {
    testimonials.unshift(testimonialData);
  }
  localStorage.setItem("testimonials", JSON.stringify(testimonials));
  displayTestimonials(testimonials);
  testimonialForm.reset();
  photoPreview.style.display = "none";
  modal.style.display = "none";
});

function displayTestimonials(list) {
  testimonialList.innerHTML = "";

  list.forEach((t, index) => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", index * 100);

    card.innerHTML = `
        <img src="${t.photo}" alt="${t.name}" />
        <h4>${t.name}</h4>
        <div class="stars">${"⭐".repeat(t.rating)}</div>
        <p>${t.review}</p>
        ${
          t.userId === userId
            ? `
          <div class="card-actions">
            <button onclick="editTestimonial(${index})" class="edit-btn">✏ Edit</button>
            <button onclick="deleteTestimonial(${index})" class="delete-btn">🗑 Delete</button>
          </div>`
            : ""
        }
      `;

    testimonialList.appendChild(card);
  });
  AOS.refresh();
}

function deleteTestimonial(index) {
  if (confirm("Are you sure you want to delete this review?")) {
    testimonials.splice(index, 1);
    localStorage.setItem("testimonials", JSON.stringify(testimonials));
    displayTestimonials(testimonials);
  }
}

function editTestimonial(index) {
  const t = testimonials[index];
  document.getElementById("name").value = t.name;
  document.getElementById("review").value = t.review;
  document.getElementById("rating").value = t.rating;
  photoPreview.src = t.photo;
  photoPreview.style.display = "block";
  uploadedImage = t.photo;
  currentEditIndex = index;
  modal.style.display = "flex";
}

function filterTestimonials(filter) {
  if (filter === "all") {
    displayTestimonials(testimonials);
  } else {
    const minRating = parseInt(filter);
    const filtered = testimonials.filter((t) => t.rating >= minRating);
    displayTestimonials(filtered);
  }
}

// Initial Load
displayTestimonials(testimonials);

function sendMessage(e) {
  e.preventDefault();

  const status = document.getElementById("message-status");
  status.textContent = "Sending message...";

  setTimeout(() => {
    status.textContent = "Thank you! I'll get back to you soon 😊";
    document.querySelector(".contact-form").reset();
  }, 1500);
}

// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));

// Theme toggle
const body = document.body;
const themeBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeBtnMob = document.getElementById("theme-toggle-mob");
const themeIconMob = document.getElementById("theme-icon-mob");

function toggleTheme() {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    themeIcon.className = "fas fa-sun";
    themeIconMob.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
    themeIconMob.className = "fas fa-moon";
  }

  // if (body.style.backgroundColor === "#1e293b") {
  //   body.style.backgroundColor = "#f8fafc"; // Light mode background
  // } else {
  //   body.style.backgroundColor = "#1e293b"; // Dark mode background
  // }
}

themeBtn.addEventListener("click", toggleTheme);
themeBtnMob.addEventListener("click", toggleTheme);

// Active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.onscroll = () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-blue-400");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("text-blue-400");
    }
  });
};

AOS.init({ duration: 1000, once: true });

// Animate circular progress when in view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const circle = entry.target.querySelector(".value");
        const percent = entry.target.getAttribute("data-percent");
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        circle.style.transition = "stroke-dashoffset 1.5s ease-in-out";
        circle.style.strokeDashoffset = offset;
      }
    });
  },
  { threshold: 0.6 }
);

document
  .querySelectorAll(".skill-circle")
  .forEach((el) => observer.observe(el));
