export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore()

	// if (!authStore.isAuthenticated) return navigateTo('/login')
	// if (!authStore.user?.isVerified) return navigateTo('/verify-email')
})
