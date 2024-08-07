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
        updateUser(state, payload) {
            state.user = { ...state.user, ...payload };
            sessionStorage.setItem('user', JSON.stringify(state.user));
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
        async initMenus(context, payload) {
            const { data } = await myAxios({
                url: '/webapi/menus',
                method: 'get',
                params: { role: payload }
            })
            console.log(data);

            context.commit('initMenus', data.data);
        }
    }
});

