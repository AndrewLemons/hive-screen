<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMotionStore } from "../store";

const motionStore = useMotionStore();
const isFullscreen = ref(false);

function toggleFullscreen() {
	window.document.documentElement.requestFullscreen();
}

function updateFullscreen() {
	if (document.fullscreenElement) {
		isFullscreen.value = true;
	} else {
		isFullscreen.value = false;
	}
}

onMounted(() => {
	window.addEventListener("fullscreenchange", updateFullscreen);
});
</script>

<template>
	<button
		v-if="!isFullscreen && motionStore.isActive"
		class="fixed right-4 top-4 z-10 rounded-md bg-gray-800 p-2 text-white"
		@click="toggleFullscreen"
	>
		Fullscreen
	</button>
</template>
