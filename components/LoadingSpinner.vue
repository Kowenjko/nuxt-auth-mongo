<script lang="ts" setup></script>

<template>
	<div
		class="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center absolute overflow-hidden top-0 left-0 z-20 w-full"
	>
		<div
			class="w-16 h-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full"
			v-motion
			:initial="{
				rotate: 0,
			}"
			:enter="{
				rotate: 360,
				transition: {
					duration: 1000,
					repeat: Infinity,

					ease: 'linear',
				},
			}"
		/>
	</div>
</template>
