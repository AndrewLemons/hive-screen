<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { emitter, MINUTE_EVENT } from "../ts/events";

const container = ref(null);
const time = ref("");

function updateClock() {
	let now = new Date();

	// Get the time
	let hours = now.getHours();
	let minutes = now.getMinutes();

	// Parse hours to AM or PM
	const amPm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;

	// Format times
	let hoursStr = hours === 0 ? "12" : `${hours}`;
	let minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

	time.value = `${hoursStr}:${minutesStr} ${amPm}`;
}

function updateScale() {
	if (!container.value) return;
	let $element = container.value as HTMLElement;
	$element.style.fontSize = `${$element.clientHeight - 20}px`;
	$element.style.lineHeight = `${$element.clientHeight}px`;
}

watchEffect(updateScale);

onMounted(() => {
	updateClock();
	emitter.on(MINUTE_EVENT, updateClock);
});
</script>

<template>
	<div class="flex items-center justify-center" ref="container">
		<p class="font-bold text-white">{{ time }}</p>
	</div>
</template>
