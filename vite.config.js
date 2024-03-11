import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";
import fs from "fs";

function versionPlugin() {
	return {
		name: "version-plugin",
		generateBundle(options, bundle) {
			console.log("Generating version.json");

			// Fetch the version from package.json
			const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

			const versionInfo = {
				version: packageJson.version,
				buildTime: new Date().toISOString(),
			};

			const versionFilePath = "version.json";

			// Add the file to the Vite build bundle
			this.emitFile({
				type: "asset",
				fileName: versionFilePath,
				source: JSON.stringify(versionInfo),
			});
		},
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				if (/version\.json$/.test(req.url)) {
					const packageJson = JSON.parse(
						fs.readFileSync("./package.json", "utf8"),
					);
					res.setHeader("Content-Type", "application/json");
					res.end(
						JSON.stringify({
							version: packageJson.version,
							buildTime: new Date().toISOString(),
						}),
					);
					return;
				}
				next();
			});
		},
	};
}

export default defineConfig({
	root: "./",
	base: "https://andrewlemons.github.io/hive-screen/",
	build: {
		outDir: "./dist",
	},
	plugins: [vue(), versionPlugin()],
	css: {
		postcss: {
			plugins: [tailwindcss()],
		},
	},
});
