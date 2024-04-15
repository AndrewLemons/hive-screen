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
			//"eyJhbGciOiJFUzI1NiIsImtpZCI6IlZEQlI0Nlk3VzMifQ.eyJpc3MiOiJTOFBYRldVVEdBIiwiaWF0IjoxNzEyNjIzMDEwLCJleHAiOjE3Mjg0MDAwMTB9.eeJnKtimxDgOyfl8tNGKdZAHCU2DcGnw5El2OICsV521xLP5juTn-n479AlAGDYhXyodX3622yimbRPUNqfjMw",
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
			playlist: "pl.102a45355eec4df69fc833f8ca59627d",
			repeatMode: MusicKit.PlayerRepeatMode.all,
		});
	}
}

// document.addEventListener('musickitloaded', async function () {
// 	// Call configure() to configure an instance of MusicKit on the Web.
// 	try {
// 	  await MusicKit.configure({
// 		developerToken: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IlZEQlI0Nlk3VzMifQ.eyJpc3MiOiJTOFBYRldVVEdBIiwiaWF0IjoxNzEyNjIzMDEwLCJleHAiOjE3Mjg0MDAwMTB9.eeJnKtimxDgOyfl8tNGKdZAHCU2DcGnw5El2OICsV521xLP5juTn-n479AlAGDYhXyodX3622yimbRPUNqfjMw',
// 		app: {
// 		  name: 'hive-screen',
// 		  build: '1.0.0',
// 		},
// 	  });
// 	} catch (err) {
// 	  // Handle configuration error
// 	}

// 	// MusicKit instance is available
// 	const music = MusicKit.getInstance();

// 	await music.authorize();

// 	console.log("Authorized MusicKit instance")

// 	await music.setQueue({
// 		song: "1689239213"
// 	});

// 	await music.play()
// });
