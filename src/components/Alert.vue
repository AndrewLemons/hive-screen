<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { emitter, MINUTE_EVENT } from "../ts/events";

const container = ref(null);

const showClosingAlert = ref(false);
const closingTime = ref("");

const showOpeningAlert = ref(false);
const openingTime = ref("");

const showAfterHoursAlert = ref(false);

function update() {
	let now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();
	let day = now.getDay();
	let isWeekend = day === 0 || day === 6;

	// Closing alert
	if (!isWeekend && hours === 17 && minutes >= 45) {
		showClosingAlert.value = true;
		closingTime.value = `${60 - minutes} min${minutes > 1 ? "s" : ""}`;
	} else {
		showClosingAlert.value = false;
	}

	// After hours alert
	if (isWeekend || hours >= 18 || hours < 9) {
		showAfterHoursAlert.value = true;
	} else {
		showAfterHoursAlert.value = false;
	}

	// Opening alert
	if (!isWeekend && hours === 9) {
		showOpeningAlert.value = true;
		openingTime.value = `${60 - minutes} min${minutes > 1 ? "s" : ""}`;
	} else {
		showOpeningAlert.value = false;
	}
}

function updateScale() {
	if (!container.value) return;
	let $element = container.value as HTMLElement;
	$element.style.fontSize = `${$element.clientHeight * 0.25}px`;
	$element.style.lineHeight = `${$element.clientHeight * 0.25}px`;
}

watchEffect(updateScale);
window.addEventListener("resize", updateScale);

onMounted(() => {
	update();
	emitter.on(MINUTE_EVENT, update);
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
</style>

<template>
	<div
		class="row-span-2 flex flex-row items-center justify-center gap-4"
		ref="container"
	>
		<TransitionGroup name="fade" tag="span">
			<span
				v-if="showClosingAlert"
				class="rounded-lg p-8 font-bold text-red-500"
			>
				Closing in {{ closingTime }}
			</span>
			<span
				v-if="showAfterHoursAlert"
				class="rounded-lg p-8 font-bold text-purple-500"
			>
				After Hours
			</span>
			<span
				v-if="showOpeningAlert"
				class="rounded-lg p-8 font-bold text-green-500"
			>
				Opening in {{ openingTime }}
			</span>
		</TransitionGroup>
	</div>
</template>
