const CACHE_NAME = "spailpad-cache-v1";
const FILES_TO_CACHE = [
  "./index.html",
  "./style.css",
  "./script.js",
  "./css/bootstrap.min.css",
  "./js/bootstrap.bundle.js",
  "./songs/s1.m4a",
  "./songs/s2.m4a",
  "./songs/s3.m4a",
  "./songs/s4.m4a",
  "./songs/s5.m4a",
  "./background.gif",
  "./Spailã.png",
  "./Spailãpad.png",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});
