// Check whether the browser supports serviceWorkers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then((reg) => {
      console.log('Service worker registered')
    })
    .catch((error) => {
      console.log('Service worker not registered')
    })
}

// Listen for the install event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        './',
        './css/style.min.css',
        './images/antiquities-store.jpg',
        './images/bike.jpg',
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

// Fetch new resources, update the cache, and save the resources
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
