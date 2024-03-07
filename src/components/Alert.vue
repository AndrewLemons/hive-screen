<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { emitter, MINUTE_EVENT } from "../ts/events";

const container = ref(null);

const showClosingAlert = ref(false);
const closingTime = ref("");

const showAfterHoursAlert = ref(false);

function update() {
	let now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();

	if (hours === 17 && minutes >= 45) {
		showClosingAlert.value = true;
		closingTime.value = `${60 - minutes} min`;
		showAfterHoursAlert.value = false;
	} else if (hours >= 18 || hours < 10) {
		showClosingAlert.value = false;
		showAfterHoursAlert.value = true;
	} else {
		showClosingAlert.value = false;
		showAfterHoursAlert.value = false;
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
		<span
			v-if="showClosingAlert"
			class="bg-red-800 rounded-lg p-8 text-red-200 font-bold"
		>
			Closing in {{ closingTime }}
		</span>
		<span
			v-if="showAfterHoursAlert"
			class="rounded-lg p-8 text-purple-500 font-bold"
		>
			After Hours
		</span>
	</div>
</template>
