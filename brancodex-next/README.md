# BranCodeX — Next.js Portfolio

A professionally crafted Next.js 14 portfolio for BranCodeX, a web development agency based in **Bamenda, Cameroon**.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework, SSR, SEO metadata API |
| **React 18** | Component library |
| **Tailwind CSS** | Utility-first styling (via npm, not CDN) |
| **AOS** | Scroll animations |
| **Typed.js** | Hero text animation |
| **@emailjs/browser** | Contact form email delivery |
| **JSZip** | Download ZIP in the Live Code Editor |
| **Font Awesome 6.5** | Icons (loaded via CDN link) |

---

## Project Structure

```
brancodex-next/
├── app/
│   ├── layout.js          # Root HTML, global SEO metadata, Font Awesome, AOSProvider
│   ├── globals.css        # All styles (Tailwind + AOS + custom)
│   ├── page.js            # Home page
│   ├── sitemap.js         # Auto-generated XML sitemap
│   ├── robots.js          # robots.txt
│   ├── faq/
│   │   └── page.js        # FAQ page (accordion, no JS required)
│   └── playground/
│       └── page.js        # Interactive playground page
│
├── components/
│   ├── AOSProvider.jsx    # Initialises AOS on client
│   ├── Navbar.jsx         # Responsive navbar with mobile hamburger menu
│   ├── Footer.jsx         # Footer with quick links and social icons
│   ├── Hero.jsx           # Hero with Typed.js animation
│   ├── ResultsStrip.jsx   # 4-stat results strip
│   ├── About.jsx          # About section with scroll animation
│   ├── Services.jsx       # Services slider
│   ├── Plans.jsx          # Pricing plans with expandable feature lists
│   ├── Skills.jsx         # Tabbed skills section
│   ├── Projects.jsx       # Projects slider with live iframe preview
│   ├── PlaygroundTeaser.jsx
│   ├── Testimonials.jsx   # Add/edit/delete reviews (localStorage)
│   ├── Contact.jsx        # EmailJS contact form
│   ├── CTASection.jsx     # Call-to-action banner
│   └── playground/
│       ├── JokesSection.jsx     # Random joke fetcher
│       ├── QuizSection.jsx      # Full quiz game
│       └── LiveCodeEditor.jsx   # HTML/CSS/JS live editor
│
└── data/
    ├── faqData.js         # 20 FAQ items
    └── quizData.js        # 50 Cameroon + 20 Riddle questions + OpenTDB config
```

---

## Getting Started

### 1. Copy your images

Copy all contents from the original `Images/` folder into `brancodex-next/public/images/`:

```
Updated Portfolio/
├── Images/        ← copy the contents of this folder
└── brancodex-next/
    └── public/
        └── images/  ← paste here
```

Also copy your logo file (e.g. `brancodex-logo.png`) into `public/images/`.

### 2. Install dependencies

```bash
cd brancodex-next
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Before Going Live

### Update these values in your code

| File | What to update |
|---|---|
| `app/layout.js` | Replace `https://brancodex.com` with your real domain |
| `app/sitemap.js` | Same — update the base URL |
| `app/robots.js` | Same |
| `components/Contact.jsx` | Verify EmailJS keys are still valid |
| `components/Projects.jsx` | Add real project thumbnails to `public/images/` |
| `next.config.mjs` | Add any external image domains you use |

### Build for production

```bash
npm run build
npm start
```

---

## EmailJS Setup

The contact form uses your existing EmailJS account. Keys are in `components/Contact.jsx`:

```js
const EMAILJS_SERVICE  = 'service_4i8dgy8';
const EMAILJS_TEMPLATE = 'template_cncjp0c';
const EMAILJS_KEY      = 'JwE9TMk7vUP9adouM';
```

If these stop working, log into [emailjs.com](https://www.emailjs.com) and regenerate them.

---

## SEO

- **Metadata API** — every page exports a `metadata` object (title, description, canonical, openGraph, twitter)
- **JSON-LD** — Organization + Person + WebSite structured data in `app/layout.js`
- **Sitemap** — auto-generated at `/sitemap.xml` via `app/sitemap.js`
- **robots.txt** — auto-generated at `/robots.txt`
- **Keywords** — include "web development Cameroon", "best website designer Bamenda", "web developer Cameroon", and global terms
- **Core Web Vitals** — images use `next/image` with `priority` flag on LCP images, AOS `once: true` prevents layout shift

---

## Adding a Backend Later

When you are ready to add your Node.js + Express + PostgreSQL backend:

1. You can keep this Next.js frontend as-is and point fetch calls to your backend API URL.
2. Or use Next.js **Route Handlers** (`app/api/` folder) if you prefer a unified codebase.

No changes are needed to the existing components — they are all pure frontend.

---

## License

Private project — BranCodeX. All rights reserved.
