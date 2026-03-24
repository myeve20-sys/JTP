const CACHE = 'jtp-v1';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)))
);
self.addEventListener('fetch', e => {
  if (e.request.url.includes('script.google.com')) return; // API는 캐시 안함
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});