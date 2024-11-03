<script lang="ts" setup>
const formData = reactive({ email: '' })
const isSubmitted = ref(false)

const authStore = useAuthStore()

const handleSubmit = async () => {
	await authStore.forgotPassword(formData)
	isSubmitted.value = true
}
</script>
<template>
	<Card title="Forgot Password" is-show-footer>
		<form @submit.prevent="handleSubmit" v-if="isSubmitted">
			<p class="text-gray-300 mb-6 text-center">
				Enter your email address and we'll send you a link to reset your password.
			</p>
			<Input type="email" placeholder="Email Address" required v-model="formData.email">
				<IconMail class="size-5 text-green-500" />
			</Input>

			<Button>
				<IconLoader class="animate-spin mx-auto" :size="24" v-if="authStore.isLoading" />
				<span v-else>Send Reset Link</span>
			</Button>
		</form>
		<div v-else class="text-center">
			<div
				class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
				v-motion
				:initial="{ scale: 0 }"
				:enter="{
					scale: 1,
					transition: { type: 'spring', stiffness: 500, damping: 30, mass: 0.5 },
				}"
			>
				<IconMail class="h-8 w-8 text-white" />
			</div>
			<p class="text-gray-300 mb-6">
				If an account exists for {{ formData.email }}, you will receive a password reset link
				shortly.
			</p>
		</div>
		<template #footer>
			<NuxtLink to="/login" class="text-sm text-green-400 hover:underline flex items-center">
				<IconArrowLeft class="h-4 w-4 mr-2" /> Back to Login
			</NuxtLink>
		</template>
	</Card>
</template>
