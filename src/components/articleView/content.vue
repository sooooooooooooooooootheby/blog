<template>
	<div class="content">
		<span class="title">{{ articleData.title }}</span>
		<span class="subTitle">By Sooooooooooooooooootheby</span>
		<span class="time">{{ articleData.time }}</span>
		<div class="tagBar">
			<span v-for="(item, index) in articleData.tag" :key="index">
				{{ item }}
			</span>
		</div>
		<!-- <div v-html="compiledMarkdown"></div> -->
	</div>
</template>

<script>
import { articleStore } from "@/store/article";
import markdownIt from "markdown-it";
import markdownItHighlightjs from "markdown-it-highlightjs";
import axios from "axios";

export default {
	props: ["id"],
	data() {
		const article = articleStore();
		return {
			handleArticle: article,

			articleData: {},
			compiledMarkdown: "",
		};
	},
	methods: {
		// 处理时间
		time(time) {
			// 使用Date对象解析ISO 8601格式的时间字符串
			var date = new Date(time);

			// 定义一个函数来格式化日期和时间
			function formatDate(date) {
				var monthNames = [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				];

				var day = date.getDate();
				var monthIndex = date.getMonth();
				var year = date.getFullYear();
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();

				// 将小时数转换为12小时制
				var isPM = hours >= 12;
				hours = hours % 12;
				hours = hours ? hours : 12; // 12小时制的午夜和正午

				// 格式化分钟数和秒数，如果小于10则前面补0
				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;

				// 构建格式化的日期和时间字符串
				var formattedDate = monthNames[monthIndex] + " " + day + ", " + year;
				var formattedTime = hours + ":" + minutes + ":" + seconds + " " + (isPM ? "PM" : "AM");

				return formattedDate;
			}

			// 使用该函数格式化日期
			var formattedDate = formatDate(date);

			return formattedDate;
		},
		// 处理文章数据
		handleArticleData() {
			this.articleData = this.handleArticle.articleData.article;
			this.articleData.fileUrl = this.handleArticle.articleData.articleUrl;

			// 时间处理
			this.articleData.time = this.time(this.articleData.time);

			// 标签处理
			const tags = this.articleData.tag.split(",");
			this.articleData.tag = tags;

			// 正文处理
			this.showMarkdown(this.articleData.fileUrl);
		},
		// 请求文章数据
		async getActive() {
			try {
				await this.handleArticle.getArticle({ id: this.id });
				this.handleArticleData();
			} catch (error) {
				console.error(error);
			}
		},
		// 将md渲染为html
		async showMarkdown(fileUrl) {
			const md = markdownIt();
			md.use(markdownItHighlightjs);

			try {
				const res = await axios.get(fileUrl);
				const markdownContent = res.data;
				this.compiledMarkdown = md.render(markdownContent);
			} catch (error) {
				console.error(error);
			}
		},
	},
	created() {
		this.getActive();
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/components/articleView/content.scss";
</style>
