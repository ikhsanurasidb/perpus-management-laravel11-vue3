import "./bootstrap";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./components/App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

createApp(App)
    .use(router)
    .use(createPinia().use(piniaPluginPersistedstate))
    .mount("#app");
