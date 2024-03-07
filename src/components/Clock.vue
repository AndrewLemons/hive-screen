<script setup>
import { ref, onMounted } from "vue";

const time = ref("");

// Update the time every minute, on the minute
function startClock() {
	const now = new Date();
	const seconds = now.getSeconds();
	const milliseconds = now.getMilliseconds();
	const delay = (60 - seconds) * 1000 - milliseconds;
	setTimeout(() => {
		updateClock();
		setInterval(updateClock, 60000);
	}, delay);
}

function updateClock() {
	let now = new Date();

	// Get the time
	let hours = now.getHours();
	let minutes = now.getMinutes();

	// Parse hours to AM or PM
	const amPm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;

	// Add leading zeros
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;

	time.value = `${hours}:${minutes} ${amPm}`;
}

onMounted(() => {
	updateClock();
	startClock();
});
</script>

<template>
	<div class="flex items-center justify-center">
		<p class="text-8xl font-bold text-white">{{ time }}</p>
	</div>
</template>
