import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, CacheableResponsePlugin, ExpirationPlugin, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: WorkerGlobalScope;

const openStreetMapCache = {
  matcher({ request, url }: { request: Request; url: URL }) {
    return (
      request.destination === "image" &&
      (url.hostname === "tile.openstreetmap.org" ||
        url.hostname.endsWith(".tile.openstreetmap.org"))
    );
  },
  handler: new CacheFirst({
    cacheName: "openstreetmap-tiles",
    plugins: [
      new CacheableResponsePlugin({
        // Cross-origin OSM tiles may have an opaque status of 0.
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 300,
        maxAgeSeconds: 7 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  }),
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,

  // The OSM rule must precede Serwist's default runtime rules.
  runtimeCaching: [openStreetMapCache, ...defaultCache],

  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
