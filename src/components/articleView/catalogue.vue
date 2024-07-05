<template>
	<div class="catalogue">
		<div class="image"></div>
		<ul>
			<li v-for="item in catalogue" :key="item">
				<router-link :to="'/article/' + item">{{ item }}</router-link>
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
