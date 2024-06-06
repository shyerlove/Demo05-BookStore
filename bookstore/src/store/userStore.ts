import myAxios from '@/use/myAxios';
import { createStore } from 'vuex'


// 创建一个新的 store 实例
export default createStore({
    state() {
        return {
            menus: [],
            user: JSON.parse(sessionStorage.getItem('user') as string),
            order: []
        }
    },
    mutations: {
        initUser(state, payload) {
            state.user = payload;
        },
        clearUser(state) {
            state.user = null;
        },
        initOrder(state, payload) {
            state.order = payload;
        },
        initMenus(state, payload) {
            state.menus = payload;
        }
    },
    actions: {
        /* 加载订单数据 */
        async initOrder(context) {
            const { data } = await myAxios({
                url: '/webapi/orders',
                method: 'get',
                params: {
                    user_id: context.state.user.id
                }
            })
            context.commit('initOrder', data.data);
        },
        /* 加载菜单数据 */
        async initMenus(context) {
            const { data } = await myAxios({
                url: '/webapi/menus',
                method: 'get',
                params: { role: context.state.user.role }
            })
            context.commit('initMenus', data.data);
        }
    }
});

