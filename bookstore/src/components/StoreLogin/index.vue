<template>
    <transition name="store-login">
        <div class="storeLogin">
            <input type="text" v-model="loginForm.store_name" placeholder="商家名">
            <input type="password" v-model="loginForm.store_password" @keyup.enter="login" placeholder="密码">
            <button @click="login">登录</button>
        </div>
    </transition>
</template>

<script setup lang="ts">
import myAxios from '@/use/myAxios';
import { ElMessage } from 'element-plus';
import { ref,reactive,onMounted,watch } from 'vue' ;
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const userStore = useStore()
const loginForm = reactive({
    store_name:'',
    store_password:''
})

const login = async () => {
    const { data } = await myAxios({
        method:'POST',
        url:'/webapi/storeLogin',
        params: loginForm
    })
    if(data.code === 200){
        // 获取token
        const store = data.data;
        // 存放在本地存储中
        sessionStorage.setItem("user", JSON.stringify(store));
        // 初始化store
        userStore.commit('initUser', store);
        // 提示登录成功
        ElMessage({
            message: data.msg,
            type: data.type,
        });

        router.push('/merchant');
    }
}
</script>

<style scoped lang="scss">
.storeLogin{
    position: absolute;
    width:40vw;
    height: 40vh;
    top:30vh;
    left:30vw;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    // animation: come 0.3s linear forwards;
    input,
    button{
        width:80%;
        height: 20%;
        background-color: transparent;
        border:1px solid #c8c9cc;
        border-radius: .3125rem;
        color:white;
        transition: all .3s;
    }
    input{
        text-indent: .625rem;
        &:hover{
            border-color:#e9e9eb;
        }
        &:focus{
            border-color:$blueplus;
        }
    }
    button{
        &:hover{
            cursor: pointer;
            background-color: $blueplus;
            border-color:$blueplus;
        }
        &:active{
            background-color: $blue;
        }
    }
}

.store-login-enter-active,
.store-login-leave-active {
    transition: all 0.3s linear;
}

.store-login-enter-from {
    transform: translateX(100px);
    opacity: 1;
}

.store-login-leave-from {
    transform: translateX(-100px);
    opacity: 0;
}

</style>