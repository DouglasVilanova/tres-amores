import type { NextConfig } from "next";
import { buildCsp } from "./lib/csp";

const dev = process.env.NODE_ENV !== "production";

const headersSeguranca = [
  { key: "Content-Security-Policy", value: buildCsp({ dev }) },
  // Sem includeSubDomains/preload: o domínio é do cliente e pode ter subdomínios fora do site.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { unoptimized: true },
  async headers() {
    return [{ source: "/:path*", headers: headersSeguranca }];
  },
};

export default nextConfig;
