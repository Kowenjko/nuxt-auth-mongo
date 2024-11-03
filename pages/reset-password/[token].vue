<script lang="ts" setup>
const formData = reactive({ password: '', confirmPassword: '' })

const { token } = useRoute().params

const authStore = useAuthStore()

const handleSubmit = async () => {
	if (formData.password !== formData.confirmPassword) {
		alert('Passwords do not match')
		return
	}

	try {
		await authStore.resetPassword({ token, password: formData.password })
		setTimeout(() => {
			navigateTo('/login')
		}, 2000)
	} catch (error) {
		console.error(error)
	}
}
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
				Reset Password
			</h2>
			<p v-if="authStore.error" class="text-red-500 text-sm mb-4">{{ authStore.error }}</p>
			<p v-if="authStore.message" class="text-green-500 text-sm mb-4">{{ authStore.message }}</p>

			<form @submit.prevent="handleSubmit">
				<Input type="password" placeholder="New Password" v-model="formData.password">
					<IconLock class="size-5 text-green-500" />
				</Input>
				<Input
					type="password"
					placeholder="Confirm New Password"
					v-model="formData.confirmPassword"
				>
					<IconLock class="size-5 text-green-500" />
				</Input>

				<Button>
					{{ authStore.isLoading ? 'Resetting...' : 'Set New Password' }}
				</Button>
			</form>
		</div>
	</div>
</template>
