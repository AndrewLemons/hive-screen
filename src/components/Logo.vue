<script setup lang="ts">
import { ref, watchEffect } from "vue";
import logo from "../assets/logo.svg";

const container = ref(null);
const img = ref(null);

function updateScale() {
	if (!container.value) return;
	if (!img.value) return;

	let $container = container.value as HTMLElement;
	let $img = img.value as HTMLImageElement;

	$img.style.width = `${$container.clientWidth * 0.5}px`;
	$img.style.height = `${$container.clientHeight * 0.5}px`;
}

watchEffect(updateScale);
</script>

<template>
	<div class="flex items-center justify-center" ref="container">
		<img alt="Vue logo" ref="img" :src="logo" />
	</div>
</template>
