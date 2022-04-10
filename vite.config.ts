import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	root: "src",
	assetsInclude: ["./assets/**/*.*"],
	build: {
		emptyOutDir: true,
		outDir: "../public",
		sourcemap: true,
	},
	server: {
		port: 3006,
	},
});
