const CACHE_NAME = "BranCodeX-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json", // Add this
  "/Images/icon-192.png", // Add your icons
  "/Images/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Using .addAll is "all or nothing" - if one fails, the whole thing fails.
      return cache.addAll(ASSETS);
    }),
  );
});
