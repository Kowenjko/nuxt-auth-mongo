<script lang="ts" setup>
useHead({
	titleTemplate: (titleChunk) => (titleChunk ? ` ${titleChunk} | Nuxt Auth` : 'Nuxt Auth'),
})
</script>
<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
