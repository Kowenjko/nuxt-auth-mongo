<script lang="ts" setup>
const formData = reactive({ email: '', password: '' })

const authStore = useAuthStore()

const handleLogin = async () => {
	await authStore.login(formData)
	navigateTo('/')
}
</script>
<template>
	<Card title="Welcome Back" is-show-footer>
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
		<template #footer>
			<p class="text-sm text-gray-400">
				Don't have an account?
				<NuxtLink to="/signup" class="text-green-400 hover:underline"> Sign up </NuxtLink>
			</p>
		</template>
	</Card>
</template>
