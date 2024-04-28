import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/index.vue'
import Login from '../views/Login/index.vue'
import Search from '../views/Search/index.vue'
import Manage from '../views/Manage/index.vue'
import Shopcar from '../views/ShopCar/index.vue'
import My from '../views/My/index.vue'
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/home',
            component: Home
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'search',
            path: '/search',
            component: Search
        },
        {
            name: 'manage',
            path: '/manage',
            component: Manage
        },
        {
            name: 'shopcar',
            path: '/shopcar',
            component: Shopcar
        },
        {
            name: 'my',
            path: '/my',
            component: My
        }
    ]
})