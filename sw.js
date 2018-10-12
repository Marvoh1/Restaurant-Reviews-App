const cacheName = 'v1';

const cacheAssets = [
  '/',
  'restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js'
];

// installing event

self.addEventListener('install', e=> {
  console.log('Service Worker: installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('service worker caching files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
    );
})

// calling activate event

self.addEventListener('activate', e=> {
  console.log('Service Worker: activated');
  // remove previous caches
  e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if(cache !== cacheName) {
              console.log('service worker: clearing old cache');
              return caches.delete(cache);
            }
          })

          )
      })
    );
});

//  fetching Event
self.addEventListener('fetch', e => {
  console.log('service worker fetching cache');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});