import './bootstrap';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './components/App.vue';
import router from './router';

createApp(App).use(router).use(createPinia()).mount('#app');
