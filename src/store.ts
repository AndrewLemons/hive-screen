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

export const useOpeningsStore = defineStore("openings", {
	state: () => ({
		[Days[0]]: {
			isOpen: false,
			open: "00:00",
			close: "00:00",
		},
		[Days[1]]: {
			isOpen: true,
			open: "10:00",
			close: "18:00",
		},
		[Days[2]]: {
			isOpen: true,
			open: "10:00",
			close: "18:00",
		},
		[Days[3]]: {
			isOpen: true,
			open: "10:00",
			close: "18:00",
		},
		[Days[4]]: {
			isOpen: true,
			open: "10:00",
			close: "18:00",
		},
		[Days[5]]: {
			isOpen: true,
			open: "10:00",
			close: "18:00",
		},
		[Days[6]]: {
			isOpen: false,
			open: "00:00",
			close: "00:00",
		},
	}),
	actions: {
		load() {
			// Load from the localStorage
			const data = localStorage.getItem("openings");
			if (data) {
				const parsed = JSON.parse(data);
				for (const key in parsed) {
					this[key] = parsed[key];
				}
			}
		},
		save() {
			// Save to the localStorage
			localStorage.setItem("openings", JSON.stringify(this.$state));
		},
		setHours(day: Days, isOpen: boolean, open: string, close: string) {
			// Ensure open and close are valid times
			const openTime =
				parseInt(open.split(":")[0]) * 60 + parseInt(open.split(":")[1]);
			const closeTime =
				parseInt(close.split(":")[0]) * 60 + parseInt(close.split(":")[1]);
			if (
				openTime < 0 ||
				openTime >= 1440 ||
				closeTime < 0 ||
				closeTime >= 1440
			) {
				throw new Error("Invalid opening hours");
			}

			// Update the store
			this[day].isOpen = isOpen;
			this[day].open = open;
			this[day].close = close;
		},
	},
	getters: {
		isOpen(state): boolean {
			const datetime = new Date();
			const day = datetime.getDay();
			const dayString = Days[day];
			const { isOpen, open, close } = state[dayString];
			if (!isOpen) {
				return false;
			}
			const now = datetime.getHours() * 60 + datetime.getMinutes();
			const openTime =
				parseInt(open.split(":")[0]) * 60 + parseInt(open.split(":")[1]);
			const closeTime =
				parseInt(close.split(":")[0]) * 60 + parseInt(close.split(":")[1]);
			return now >= openTime && now <= closeTime;
		},
		isOpenToday(state): boolean {
			const datetime = new Date();
			const day = datetime.getDay();
			const dayString = Days[day];
			const { isOpen } = state[dayString];
			return isOpen;
		},
		isClosingSoon(state): boolean {
			const datetime = new Date();
			const day = datetime.getDay();
			const dayString = Days[day];
			const { isOpen, open, close } = state[dayString];
			if (!isOpen) {
				return false;
			}
			const now = datetime.getHours() * 60 + datetime.getMinutes();
			const closeTime =
				parseInt(close.split(":")[0]) * 60 + parseInt(close.split(":")[1]);
			return closeTime - now <= 30 && closeTime - now >= 0;
		},
		isOpeningSoon(state): boolean {
			const datetime = new Date();
			const day = datetime.getDay();
			const dayString = Days[day];
			const { isOpen, open } = state[dayString];
			if (!isOpen) {
				return false;
			}
			const now = datetime.getHours() * 60 + datetime.getMinutes();
			const openTime =
				parseInt(open.split(":")[0]) * 60 + parseInt(open.split(":")[1]);
			return openTime - now <= 30 && openTime - now >= 0;
		},
		openingInDuration(state): number {
			const datetime = new Date();
			const day = datetime.getDay();
			const dayString = Days[day];
			const { isOpen, open } = state[dayString];
			if (!isOpen) {
				return 0;
			}
			const now = datetime.getHours() * 60 + datetime.getMinutes();
			const openTime =
				parseInt(open.split(":")[0]) * 60 + parseInt(open.split(":")[1]);
			return openTime - now;
		},
		closingInDuration(state): number {
			const datetime = new Date();
			const day = datetime.getDay();
			const dayString = Days[day];
			const { isOpen, close } = state[dayString];
			if (!isOpen) {
				return 0;
			}
			const now = datetime.getHours() * 60 + datetime.getMinutes();
			const closeTime =
				parseInt(close.split(":")[0]) * 60 + parseInt(close.split(":")[1]);
			return closeTime - now;
		},
	},
});

export enum Days {
	SUNDAY = 0,
	MONDAY = 1,
	TUESDAY = 2,
	WEDNESDAY = 3,
	THURSDAY = 4,
	FRIDAY = 5,
	SATURDAY = 6,
}
