import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("@/views/homeView.vue"),
		},
        {
			path: "/article",
			component: () => import("@/views/articleView.vue"),
			children: [
				{
					path: "",
					components: {
						default: () => import("@/components/articleView/catalogue.vue"),
					},
				},
				{
					path: ":name",
					props: true,
					components: {
						default: () => import("@/components/articleView/content.vue"),
					},
				},
			],
		},
		{
			path: "/friend",
			component: () => import("@/views/friend.vue")
		}
	],
});

export default router;
