import './bootstrap';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './components/App.vue';
import router from './router';

import { faUserSecret, faFolderPlus, faEye, faTrash, faSave, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

createApp(App).use(router).use(createPinia()).mount('#app');
library.add(faUserSecret, faFolderPlus, faEye, faTrash, faSave, faSignOutAlt)
