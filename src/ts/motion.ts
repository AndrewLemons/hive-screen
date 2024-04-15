import type { Plugin } from "vue";
import { useMotionStore } from "../store";

export const motionPlugin: Plugin = {
	install(app) {
		const store = useMotionStore();
		let lastCallback = 0;

		window.addEventListener("mousemove", () => {
			store.setActive(true);
			store.setLastMotion(Date.now());

			if (lastCallback) {
				clearTimeout(lastCallback);
			}

			lastCallback = setTimeout(() => {
				store.setActive(false);
			}, 5000);
		});
	},
};
