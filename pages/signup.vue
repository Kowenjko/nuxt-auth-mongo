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
	<Card title="Create Account" is-show-footer>
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

			<Button :disabled="authStore.isLoading">
				<IconLoader class="animate-spin mx-auto" :size="24" v-if="authStore.isLoading" />
				<span v-else>Sign Up</span>
			</Button>
		</form>
		<template #footer>
			<p class="text-sm text-gray-400">
				Already have an account?
				<nuxt-link to="/login" class="text-green-400 hover:underline"> Login </nuxt-link>
			</p>
		</template>
	</Card>
</template>
