
const grard = {
    /* 管理员路由 */
    manage: () => {
        if (JSON.parse(sessionStorage.getItem('user') as string).role !== 0) {
            /* 不是管理员，直接跳转用户首页 */
            return '/show';
        }
    },
    /* 用户路由 */
    user: () => {
        if (JSON.parse(sessionStorage.getItem('user') as string).role !== 1) {
            /* 不是用户，直接跳转管理页面 */
            return '/man';
        }
    }
}

export default grard;