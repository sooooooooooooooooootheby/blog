import "@/assets/sass/main.scss"
import "highlightjs/styles/atom-one-dark.css";
import "//at.alicdn.com/t/c/font_4335391_xsykogdqm5q.js";

import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia());
app.use(router)

app.mount('#app')
