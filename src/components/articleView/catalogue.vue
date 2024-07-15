<template>
	<div class="catalogue">
		<div class="mainTitle">
			<span>Article</span>
		</div>
		<ul>
			<li v-for="item in catalogue" :key="item">
				<router-link :to="'/article/' + item.title">
					<span class="title">{{ item.title }}</span>
					<span class="time">{{ time(item.time) }}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import * as yaml from "js-yaml";
import { articleStore } from "@/store/article";

export default {
	data() {
		const article = articleStore();
		return {
			handleArticle: article,

			catalogue: [],
		};
	},
	methods: {
		// 加载文件列表
		async loadFileList() {
			try {
				await this.handleArticle.getFileList();
				this.catalogue = this.handleArticle.fileList;
			} catch (error) {
				console.error(error);
			}
		},
		// 提取文件的元数据
		extractFrontMatter(markdown) {
			const frontMatterRegex = /^---\r\n([\s\S]+?)\r\n---/;
			const match = markdown.match(frontMatterRegex);

			if (match) {
				const yamlContent = match[1];
				return yaml.load(yamlContent);
			}

			return null;
		},
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
	},
	created() {
		this.loadFileList();
	},
	watch: {
		"handleArticle.articleData"(newValue, oldValue) {
			this.catalogue.push(this.extractFrontMatter(newValue[0]));
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/components/articleView/catalogue.scss";
</style>
