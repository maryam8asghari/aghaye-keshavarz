// @ts-check
import { withSerwist } from "@serwist/turbopack";

/** @type {import("next").NextConfig} */
const nextConfig = withSerwist({
  reactStrictMode: true,
   images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
});

export default nextConfig;