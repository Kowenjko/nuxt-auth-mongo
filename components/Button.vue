<script lang="ts" setup>
const { disabled = false, type = 'submit' } = defineProps<{
	disabled?: boolean
	type?: 'submit' | 'button'
}>()
</script>

<template>
	<button
		class="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
		:disabled="disabled"
		:type="type"
		v-motion
		:initial="{ scale: 1 }"
		:hovered="{ scale: 1.08 }"
		:tapped="{ scale: 0.98 }"
	>
		<slot />
	</button>
</template>
