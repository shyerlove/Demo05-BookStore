
import { createStore } from 'vuex'


// 创建一个新的 store 实例
export default createStore({
    state() {
        return {
            user: JSON.parse(sessionStorage.getItem('user') as string)
        }
    },
    mutations: {
        initUser(state, payload) {
            state.user = payload;
        },
        clearUser(state) {
            state.user = null;
        }
    }
});

