import Toast, { useToast, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Toast, {
		transition: 'Vue-Toastification__bounce',
		maxToasts: 20,
		newestOnTop: true,
		theme: 'dark',
		position: POSITION.TOP_RIGHT,
		timeout: 2000,
	})

	const toast = useToast()

	return { provide: { toast } }
})
