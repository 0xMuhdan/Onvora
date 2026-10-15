import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack does not walk up into the home directory.
  turbopack: {
    root: path.resolve(__dirname),
  },
  poweredByHeader: false,
  reactStrictMode: true,
  // Onvora keeps its own canonical AGENTS.md; stop `next dev` from rewriting it.
  agentRules: false,
};

export default nextConfig;
