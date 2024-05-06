import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/routes'
import ElementPlus from 'element-plus' // 引入element组件库
import 'element-plus/dist/index.css' // 引入element组件样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'//引入element图标库
import './style/index.scss' // 引入全局样式

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
};
app.use(ElementPlus);
app.use(router);
app.mount('#app');
