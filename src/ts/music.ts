import { useMusicStore } from "../store";

const songs = ["362089058", "1689239213", "1689239788"];
const MusicKit = (window as any).MusicKit;

export default class Music {
	static instance: Music;
	musicStore = useMusicStore();
	kit: any;

	constructor() {
		if (Music.instance) {
			return Music.instance;
		}

		Music.instance = this;
	}

	async init() {
		if (this.kit) return;

		const MusicKit = (window as any).MusicKit;

		await MusicKit.configure({
			developerToken: import.meta.env.VITE_APPLE_DEV_TOKEN,
			app: {
				name: "hive-screen",
				build: "1.0.0",
			},
		});

		this.kit = MusicKit.getInstance();

		this.kit.addEventListener("metadataDidChange", (event: any) => {
			console.log("metadataDidChange", event);
			let currentItem = this.kit.nowPlayingItem;
			if (!currentItem) return;
			console.log("Setting name", currentItem.attributes.name);
			this.musicStore.setName(
				currentItem.attributes.name + " - " + currentItem.attributes.artistName,
			);
		});

		this.kit.addEventListener("playbackProgressDidChange", (event: any) => {
			let progress = Math.round(event.progress * 100);
			this.musicStore.setProgress(progress);

			if (progress <= 1) {
				let currentItem = this.kit.nowPlayingItem;
				if (!currentItem) return;
				console.log("Setting name", currentItem.attributes.name);
				this.musicStore.setName(
					currentItem.attributes.name +
						" - " +
						currentItem.attributes.artistName,
				);
			}
		});

		this.kit.addEventListener("playbackStateDidChange", async (event: any) => {
			this.musicStore.state = event.state;
		});

		this.kit.addEventListener("lo", async (event: any) => {
			console.log("Queue items changed", event);
		});
	}

	async start() {
		console.log("Starting music");
		await this.init();
		await this.updateQueue();
		await this.kit.play();
	}

	async stop() {
		console.log("Stopping music");
		await this.kit.stop();
	}

	private async updateQueue() {
		this.kit.shuffleMode = MusicKit.PlayerShuffleMode.songs;
		await this.kit.setQueue({
			playlist: "pl.u-pMylgaYu5rVlPZ3",
			repeatMode: MusicKit.PlayerRepeatMode.all,
		});
	}
}
