import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import Login from '../components/Login/login.vue';
import Signup from "@/components/Signup/signup.vue";
const routes = [
    {
        path: '/',
        // redirect: '/home',
        redirect: '/login',
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/Login',
        name: 'login',
        component: Login,
    },
    {
        path: '/Signup',
        name: 'signup',
        component: Signup,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;