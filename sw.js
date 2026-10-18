// Retires the old MemeVault service worker at /memevault/ so installed copies stop serving the old cached site.
// The image cache (mv-img-v1) is left for the new MemeSpire worker, which migrates it.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith("mv-shell-") || k.startsWith("mv-data-")) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: "window" })) c.navigate(c.url);
})()));
