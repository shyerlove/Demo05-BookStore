import myAxios from '@/use/myAxios';
import { createStore } from 'vuex'


// 创建一个新的 store 实例
export default createStore({
    state() {
        return {
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
        }
    },
    actions: {
        async initOrder(context) {
            const { data } = await myAxios({
                url: '/webapi/orders',
                method: 'get',
                params: {
                    user_id: context.state.user.id
                }
            })
            context.commit('initOrder', data.data);
        }
    }
});

