<script setup lang="ts">
import { ref, computed } from "vue";
import { useScaleStore } from "../store";
import logo from "../assets/logo.svg";

const scaleStore = useScaleStore();

const size = computed(() => scaleStore.scale * 0.4);
</script>

<template>
	<div class="flex items-center justify-center">
		<img
			alt="The Hive Makerspace"
			:style="`width: ${size}px; height: ${size}px`"
			:src="logo"
		/>
	</div>
</template>
