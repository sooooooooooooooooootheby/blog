<template>
	<div class="main">
        <router-view />
	</div>
</template>

<script>
import catalogue from "@/components/articleView/catalogue.vue";

export default {
	components: {
		catalogue,
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/views/articleView.scss";
</style>
