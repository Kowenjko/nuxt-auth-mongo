import { defineStore } from 'pinia'
import type { UserDocument } from '~/types'

export const useAuthStore = defineStore('auth', () => {
	const user = ref<UserDocument | null>(null)
	const isAuthenticated = ref(false)
	const isLoading = ref(false)
	const isCheckingAuth = ref(true)
	const message = ref<string | null>(null)
	const error = ref<string | null>(null)

	const signup = async (body: { email: string; password: string; name: string }) => {
		isLoading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/auth/signup', { method: 'POST', body })

			if (response) {
				// @ts-ignore
				user.value = response.user
				isAuthenticated.value = true
			}
		} catch (err) {
			error.value = 'Error signing up'
		} finally {
			isLoading.value = false
		}
	}

	const login = async (body: { email: string; password: string }) => {
		isLoading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/auth/login', { method: 'POST', body })

			if (response) {
				// @ts-ignore
				user.value = response.user
				isAuthenticated.value = true
			}
		} catch (err) {
			error.value = 'Error logging in'
		} finally {
			isLoading.value = false
		}
	}

	const logout = async () => {
		isLoading.value = true
		error.value = null

		try {
			await $fetch('/api/auth/logout', { method: 'POST' })

			user.value = null
			isAuthenticated.value = false
		} catch (err) {
			error.value = 'Error logging out'
		} finally {
			isLoading.value = false
		}
	}

	const verifyEmail = async (body: { code: string }) => {
		isLoading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/auth/verify-email', { method: 'POST', body })

			if (response) {
				// @ts-ignore
				user.value = response.user
				isAuthenticated.value = true
			}
			return response
		} catch (err) {
			error.value = 'Error verifying email'
		} finally {
			isLoading.value = false
		}
	}

	const checkAuth = async () => {
		isCheckingAuth.value = true
		error.value = null

		try {
			const response = await $fetch('/api/auth/check-auth')

			if (response) {
				// @ts-ignore
				user.value = response.user
				isAuthenticated.value = true
				isCheckingAuth.value = false
			}
			return response
		} catch (err) {
			isAuthenticated.value = false
			isCheckingAuth.value = false
		}
	}

	const forgotPassword = async (body: { email: string }) => {
		isLoading.value = true
		error.value = null

		try {
			const response = await $fetch('/api/auth/forgot-password', { method: 'POST', body })

			if (response) {
				// @ts-ignore
				message.value = response.message
			}
		} catch (err) {
			error.value = 'Error sending reset password email'
		} finally {
			isLoading.value = false
		}
	}

	const resetPassword = async ({ token, body }: { token: string; body: { password: string } }) => {
		isLoading.value = true
		error.value = null

		try {
			const response = await $fetch(`/api/auth/reset-password/${token}`, { method: 'POST', body })

			if (response) {
				// @ts-ignore
				message.value = response.message
			}
		} catch (err) {
			error.value = 'Error resetting password'
		} finally {
			isLoading.value = false
		}
	}

	return {
		isLoading,
		error,
		message,
		isCheckingAuth,
		isAuthenticated,
		user,
		signup,
		login,
		logout,
		verifyEmail,
		checkAuth,
		forgotPassword,
		resetPassword,
	}
})
