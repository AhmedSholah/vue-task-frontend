import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { queryClient } from "./lib/queryClient";

const app = createApp(App);

app.use(VueQueryPlugin, { queryClient });

app.use(Antd);

app.mount("#app");
