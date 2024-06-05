import { createRouter, createWebHistory } from 'vue-router'
import grard from './grard'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('../views/Login/index.vue')
        },
        {
            name: 'forget',
            path: '/forget',
            component: () => import('../views/Forget/index.vue')
        },
        {
            name: 'show',
            path: '/show',
            component: () => import('../views/Show/index.vue'),
            redirect: '/show/home',
            meta: { requireAuth: true },
            children: [
                {
                    name: 'home',
                    path: 'home',
                    component: () => import('../views/Home/index.vue'),
                    beforeEnter: grard.user
                },

                {
                    name: 'search',
                    path: 'search',
                    component: () => import('../views/Search/index.vue'),
                    beforeEnter: grard.user
                },
                {
                    name: 'shopcar',
                    path: 'shopcar',
                    component: () => import('../views/ShopCar/index.vue'),
                    beforeEnter: grard.user
                },
                {
                    name: 'my',
                    path: 'my',
                    component: () => import('../views/My/index.vue')
                }
            ]
        },
        {
            name: 'man',
            path: '/man',
            component: () => import('../views/Show/index.vue'),
            redirect: '/man/manage',
            meta: { requireAuth: true },
            children: [
                {
                    name: 'manage',
                    path: 'manage',
                    component: () => import('../views/Manage/index.vue'),
                    beforeEnter: grard.manage
                }
            ]
        }

    ]
})