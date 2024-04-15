<script setup lang="ts">
import { computed } from "vue";
import { useMusicStore, useScaleStore } from "../store";

const musicStore = useMusicStore();
const scaleStore = useScaleStore();

const fontSize = computed(() => scaleStore.scale * 0.025);
const lineHeight = computed(() => scaleStore.scale * 0.03);
const barHeight = computed(() => scaleStore.scale * 0.015);
</script>

<template>
	<div
		class="absolute bottom-0 left-0 right-0"
		:style="`height: ${barHeight}px`"
	>
		<div
			class="bar h-full bg-yellow-500 transition"
			:style="`width: ${musicStore.progress}%`"
		/>
	</div>
	<div
		class="absolute left-0 right-0 flex flex-col items-start bg-black bg-opacity-50 px-2 py-1 text-center text-white"
		:style="`font-size: ${fontSize}px; line-height: ${lineHeight}px; bottom: ${barHeight}px`"
	>
		<TransitionGroup name="slide" mode="out-in">
			<template v-if="musicStore.state === 1 || musicStore.state === 8">
				<span class="font-bold">Loading...</span>
			</template>
			<template v-else-if="musicStore.state === 2">
				<span class="font-bold">Now Playing</span>
				<span>{{ musicStore.name }}</span>
			</template>
		</TransitionGroup>
	</div>
</template>

<style scoped>
.bar {
	transition: width 1s linear;
}

.slide-enter-active,
.slide-leave-active {
	transition:
		transform 0.5s,
		opacity 0.5s;
}

.slide-enter-from,
.slide-leave-to {
	transform: translateX(-100%);
	opacity: 0;
}
</style>
