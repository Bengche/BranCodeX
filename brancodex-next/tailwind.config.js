/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind which files contain class names so unused styles are removed
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
