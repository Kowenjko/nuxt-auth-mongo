<script lang="ts" setup>
const props = defineProps<{
	color: string
	size: string
	top: string
	left: string
	delay: number
}>()
</script>

<template>
	<div
		v-motion
		:class="`absolute rounded-full ${color} ${size} opacity-20 blur-xl`"
		:style="{ top, left }"
		aria-hidden="true"
		:initial="{
			x: 0,
			y: 0,
			rotate: 0,
		}"
		:enter="{
			x: 100,
			y: 100,
			rotate: 360,
			transition: {
				duration: delay * 100,
				repeat: Infinity,
				repeatType: 'mirror',
				delay: delay * 20,
			},
		}"
	></div>
</template>
