// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: ['@nuxt/fonts', '@pinia/nuxt', '@vueuse/nuxt', 'nuxt-typed-router'],
	fonts: {
		families: [{ name: 'Inter', provider: 'google' }],
	},
	pinia: {
		storesDirs: ['./stores/**'],
	},
	runtimeConfig: {
		mongodbUri: process.env.NUXT_MONGO_URI,
	},
})
