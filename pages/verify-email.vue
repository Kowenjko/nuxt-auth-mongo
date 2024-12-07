<script lang="ts" setup>
const code = ref(['', '', '', '', '', ''])

const inputRefs = useTemplateRef('input')

const authStore = useAuthStore()

const handleChange = (index: number) => {
	const newCode = [...code.value]

	// Handle pasted content

	const value = inputRefs.value?.[index].value

	console.log(value)

	if (!value) return

	if (value.length > 1) {
		const pastedCode = value.slice(0, 6).split('')

		for (let i = 0; i < 6; i++) {
			newCode[i] = pastedCode[i] || ''
		}
		code.value = newCode

		// Focus on the last non-empty input or the first empty one
		const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '')
		const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5

		inputRefs.value?.[focusIndex].focus()
		return
	}
	newCode[index] = value
	code.value = newCode
	// Move focus to the next input field if value is entered

	if (value && index < 5) inputRefs.value?.[index + 1].focus()
}

const handleKeyDown = (index: number, event: KeyboardEvent) => {
	console.log(code.value[index])
	if (event.key === 'Backspace' && !code.value[index] && index > 0) {
		inputRefs.value?.[index - 1].focus()
	}
}

const handleSubmit = async () => {
	const verificationCode = code.value.join('')

	try {
		const response = await authStore.verifyEmail({ code: verificationCode })
		if (response) navigateTo('/')
	} catch (error) {
		console.log(error)
	}
}
// Auto submit when all fields are filled

watch(code, async () => {
	if (code.value.every((digit) => digit !== '')) await handleSubmit()
})
</script>
<template>
	<Card title="Verify Your Email">
		<p class="text-center text-gray-300 mb-6">Enter the 6-digit code sent to your email address.</p>
		<form @submit.prevent="handleSubmit" class="space-y-6">
			<div class="flex justify-between">
				<input
					v-for="(digit, index) in code"
					:key="index"
					ref="input"
					type="text"
					maxLength="6"
					:value="digit"
					@input="handleChange(index)"
					@keydown="handleKeyDown(index, $event)"
					class="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
				/>
			</div>
			<p v-if="authStore.error" class="text-red-500 font-semibold mt-2">{{ authStore.error }}</p>

			<Button :disabled="authStore.isLoading || code.some((digit) => !digit)">
				{{ authStore.isLoading ? 'Verifying...' : 'Verify Email' }}
			</Button>
		</form>
	</Card>
</template>
