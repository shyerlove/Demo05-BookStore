/* 全局路由守卫 */
import { useStore } from 'vuex';
import router from './routes.ts'
import { ElMessage } from 'element-plus'
router.beforeEach((to, from) => {
    const userStore = useStore();
    if (to.meta.requireAuth) {
        console.log('@@', userStore.state);

        /* 没有token，跳转到登录界面 */
        if (userStore.state.user == null) {
            /* 提示前往登录 */
            ElMessage({
                message: '请先登录',
                type: 'warning'
            });
            return '/login';
        }
    }
})