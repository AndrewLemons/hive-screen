import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";

export default defineConfig({
	root: "src",
	base: "https://andrewlemons.github.io/hive-screen/",
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
