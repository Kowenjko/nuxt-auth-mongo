<script lang="ts" setup>
const formData = reactive({ password: '', confirmPassword: '' })

const { token } = useRoute().params

const authStore = useAuthStore()
const { $toast } = useNuxtApp()

const handleSubmit = async () => {
	if (formData.password !== formData.confirmPassword) {
		alert('Passwords do not match')
		return
	}

	try {
		await authStore.resetPassword({ token, password: formData.password })
		$toast.success('Password reset successfully, redirecting to login page...')
		setTimeout(() => {
			navigateTo('/login')
		}, 2000)
	} catch (error) {
		console.error(error)
		$toast.error('Error resetting password')
	}
}
</script>

<template>
	<Card title="Reset Password">
		<p v-if="authStore.error" class="text-red-500 text-sm mb-4">{{ authStore.error }}</p>
		<p v-if="authStore.message" class="text-green-500 text-sm mb-4">{{ authStore.message }}</p>

		<form @submit.prevent="handleSubmit">
			<Input type="password" placeholder="New Password" v-model="formData.password">
				<IconLock class="size-5 text-green-500" />
			</Input>
			<Input type="password" placeholder="Confirm New Password" v-model="formData.confirmPassword">
				<IconLock class="size-5 text-green-500" />
			</Input>

			<Button>
				{{ authStore.isLoading ? 'Resetting...' : 'Set New Password' }}
			</Button>
		</form>
	</Card>
</template>
