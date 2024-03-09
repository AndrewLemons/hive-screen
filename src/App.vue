<script setup lang="ts">
import { ref, watchEffect } from "vue";

import Logo from "./components/Logo.vue";
import Clock from "./components/Clock.vue";
import Alert from "./components/Alert.vue";
import ResizeMessage from "./components/ResizeMessage.vue";

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
	<div class="absolute inset-0 bg-black z-0" ref="container">
		<div
			class="absolute inset-0 p-8 gap-8 grid grid-cols-1 grid-rows-3"
			v-if="hasValidSize"
		>
			<Logo />
			<Clock />
			<Alert />
		</div>
		<ResizeMessage v-else />
	</div>
</template>
