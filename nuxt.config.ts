// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: [
		'@nuxt/fonts',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'nuxt-typed-router',
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		'@vueuse/motion/nuxt',
	],
	fonts: {
		families: [{ name: 'Inter', provider: 'google' }],
	},
	pinia: {
		storesDirs: ['./stores/**'],
	},
	runtimeConfig: {
		mongodbUri: process.env.NUXT_MONGO_URI,
		jwtSecret: process.env.NUXT_JWT_SECRET,
		nodeEnv: process.env.NUXT_NODE_ENV,
		mailtrapToken: process.env.NUXT_MAILTRAP_TOKEN,
		mailtrapEndpoint: process.env.NUXT_MAILTRAP_ENDPOINT,
		resentApiKey: process.env.NUXT_RESEND_API_KEY,
		clientUrl: process.env.NUXT_CLIENT_URL,
	},
})
