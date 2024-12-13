import './assets/main.css';
import { createPinia } from 'pinia';
import resetStore from '@/stores/resetStore';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Kakao SDK 로드 함수
const loadKakaoSDK = async () => {
    if (!window.Kakao) {
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        document.head.appendChild(script);

        await new Promise((resolve) => {
            script.onload = resolve; // 스크립트가 로드되면 resolve
        });
    }

    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
        window.Kakao.init('5ad0a926f5cb13abd7519e8852f49b6c'); // 여기에 실제 Kakao JavaScript Key를 넣으세요
        console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
};

// Kakao SDK 로드 및 초기화
loadKakaoSDK().catch((err) => {
    console.error('Kakao SDK loading error:', err);
});

const pinia = createPinia();
pinia.use(resetStore);

const app = createApp(App);

app.use(pinia);

app.config.globalProperties.$axios = axios;
// app.config.globalProperties.$router = router; // 필요시 사용

app.use(router);
app.mount('#app');