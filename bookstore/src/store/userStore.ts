
import { createStore } from 'vuex'


// 创建一个新的 store 实例
export default createStore({
    state() {
        return {
            user: null
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

