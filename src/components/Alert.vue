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

	if (hours === 17 && minutes >= 45) {
		// Closing soon
		showClosingAlert.value = true;
		closingTime.value = `${60 - minutes} min${minutes > 1 ? "s" : ""}`;
		// Reset other alerts
		showAfterHoursAlert.value = false;
		showOpeningAlert.value = false;
	} else if (hours >= 18 || hours < 9) {
		// After hours
		showAfterHoursAlert.value = true;
		// Reset other alerts
		showClosingAlert.value = false;
		showOpeningAlert.value = false;
	} else if (hours === 9) {
		// Opening soon
		showOpeningAlert.value = true;
		openingTime.value = `${60 - minutes} min${minutes > 1 ? "s" : ""}`;
		// Reset other alerts
		showClosingAlert.value = false;
		showAfterHoursAlert.value = false;
	} else {
		// Nothing
		showClosingAlert.value = false;
		showAfterHoursAlert.value = false;
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

<template>
	<div
		class="row-span-2 flex flex-row items-center justify-center gap-4"
		ref="container"
	>
		<span v-if="showClosingAlert" class="rounded-lg p-8 text-red-500 font-bold">
			Closing in {{ closingTime }}
		</span>
		<span
			v-if="showAfterHoursAlert"
			class="rounded-lg p-8 text-purple-500 font-bold"
		>
			After Hours
		</span>
		<span
			v-if="showOpeningAlert"
			class="rounded-lg p-8 text-green-500 font-bold"
		>
			Opening in {{ openingTime }}
		</span>
	</div>
</template>
