<script setup lang="ts">
import { ref, onMounted } from "vue";
import lerp from "../ts/lerp";

const percentError = ref(0);
const percentColor = ref("rgb(255, 0, 0)");

function updateScale() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	const expected = height * 1.25;
	percentError.value = (1 - Math.abs((width - expected) / expected)) * 100;

	// Lerp between red and green
	const t = percentError.value / 100;
	percentColor.value = `rgb(${lerp(255, 0, t)}, ${lerp(0, 255, t)}, 0)`;
}

onMounted(() => {
	updateScale();
	window.addEventListener("resize", updateScale);
});
</script>

<template>
	<div
		class="absolute inset-0 flex flex-col items-start justify-center gap-4 p-8"
	>
		<p class="text-white text-4xl font-bold">
			Resize your screen to be landscape.
		</p>
		<p class="text-white text-xl font-bold">
			You don't have to, but it'll work if you do.
		</p>
		<p class="text-white text-lg">
			Your screen is
			<span class="font-bold" :style="`color: ${percentColor}`"
				>{{ percentError.toFixed(2) }}%</span
			>
			of the expected size.
		</p>
	</div>
</template>
