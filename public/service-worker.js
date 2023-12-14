const CACHE_NAME = 'pancake-chat-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'script.js',
  'style.css'
];
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('your-cache-name').then((cache) => {
        return cache.addAll(urlsToCache);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  