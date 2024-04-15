import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import { motionPlugin } from "./ts/motion";
import "./ts/updater";
import "./style.css";

const pinia = createPinia();

createApp(App).use(pinia).use(motionPlugin).mount("#app");
