<template>
	<div class="friend">
		<span class="title">Friend</span>
		<span class="subTitle">These are my friends</span>

		<ul v-if="isFriendList">
			<li v-if="isFriend" class="loading">
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
			</li>
			<li v-for="(item, index) in friendData" :key="index" v-else>
				<div class="background">
					<img :src="item.avatar_url" alt="background" />
				</div>
				<div class="avatar">
					<img :src="item.avatar_url" alt="head" />
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
			</li>
		</ul>
		<div class="error" v-else>
			<p><span>(✘Д✘๑ )</span>Github查询失败,请刷新...</p>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			friendList: ["sooooooooooooooooootheby", "lassksy", "himicoswilson"],
			friendData: [],
			isFriendList: false,
			isFriend: true,
		};
	},
	methods: {
		showList() {
			this.isFriend = !this.isFriend;
		},
		showErrer() {
			this.isFriendList = !this.isFriendList;
		},
		async getFriendInfo() {
			const promises = this.friendList.map(async (user) => {
				try {
					const res = await axios.get(`https://api.github.com/users/${user}`);
					this.friendData.push(res.data);
					this.showList();
				} catch (error) {
					console.error(error);
					this.showErrer();
				}
			});

			await Promise.all(promises);
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
