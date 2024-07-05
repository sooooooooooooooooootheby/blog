<template>
	<div class="content">
		<span class="title">{{ name }}</span>
		<span class="subTitle">By Sooooooooooooooooootheby</span>
		<div v-html="compiledMarkdown"></div>
	</div>
</template>

<script>
import { articleStore } from "@/store/article";
import markdownIt from "markdown-it";
import markdownItHighlightjs from "markdown-it-highlightjs";

export default {
	props: ["name"],
	data() {
		const article = articleStore();
		return {
			handleArticle: article,

			compiledMarkdown: "",
		};
	},
	methods: {
		// 请求文章数据
		async getActive() {
			try {
				await this.handleArticle.getArticle({ filename: this.name });
				this.showMarkdown();
			} catch (error) {
				console.error(error);
			}
		},
		// 将md渲染为html
		showMarkdown() {
			const md = markdownIt();
			md.use(markdownItHighlightjs);
			this.compiledMarkdown = md.render(this.handleArticle.articleData);
			console.log(this.compiledMarkdown);
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
