<template>
	<header>
		<div class="menu" ref="menu">
			<router-link to="/" >Home</router-link>
			<router-link to="/article" >Article</router-link>
			<router-link to="/friend">Friend</router-link>
		</div>
		<input id="burger-checkbox" type="checkbox" v-model="isMenu" @input="cutMenu" />
		<label class="burger" for="burger-checkbox">
			<span></span>
			<span></span>
			<span></span>
		</label>
	</header>
</template>

<script>
import { gsap } from "gsap";

export default {
	data() {
		return {
			isMenu: false,
		};
	},
	methods: {
		cutMenu() {
			if (this.isMenu) {
				gsap.to(this.$refs.menu, {
					y: 0,
					opacity: 0,
					ease: "back.out(1.7)",
				});
			} else {
				gsap.to(this.$refs.menu, {
					y: 190,
					opacity: 1,
					ease: "back.out(1.7)",
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/components/topNav.scss";
</style>
