const CACHE_NAME = 'pedidofacil-entregador-v1';
const urlsToCache = [
  '/entregador/',
  '/entregador/index.html',
  '/entregador/login.html',
  '/entregador/dashboard.html',
  '/entregador/pedido-ativo.html',
  '/entregador/historico.html',
  '/entregador/style.css',
  '/entregador/script.js'
];

// Instala o service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Busca do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Atualiza cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
