<script setup lang="ts">
import { ref, watchEffect } from "vue";

import Logo from "./components/Logo.vue";
import Clock from "./components/Clock.vue";
import Alert from "./components/Alert.vue";

const container = ref(null);
const hasValidSize = ref(true);

function updateScale() {
	if (!container.value) return;

	let $container = container.value as HTMLElement;
	console.log("resize", $container.clientWidth, $container.clientHeight);
	hasValidSize.value = $container.clientWidth > $container.clientHeight * 1.25;
}

watchEffect(updateScale);
window.addEventListener("resize", updateScale);
</script>

<template>
	<div class="absolute inset-0 bg-gray-900" ref="container">
		<div
			class="absolute inset-0 p-8 gap-8 grid grid-cols-1 grid-rows-3"
			v-if="hasValidSize"
		>
			<Logo />
			<Clock />
			<Alert />
		</div>
		<div class="absolute inset-0 flex items-center justify-center" v-else>
			<p class="text-white text-4xl font-bold p-8">
				Please resize the window to a valid aspect ratio
			</p>
		</div>
	</div>
</template>
