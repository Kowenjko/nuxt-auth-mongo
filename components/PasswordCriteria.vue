<script lang="ts" setup>
const { password } = defineProps<{ password: string }>()

const criteria = [
	{ label: 'At least 6 characters', met: password.length >= 6 },
	{ label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
	{ label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
	{ label: 'Contains a number', met: /\d/.test(password) },
	{ label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) },
]
</script>

<template>
	<div class="mt-2 space-y-1">
		<div v-for="item in criteria" :key="item.label" class="flex items-center text-xs">
      <IconCheck v-if="item.met" class="size-4 text-green-500 mr-2"/>
      <IconX v-else class="size-4 text-green-500 mr-2"/>
      <span :class="[item.met ? "text-green-500" : "text-gray-400"]">{{ item.label }}</span>
    </div>
	</div>
</template>
