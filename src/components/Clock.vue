<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { emitter, MINUTE_EVENT } from "../ts/events";
import Digit from "./Digit.vue";

const container = ref(null);
const fontSize = ref("24pt");
const lineHeight = ref("24pt");
const digits = ref(["0", "0", "0", "0"]);
const amPm = ref("AM");

function updateClock() {
	let now = new Date();

	// Get the time
	let hours = now.getHours();
	let minutes = now.getMinutes();

	// Convert to 12-hour time
	if (hours > 12) {
		hours -= 12;
		amPm.value = "PM";
	} else {
		amPm.value = "AM";
		if (hours === 0) hours = 12;
	}

	// Pad with zeroes without using padStart
	let hoursString = hours.toString();
	if (hoursString.length === 1) hoursString = "0" + hoursString;
	let minutesString = minutes.toString();
	if (minutesString.length === 1) minutesString = "0" + minutesString;

	// Update the digits
	digits.value = [
		hoursString[0],
		hoursString[1],
		minutesString[0],
		minutesString[1],
	];
}

function updateScale() {
	if (!container.value) return;
	fontSize.value = `${container.value.clientHeight * 0.9}px`;
	lineHeight.value = `${container.value.clientHeight}px`;
}

watchEffect(updateScale);
window.addEventListener("resize", updateScale);

onMounted(() => {
	updateClock();
	emitter.on(MINUTE_EVENT, updateClock);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.am-pm-container {
	height: 1ch;
}

.am-pm {
	font-size: 0.3ch;
	line-height: 1ch;
}
</style>

<template>
	<div
		class="flex flex-row items-center justify-center font-bold text-white"
		:style="{ fontSize, lineHeight }"
		ref="container"
	>
		<Digit :value="digits[0]" />
		<Digit :value="digits[1]" />
		<span>:</span>
		<Digit :value="digits[2]" />
		<Digit :value="digits[3]" />
		<Transition name="fade" mode="out-in">
			<div :key="amPm" class="am-pm-container flex flex-col justify-end">
				<span class="am-pm">{{ amPm }}</span>
			</div>
		</Transition>
	</div>
</template>
