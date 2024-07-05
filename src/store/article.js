import { defineStore } from "pinia";
import axios from "axios";

export const articleStore = defineStore({
	id: "article",
	store: () => {
		return {
			// 文章列表
			fileList: [],
			// 文章数据
			articleData: "",
		};
	},
	actions: {
		// 获取文章列表
		async getFileList() {
			try {
				const res = await axios.get(`/articleList.json`);
				this.fileList = res.data;
			} catch (error) {
				console.error(error);
			}
		},
		// 获取文章
		async getArticle({ filename }) {
			try {
				const res = await axios.get(`/article/${filename}.md`);
				// 将文件的完整数据填充到articleData
				this.articleData = res.data;
			} catch (error) {
				console.error(error);
			}
		},
	},
});
