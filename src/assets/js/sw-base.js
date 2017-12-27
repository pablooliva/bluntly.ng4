importScripts("workbox-sw.prod.js");

const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
});

self.addEventListener("push", (event) => {
  const title = "b.luntly says...";
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

workbox.precache([]);