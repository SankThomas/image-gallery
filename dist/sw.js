// Check whethe the browser supports service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js', { scope: './' })
    .then((reg) => {
      console.log(`Service worker registered`)
    })
    .catch((error) => {
      console.log(`Registration failed`)
    })
}

// Listen for an install event on the application
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        './css/style.min.css',
        './images/antiquites-store.jpg',
        './images/blue-car.jpg',
        './images/cassette.jpg',
        './images/old-school-parking-lot.jpg',
        './images/phone.jpg',
        './images/queen.jpg',
        './js/main.js',
        './index.html',
        './login.html',
        './signup.html',
        './manifest.json',
        './sw.js'
      ])
    })
  )
})

// Fetch from server, download and cache in application
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((resp) => {
      return (
        resp ||
        fetch(e.request).then((response) => {
          return caches
            .open('v1')
            .then((cache) => {
              cache.put(e.request, response.clone())
              return response
            })
            .catch(() => {
              return caches.match('./offline.html')
            })
        })
      )
    })
  )
})

/*
Add this block when you want to update serviceWorkers

self.addEventListener('activate', (e) => {
  var cacheKeeplist = ['v2'];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

*/
