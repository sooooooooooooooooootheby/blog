<template>
	<div class="friend">
		<span class="title">Friend</span>
		<span class="subTitle">These are my friends</span>

		<div v-if="isFriendList" class="loading">
			<div class="loader">
				<div class="bar1"></div>
				<div class="bar2"></div>
				<div class="bar3"></div>
				<div class="bar4"></div>
				<div class="bar5"></div>
				<div class="bar6"></div>
				<div class="bar7"></div>
				<div class="bar8"></div>
				<div class="bar9"></div>
				<div class="bar10"></div>
				<div class="bar11"></div>
				<div class="bar12"></div>
			</div>
			<p>查询中...</p>
			<p>由于是Github的API,查询会比较慢。</p>
			<p>如果查询失败请魔法上网/刷新页面。</p>
		</div>

		<div class="container" ref="container">
			<div class="slot" v-for="(item, index) in friendData" :key="index" :data-swapy-slot="item.name">
				<div class="item" :data-swapy-item="index">
					<div class="background">
						<img :src="item.avatar_url" alt="background" draggable="false" />
					</div>
					<div class="avatar">
						<img :src="item.avatar_url" alt="head" draggable="false" />
					</div>
					<div class="text">
						<span class="name">{{ item.name }}</span>
						<span class="username">@{{ item.login }}</span>
					</div>
					<div class="a">
						<a class="github" :href="item.html_url">
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-github2"></use>
							</svg>
							<span>Github</span>
						</a>
						<div class="division" v-show="item.blog"></div>
						<a class="website" :href="item.blog" v-show="item.blog">
							<svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-about"></use>
							</svg>
							<span>Blog</span>
						</a>
					</div>
				</div>
			</div>
		</div>

		<div class="error" v-if="isError">
			<p><span>(✘Д✘๑ )</span>Github查询失败,请刷新...</p>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { createSwapy } from "swapy";

export default {
	data() {
		return {
			friendList: ["sooooooooooooooooootheby", "lassksy", "himicoswilson"],
			friendData: [],
			isFriendList: true,
			isError: false,
		};
	},
	methods: {
		showList() {
			this.isFriendList = !this.isFriendList;
		},
		showErrer() {
			this.isError = !this.isError;
		},
		handleSwapy() {
			const container = this.$refs.container;
			if (container) {
				const swapy = createSwapy(container);

				swapy.onSwap(({ data }) => {
					localStorage.setItem("slotItem", JSON.stringify(data.object));
				});
			}
		},
		async getFriendInfo() {
			const promises = this.friendList.map(async (user) => {
				try {
					const res = await axios.get(`https://api.github.com/users/${user}`);
					this.friendData.push(res.data);
				} catch (error) {
					console.error(error);
					this.showErrer();
				}
			});

			await Promise.all(promises);
			this.$nextTick(() => {
				this.showList();
				this.handleSwapy();
			});
		},
	},
	mounted() {
		this.getFriendInfo();
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/views/friendView.scss";
</style>
