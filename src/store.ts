import { defineStore } from "pinia";

export const useScaleStore = defineStore("scale", {
	state: () => ({
		width: window.innerWidth,
		height: window.innerHeight,
		scale: Math.min(window.innerWidth, window.innerHeight),
	}),
	actions: {
		updateSize() {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.scale = Math.min(this.width, this.height);
		},
	},
});

export const useMotionStore = defineStore("motion", {
	state: () => ({
		isActive: false,
		lastMotion: 0,
	}),
	actions: {
		setActive(active: boolean) {
			this.isActive = active;
		},
		setLastMotion(time: number) {
			this.lastMotion = time;
		},
	},
});

export const useMusicStore = defineStore("music", {
	state: () => ({
		state: 0,
		name: "",
		progress: 0,
	}),
	actions: {
		setName(name: string) {
			this.name = name;
		},
		setProgress(progress: number) {
			this.progress = progress;
		},
		reset() {
			this.name = "";
			this.progress = 0;
		},
	},
});
