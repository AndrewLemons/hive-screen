<script setup lang="ts">
import { ref, computed } from "vue";
import { useMotionStore, useScaleStore } from "./store";

import Logo from "./components/Logo.vue";
import Clock from "./components/Clock.vue";
import Alert from "./components/Alert.vue";
import ResizeMessage from "./components/ResizeMessage.vue";
import FullscreenButton from "./components/FullscreenButton.vue";
import MusicButton from "./components/MusicButton.vue";
import MusicBar from "./components/MusicBar.vue";

const container = ref(null);
const motionStore = useMotionStore();
const scaleStore = useScaleStore();

const hasValidSize = computed(
	() => scaleStore.width > scaleStore.height * 1.25,
);
</script>

<template>
	<div
		:class="[
			'absolute inset-0 z-0 bg-black',
			{
				'cursor-none': !motionStore.isActive,
				'cursor-pointer': motionStore.isActive,
			},
		]"
		ref="container"
	>
		<FullscreenButton />
		<MusicButton />
		<div
			class="absolute inset-0 grid grid-cols-1 grid-rows-3 gap-8 p-8"
			v-if="hasValidSize"
		>
			<Logo />
			<Clock />
			<Alert />
			<MusicBar />
		</div>
		<ResizeMessage v-else />
	</div>
</template>
