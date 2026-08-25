import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Pin the workspace root: there's a stray package-lock.json in the home
	// directory above this project, which Turbopack would otherwise infer as root.
	turbopack: {
		root: __dirname,
	},
};

export default nextConfig;
