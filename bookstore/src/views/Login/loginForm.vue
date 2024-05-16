<template>
    <div class="loginForm">
       <div class="form" v-if="isLogin">
            <input type="text" placeholder="请输入用户名" v-model="loginForm.username"/>
            <input type="password" placeholder="请输入密码" v-model="loginForm.password"/>
            <button @click="login">登录</button>
            <a @click="isLogin=!isLogin">没有账号？点击注册</a>
       </div>
       <div class="form" v-if="!isLogin">
            <input type="text" placeholder="请输入用户名" v-model="SignForm.username"/>
            <input type="password" placeholder="请输入密码" v-model="SignForm.password"/>
            <input type="password" placeholder="请确认密码" />
            <button @click="sign">注册</button>
            <a @click="isLogin=!isLogin">已有账号？点击登录</a>
       </div>
    </div>
</template>

<script setup name="loginForm">

import { ElMessage } from 'element-plus';
import { ref,reactive} from 'vue'
import {useRouter} from 'vue-router'
import myAxios from '@/use/myAxios';

const router = useRouter();
let isLogin = ref(true); // 是否登录/注册

const loginForm = reactive({
    username:'',
    password:''
});
const SignForm = reactive({
    username:'',
    password:''
});
const login = () => {
        myAxios({
        method:'POST',
        url:'/webapi/login',
        params:loginForm
    }).then(res=>{
        if(res.data.code === 200){
            /* 获取token */
            const user = res.data.data ;
            /* 存放在本地存储中 */
            sessionStorage.setItem('user',JSON.stringify(user));
            /* 提示登录成功 */
            ElMessage({
                message:'登录成功，欢迎回来',
                type:'success',
            });
            /* 判断用户是管理员还是用户 */
            user.role === 0 
                ? router.push('/man')
                : router.push('/show')
        }else{
            ElMessage({
                message: '账号或密码错误!',
                type: 'warning',
            }); 
        }
    }).catch(err=>{
        ElMessage({
                message: '请检查网络连接...',
                type: 'warning',
            }); 
    })
}

</script>

<style lang="scss" scoped>
    .loginForm{
        width:40vw;
        height: 40vh;
        position: absolute;
        top:30vh;
        left:30vw;
        z-index: 999;
        .form{
            width:100%;
            height: 100%;
            display:flex;
            flex-direction:column;
            align-items: center;
            justify-content: space-between;
            input,
            button{
                width:90%;
                height: 15%;
                background-color: transparent;
                border: 1px solid $blueplus;
                border-radius: 3px;
                transition: all 0.2s;
                color:$blue;
            }
            input{
                text-indent: 1vw;
                color:white;
            }
            a{
                color:$blue;
            }
            input:focus{
                border-color:$blue;
            }
            button:hover{
                cursor: pointer;
                background-color: $blue;
                color:white;
            }
            a:hover{
                cursor: pointer;
                color: white;
            }
        }
    }
</style>