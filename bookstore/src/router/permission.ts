/* 全局路由守卫 */
import router from './routes.ts'
import { ElMessage } from 'element-plus'
router.beforeEach((to, from) => {
    const user = JSON.parse(sessionStorage.getItem('user') as string);
    if (to.meta.requireAuth) {
        /* 没有token，跳转到登录界面 */
        if (user == null) {
            /* 提示前往登录 */
            ElMessage({
                message: '请先登录',
                type: 'warning'
            });
            return '/login';
        }
    }
})