<script lang="ts" setup>
const { isShowFooter = false } = defineProps<{ title: string; isShowFooter?: boolean }>()
</script>

<template>
	<div
		v-motion
		:initial="{ opacity: 0, y: 20 }"
		:enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
		class="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
	>
		<div class="p-8">
			<h2
				class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text"
			>
				{{ title }}
			</h2>
			<slot />
		</div>
		<div class="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center" v-if="isShowFooter">
			<slot name="footer" />
		</div>
	</div>
</template>
