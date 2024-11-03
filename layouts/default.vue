<script lang="ts" setup>
const authStore = useAuthStore()

onMounted(async () => {
	await authStore.checkAuth()
	if (authStore.isAuthenticated && authStore.user?.isVerified) navigateTo('/')
	// if (!authStore.isAuthenticated) navigateTo('/login')
	// if (!authStore.user?.isVerified) navigateTo('/verify-email')
})
</script>
<template>
	<LoadingSpinner v-if="authStore.isCheckingAuth" />
	{{ !authStore.user?.isVerified }}
	<div
		class="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
	>
		<FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" :delay="40" />
		<FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" :delay="50" />
		<FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" :delay="30" />

		<slot />
	</div>
</template>
