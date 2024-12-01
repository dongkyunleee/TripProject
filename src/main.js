import './assets/main.css'
import { createPinia } from 'pinia';
import resetStore from '@/stores/resetStore';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';


const pinia = createPinia();
pinia.use(resetStore);

const app = createApp(App);

app.use(pinia);

app.config.globalProperties.$axios = axios;
// app.config.globalProperties.$router = router;

app.use(router);
app.mount('#app');

