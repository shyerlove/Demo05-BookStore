import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/routes'
import '@/router/permission'
import ElementPlus from 'element-plus' // 引入element组件库
import 'element-plus/dist/index.css' // 引入element组件样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'//引入element图标库
import './style/index.scss' // 引入全局样式
import userStore from '@/store/userStore'

const app = createApp(App);

/* 将图标注册为全局组件 */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
};
/* 注册elementPlus */
app.use(ElementPlus);

/* 注册路由 */
app.use(router);

/* 注册vuex */
app.use(userStore);
/* 挂载app */
app.mount('#app');
