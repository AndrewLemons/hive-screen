<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMusicStore, useMotionStore } from "../store";
import Music from "../ts/music";

const musicStore = useMusicStore();
const motionStore = useMotionStore();

const music = new Music();

const isAuthorized = ref(false);

async function authorize() {
	await music.kit.authorize();
}

async function start() {
	await music.start();
}

async function stop() {
	await music.stop();
}

onMounted(async () => {
	await music.init();

	music.kit.addEventListener("authorizationStatusDidChange", () => {
		isAuthorized.value = music.kit.isAuthorized;
	});
	isAuthorized.value = music.kit.isAuthorized;
});
</script>

<template>
	<template v-if="motionStore.isActive">
		<button
			v-if="!isAuthorized"
			class="fixed bottom-4 right-4 z-10 rounded-md bg-gray-800 p-2 text-white"
			@click="authorize"
		>
			Authenticate Music
		</button>
		<button
			v-else-if="[0, 6, 10].indexOf(musicStore.state) > -1"
			class="fixed bottom-4 right-4 z-10 rounded-md bg-gray-800 p-2 text-white"
			@click="start"
		>
			Start Music
		</button>
		<button
			v-else-if="musicStore.state === 2"
			class="fixed bottom-4 right-4 z-10 rounded-md bg-gray-800 p-2 text-white"
			@click="stop"
		>
			Stop Music
		</button>
	</template>
</template>
