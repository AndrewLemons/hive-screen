<script setup lang="ts">
import { ref, watchEffect } from "vue";

import Logo from "./components/Logo.vue";
import Clock from "./components/Clock.vue";
import Alert from "./components/Alert.vue";
import ResizeMessage from "./components/ResizeMessage.vue";
import FullscreenButton from "./components/FullscreenButton.vue";

const container = ref(null);
const hasValidSize = ref(true);

function updateScale() {
	if (!container.value) return;
	let $container = container.value as HTMLElement;
	hasValidSize.value = $container.clientWidth > $container.clientHeight * 1.25;
}

watchEffect(updateScale);
window.addEventListener("resize", updateScale);
</script>

<template>
	<div class="absolute inset-0 z-0 bg-black" ref="container">
		<FullscreenButton />
		<div
			class="absolute inset-0 grid grid-cols-1 grid-rows-3 gap-8 p-8"
			v-if="hasValidSize"
		>
			<Logo />
			<Clock />
			<Alert />
		</div>
		<ResizeMessage v-else />
	</div>
</template>
