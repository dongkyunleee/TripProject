import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/Home/HomePage.vue';
import Login from '../components/Login/login.vue';
import Signup from "@/components/Signup/signup.vue";
import Swiper from "@/components/Swiper.vue";
import mypage from "@/components/Mypage/mypage.vue";
const routes = [
    {
        path: '/',
         name: '/login',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login/login.vue'), // 동적 import
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/Signup',
        name: 'signup',
        component: Signup,
    },
    {
        path: '/Swiper',
        name: 'swiper',
        component: Swiper,
    },
    {
        path: '/Mypage',
        name: 'mypage',
        component: mypage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
