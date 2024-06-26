<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { emitter, MINUTE_EVENT } from "../ts/events";
import { useScaleStore } from "../store";
import Digit from "./Digit.vue";

const scaleStore = useScaleStore();
const digits = ref(["0", "0", "0", "0"]);
const amPm = ref("AM");

function updateClock() {
	let now = new Date();

	// Get the time
	let hours = now.getHours();
	let minutes = now.getMinutes();

	// Convert to 12-hour time (noon is 12 PM, midnight is 12 AM)
	if (hours === 0) {
		hours = 12;
		amPm.value = "AM";
	} else if (hours === 12) {
		amPm.value = "PM";
	} else if (hours > 12) {
		hours -= 12;
		amPm.value = "PM";
	} else {
		amPm.value = "AM";
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

const fontSize = computed(() => scaleStore.scale * 0.3);
const lineHeight = computed(() => scaleStore.scale * 0.3);

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
		:style="`font-size: ${fontSize}px; line-height: ${lineHeight}px`"
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
