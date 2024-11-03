export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore()

	console.log(authStore.user)

	if (authStore.isAuthenticated && authStore.user?.isVerified) return navigateTo('/')
})
