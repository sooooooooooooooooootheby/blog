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
					path: ":id",
					props: true,
					components: {
						default: () => import("@/components/articleView/content.vue"),
					},
				},
			],
		},
		{
			path: "/friend",
			component: () => import("@/views/friendView.vue"),
		},
		{
			name: "404",
			path: "/404",
			component: () => import("@/views/notFound.vue"),
		},
		{
            path: "/:catchAll(.*)",
            redirect: "/404",
        },
	],
});

export default router;
