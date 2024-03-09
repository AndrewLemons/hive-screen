<script setup lang="ts">
import { defineProps } from "vue";

const { value } = defineProps({
	value: {
		type: String,
		required: true,
	},
});
</script>

<style scoped>
.digit-flip-enter-active,
.digit-flip-leave-active {
	transition:
		transform 0.25s,
		opacity 0.25s;
}

.digit-flip-enter-from {
	transform: translateY(-50%);
	opacity: 0;
}

.digit-flip-leave-to {
	transform: translateY(50%);
	opacity: 0;
}

.digit-flip-enter-to,
.digit-flip-leave-from {
	transform: translateY(0);
	opacity: 1;
}

.digit {
	display: block;
	width: 1ch;
	text-align: center;
}
</style>

<template>
	<Transition name="digit-flip" mode="out-in">
		<span :key="value" class="digit">{{ value }}</span>
	</Transition>
</template>
