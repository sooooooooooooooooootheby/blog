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
		async getArticleList() {
			try {
				const res = await axios.get(`/article/getArticleList`);
				this.fileList = res.data;
			} catch (error) {
				console.error(error);
			}
		},
		// 获取文章
		async getArticle({ id }) {
			try {
				const res = await axios.get(`/article/getArticle`, {
					params: {
						id,
					},
				});
				this.articleData = res.data;
			} catch (error) {
				console.error(error);
			}
		},
	},
});
