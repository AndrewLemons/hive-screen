<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { emitter, MINUTE_EVENT } from "../ts/events";
import { useScaleStore, useOpeningsStore } from "../store";

const scaleStore = useScaleStore();
const openingsStore = useOpeningsStore();

const showClosingAlert = ref(false);
const closingTime = ref("");

const showOpeningAlert = ref(false);
const openingTime = ref("");

const showAfterHoursAlert = ref(false);
const showClosedAlert = ref(false);

function update() {
	let isOpen = openingsStore.isOpen;
	let isOpenToday = openingsStore.isOpenToday;
	let isOpeningSoon = openingsStore.isOpeningSoon;
	let isClosingSoon = openingsStore.isClosingSoon;
	let openingInDuration = openingsStore.openingInDuration;
	let closingInDuration = openingsStore.closingInDuration;

	// Closing alert
	if (isOpen && isClosingSoon) {
		showClosingAlert.value = true;
		closingTime.value = `${60 - closingInDuration} min${closingInDuration > 1 ? "s" : ""}`;
	} else {
		showClosingAlert.value = false;
	}

	// Opening alert
	if (!isOpen && isOpeningSoon) {
		showOpeningAlert.value = true;
		openingTime.value = `${60 - openingInDuration} min${openingInDuration > 1 ? "s" : ""}`;
	} else {
		showOpeningAlert.value = false;
	}

	// After hours alert
	if (!isOpen && !isOpeningSoon && !isClosingSoon && isOpenToday) {
		showAfterHoursAlert.value = true;
	} else {
		showAfterHoursAlert.value = false;
	}

	// Closed alert
	if (!isOpenToday) {
		showClosedAlert.value = true;
	} else {
		showClosedAlert.value = false;
	}
}

const fontSize = computed(() => scaleStore.scale * 0.08);
const lineHeight = computed(() => scaleStore.scale * 0.08);

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
		:style="`font-size: ${fontSize}px; line-height: ${lineHeight}px`"
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
			<span
				v-if="showClosedAlert"
				class="rounded-lg p-8 font-bold text-red-500"
			>
				Closed
			</span>
		</TransitionGroup>
	</div>
</template>
