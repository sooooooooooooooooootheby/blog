<template>
	<div class="friend">
		<span class="title">Friend</span>
		<span class="subTitle">These are my friends</span>
		<ul>
			<li v-for="(item, index) in friendData" :key="index">
				<div class="background">
					<img :src="item.avatar_url" alt="background" />
				</div>
				<div class="avatar">
					<img :src="item.avatar_url" alt="head" />
				</div>
				<div class="text">
					<span class="name">{{ item.name }}</span>
					<span class="username">@{{ item.login }}</span>
					<!-- <span class="bio">{{ item.bio }}</span> -->
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
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			friendList: ["sooooooooooooooooootheby", "lassksy", "himicoswilson"],
			friendData: [],
		};
	},
	methods: {
		async getFriendInfo() {
			const promises = this.friendList.map(async (user) => {
				try {
					const res = await axios.get(`https://api.github.com/users/${user}`);
					this.friendData.push(res.data);
				} catch (error) {
					console.error(error);
				}
			});

			await Promise.all(promises);
			console.log(this.friendData);
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
