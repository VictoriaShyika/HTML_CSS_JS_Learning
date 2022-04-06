self.addEventListener('install', e => {
    e.waitUntil(
      caches.open('video-store').then(function(cache) {
        return cache.addAll([
          '/home/vika/web-projects/HTML-CSS-JS-Learning/Client-side_web_APIs/indexeddb/video-store-offline',
          '/home/vika/web-projects/HTML-CSS-JS-Learning/Client-side_web_APIs/indexeddb/video-store-offline/index.html',
          '/home/vika/web-projects/HTML-CSS-JS-Learning/Client-side_web_APIs/indexeddb/video-store-offline/index.js',
          '/home/vika/web-projects/HTML-CSS-JS-Learning/Client-side_web_APIs/indexeddb/video-store-offline/style.css'
        ]);
      })
    );
   });
   
   self.addEventListener('fetch', e => {
     console.log(e.request.url);
     e.respondWith(
       caches.match(e.request).then(response => response || fetch(e.request))
     );
   });