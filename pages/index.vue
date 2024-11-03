<script lang="ts" setup>
import { formatDate } from '@/helpers/date'

const authStore = useAuthStore()

if (!authStore.isAuthenticated) navigateTo('/login')
if (authStore.isAuthenticated && !authStore.user?.isVerified) navigateTo('/verify-email')

const getDate = computed(() =>
	// @ts-ignore
	new Date(authStore.user?.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
)

const handleLogout = async () => {
	await authStore.logout()
	navigateTo('/login')
}

useHead({ title: 'Dashboard' })
</script>

<template>
	<Card title="Dashboard">
		<div class="space-y-6">
			<div
				class="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
				v-motion
				:initial="{ opacity: 0, y: 20 }"
				:enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
			>
				<h3 class="text-xl font-semibold text-green-400 mb-3">Profile Information</h3>
				<p class="text-gray-300">Name: {{ authStore.user?.name }}</p>
				<p class="text-gray-300">Email: {{ authStore.user?.email }}</p>
			</div>

			<div
				class="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
				v-motion
				:initial="{ opacity: 0, y: 20 }"
				:enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
			>
				<h3 class="text-xl font-semibold text-green-400 mb-3">Account Activity</h3>
				<p class="text-gray-300">
					<span className="font-bold">Joined: </span>
					{{ getDate }}
				</p>
				<p class="text-gray-300">
					<span class="font-bold">Last Login: </span>

					{{ formatDate(authStore.user?.lastLogin) }}
				</p>
			</div>
		</div>
		<div
			class="mt-4"
			v-motion
			:initial="{ opacity: 0, y: 20 }"
			:enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
		>
			<Button type="button" @click="handleLogout"> Logout </Button>
		</div>
	</Card>
</template>
