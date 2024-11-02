<script lang="ts" setup>
const { password } = defineProps<{ password: string }>()

const getStrength = (pass: string): number => {
	let strength = 0
	if (pass.length >= 6) strength++
	if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++
	if (pass.match(/\d/)) strength++
	if (pass.match(/[^a-zA-Z\d]/)) strength++
	return strength
}

const strength = computed(() => getStrength(password))

const getColor = computed(() => {
	if (strength.value === 0) return 'bg-red-500'
	if (strength.value === 1) return 'bg-red-400'
	if (strength.value === 2) return 'bg-yellow-500'
	if (strength.value === 3) return 'bg-yellow-400'
	return 'bg-green-500'
})

const getStrengthText = computed(() => {
	if (strength.value === 0) return 'Very Weak'
	if (strength.value === 1) return 'Weak'
	if (strength.value === 2) return 'Fair'
	if (strength.value === 3) return 'Good'
	return 'Strong'
})
</script>

<template>
	<div class="mt-2">
		<div class="flex justify-between items-center mb-1">
			<span class="text-xs text-gray-400">Password strength</span>
			<span class="text-xs text-gray-400">{{ getStrengthText }}</span>
			<div class="flex space-x-1">
				<div
					v-for="index in 4"
					:key="index"
					class="h-1 w-1/4 rounded-full transition-colors duration-300"
					:class="[index < strength ? getColor : 'bg-gray-600']"
				></div>
				<PasswordCriteria :password="password" />
			</div>
		</div>
	</div>
</template>
