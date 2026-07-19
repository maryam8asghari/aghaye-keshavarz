import { spawnSync } from "node:child_process";
import { createSerwistRoute } from "@serwist/turbopack";

// Using `git rev-parse HEAD` might not the most efficient
// way of determining a revision. You may prefer to use
// the hashes of every extra file you precache.
let revision: string;
try {
  revision = spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout.trim();
  if (!revision) throw new Error("empty");
} catch {
  revision = crypto.randomUUID();
}

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute(
  {
    additionalPrecacheEntries: [{ url: "/~offline", revision }],
    swSrc: "src/app/sw.ts",
    useNativeEsbuild: false,
  },
);
