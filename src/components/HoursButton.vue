<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useOpeningsStore, useMotionStore, Days } from "../store";

const motionStore = useMotionStore();
const openingsStore = useOpeningsStore();
const showHoursEditor = ref(false);

function toggleEditHours() {
	showHoursEditor.value = !showHoursEditor.value;
}

function save() {
	showHoursEditor.value = false;
	openingsStore.save();
}
</script>

<template>
	<button
		v-if="motionStore.isActive"
		class="rounded-md bg-gray-800 p-2 text-white"
		@click="toggleEditHours"
	>
		Edit Hours
	</button>

	<div
		v-if="showHoursEditor"
		class="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50"
	>
		<div class="flex-col gap-2 rounded-md bg-gray-800 p-4 text-white">
			<table>
				<tbody>
					<tr
						v-for="day in [
							'SUNDAY',
							'MONDAY',
							'TUESDAY',
							'WEDNESDAY',
							'THURSDAY',
							'FRIDAY',
							'SATURDAY',
						]"
						:key="day"
					>
						<td class="p-1">{{ day }}</td>
						<td class="p-1">
							<input
								class="w-full rounded-sm bg-gray-600"
								type="checkbox"
								v-model="openingsStore[day].isOpen"
							/>
						</td>
						<td class="p-1">
							<input
								class="w-full max-w-14 rounded-sm bg-gray-600"
								type="text"
								v-model="openingsStore[day].open"
							/>
						</td>
						<td class="p-1">
							<input
								class="w-full max-w-14 rounded-sm bg-gray-600"
								type="v"
								v-model="openingsStore[day].close"
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="flex flex-row gap-2">
				<button class="rounded-md bg-gray-700 p-2 text-white" @click="save">
					Save
				</button>
			</div>
		</div>
	</div>
</template>
