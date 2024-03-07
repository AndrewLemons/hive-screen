<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { emitter, MINUTE_EVENT } from "../ts/events";

const container = ref(null);
const showClosingAlert = ref(false);
const closingTime = ref("");

function update() {
	let now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();

	if (hours === 17 && minutes >= 45) {
		showClosingAlert.value = true;
		closingTime.value = `${60 - minutes} min`;
	}
}

function updateScale() {
	if (!container.value) return;
	let $element = container.value as HTMLElement;
	$element.style.fontSize = `${$element.clientHeight * 0.25}px`;
	$element.style.lineHeight = `${$element.clientHeight * 0.25}px`;
}

watchEffect(updateScale);

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
			class="bg-red-800 rounded-lg p-8 text-red-200"
		>
			Closing in {{ closingTime }}
		</span>
	</div>
</template>
