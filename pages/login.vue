<script lang="ts" setup>
const formData = reactive({ email: '', password: '' })

const authStore = useAuthStore()

const handleLogin = async () => {
	await authStore.login(formData)
	navigateTo('/')
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
				Welcome Back
			</h2>
			<form @submit.prevent="handleLogin">
				<Input type="email" placeholder="Email Address" v-model="formData.email">
					<IconMail class="size-5 text-green-500" />
				</Input>
				<Input type="password" placeholder="Password" v-model="formData.password">
					<IconLock class="size-5 text-green-500" />
				</Input>

				<div class="flex items-center mb-6">
					<NuxtLink to="/forgot-password" class="text-sm text-green-400 hover:underline">
						Forgot password?
					</NuxtLink>
				</div>

				<p v-if="authStore.error" class="text-red-500 font-semibold mb-2">{{ authStore.error }}</p>

				<Button :disabled="authStore.isLoading">
					<IconLoader class="animate-spin mx-auto" :size="24" v-if="authStore.isLoading" />
					<span v-else>Login</span>
				</Button>
			</form>
		</div>
		<div class="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
			<p class="text-sm text-gray-400">
				Don't have an account?
				<NuxtLink to="/signup" class="text-green-400 hover:underline"> Sign up </NuxtLink>
			</p>
		</div>
	</div>
</template>
