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
                },
                {
                    name: 'aorder',
                    path: 'order',
                    component: () => import('../views/Aorder/index.vue'),
                    beforeEnter: grard.manage
                },
                {
                    name: 'manuser',
                    path: 'manuser',
                    component: () => import('../views/Manuser/index.vue'),
                    beforeEnter: grard.manage
                }
            ]
        },
        {
            name: 'merchant',
            path: '/merchant',
            component: () => import('../views/Show/index.vue'),
            redirect: '/merchant/inventory',
            meta: { requireAuth: true },
            children: [
                {
                    name: 'inventory',
                    path: 'inventory',
                    component: () => import('../views/Inventory/index.vue'),
                    beforeEnter: grard.merchant
                },
                {
                    name: 'order',
                    path: 'order',
                    component: () => import('../views/Order/index.vue'),
                    beforeEnter: grard.merchant
                },
                {
                    name: 'stock',
                    path: 'stock',
                    component: () => import('../views/Stock/index.vue'),
                    beforeEnter: grard.merchant
                },
                {
                    name: 'deal',
                    path: 'deal',
                    component: () => import('../views/Deal/index.vue'),
                    beforeEnter: grard.merchant
                },
            ]
        },
        {
            name: 'notfound',
            path: '/notfound',
            component: () => import('../views/404/index.vue')
        }

    ]
})