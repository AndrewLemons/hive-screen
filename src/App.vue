<script setup>
import Logo from "./components/Logo.vue";
import Clock from "./components/Clock.vue";
import News from "./components/News.vue";
</script>

<template>
	<div
		class="absolute inset-0 p-8 gap-8 bg-gray-900 grid grid-cols-2 grid-rows-2"
	>
		<Logo />
		<News />
		<Clock />
	</div>
</template>
