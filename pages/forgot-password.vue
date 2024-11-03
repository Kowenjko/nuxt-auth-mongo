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
	<div
		class="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
		v-motion
		:initial="{ opacity: 0, y: 20 }"
		:enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
	>
		<div class="p-8">
			<h2
				class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text"
			>
				Forgot Password
			</h2>

			<form @submit.prevent="handleSubmit" v-if="isSubmitted">
				<p class="text-gray-300 mb-6 text-center">
					Enter your email address and we'll send you a link to reset your password.
				</p>
				<Input type="email" placeholder="Email Address" required v-model="formData.email">
					<IconMail class="size-5 text-green-500" />
				</Input>
				<button
					type="submit"
					v-motion
					:initial="{ scale: 1 }"
					:hovered="{ scale: 1.02 }"
					:tapped="{ scale: 0.98 }"
					class="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
				>
					<IconLoader class="animate-spin mx-auto" :size="24" v-if="authStore.isLoading" />
					<span v-else>Send Reset Link</span>
				</button>
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
		</div>
		<div class="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
			<NuxtLink to="/login" class="text-sm text-green-400 hover:underline flex items-center">
				<IconArrowLeft class="h-4 w-4 mr-2" /> Back to Login
			</NuxtLink>
		</div>
	</div>
</template>
