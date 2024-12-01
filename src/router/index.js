import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import DestinationDetail from '../components/DestinationDetail.vue';

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/destinationDetail/:id',
        name: 'DestinationDetail',
        component: DestinationDetail,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
