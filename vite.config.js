import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";

export default defineConfig({
	root: "src",
	build: {
		outDir: "../dist",
	},
	plugins: [vue()],
	css: {
		postcss: {
			plugins: [tailwindcss()],
		},
	},
});
