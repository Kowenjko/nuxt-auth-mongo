<script lang="ts" setup>
const formData = reactive({ name: '', email: '', password: '' })

const authStore = useAuthStore()

const handleSignUp = async () => {
	try {
		await authStore.signup(formData)
		navigateTo('/verify-email')
	} catch (error) {
		console.log(error)
	}
}
</script>
<template>
	<div
		v-motion
		:initial="{ opacity: 0, y: 20 }"
		:enter="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
		class="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
	>
		<div class="p-8">
			<h2
				class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text"
			>
				Create Account
			</h2>
			<form @submit.prevent="handleSignUp">
				<Input type="text" placeholder="Full Name" v-model="formData.name">
					<IconUser class="size-5 text-green-500" />
				</Input>
				<Input type="email" placeholder="Email Address" v-model="formData.email">
					<IconMail class="size-5 text-green-500" />
				</Input>
				<Input type="password" placeholder="Password" v-model="formData.password">
					<IconLock class="size-5 text-green-500" />
				</Input>
				<p v-if="authStore.error" class="text-red-500 font-semibold mt-2">{{ authStore.error }}</p>
				<PasswordStrengthMeter :password="formData.password" />
				<button
					class="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
					:disabled="authStore.isLoading"
					type="submit"
					v-motion
					:initial="{ scale: 1 }"
					:hovered="{ scale: 1.08 }"
					:tapped="{ scale: 0.98 }"
				>
					<IconLoader class="animate-spin mx-auto" :size="24" v-if="authStore.isLoading" />
					<span v-else>Sign Up</span>
				</button>
			</form>
		</div>
		<div class="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
			<p class="text-sm text-gray-400">
				Already have an account?
				<nuxt-link to="/login" class="text-green-400 hover:underline"> Login </nuxt-link>
			</p>
		</div>
	</div>
</template>
