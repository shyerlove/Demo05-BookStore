<template>
    <Dialog :dialogVisible="dialogVisible"></Dialog>
    <div class="loginForm" v-if="isLogin">
        <input type="text" class="login_inp" 
        placeholder="请输入账号..." 
        clearable 
        v-model="acc"/>
        <input type="password" 
        class="login_inp" 
        placeholder="请输入密码..." 
        show-password="true" 
        v-model="psd"/>
        <div class="yzm">
            <input class="yzm_inp" placeholder="验证码" v-model="vcode" />
            <img src="">
        </div>
        <el-button class="login_btn" type="primary" @click="login">登录</el-button>
        <a href="#" style="color:#409EFF" @click="isLogin=!isLogin">没有账号？前往注册</a>
    </div>
    <div class="signForm" v-if="!isLogin">
        <input type="text" class="sign_inp" placeholder="创建账号" clearable />
        <input type="password" class="sign_inp" placeholder="请输入密码..." show-password="true" />
        <input type="password" class="sign_inp" placeholder="请确认密码..." show-password="true" />
        <div class="yzm">
            <input class="yzm_inp" placeholder="验证码" />
            <img src="">
        </div>
        <el-button class="sign_btn" type="primary">注册</el-button>
        <a href="#" style="color:#409EFF" @click="isLogin=!isLogin">已有账号？前往登录</a>
    </div>
</template>

<script setup name="login">

import { ElMessage } from 'element-plus';
import { ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter();
let isLogin = ref(true); // 是否登录/注册
let acc = ref(); // 账号
let psd = ref(); // 密码
let vcode = ref(); // 验证码 
let dialogVisible = ref(false);

const login = () => {
    if(acc.value=='0421'&&psd.value=='pp'){
        router.replace('/show') ;
        ElMessage('登录成功!');
    }else{
       ElMessage('账号或密码错误!');
    }
}

</script>

<style lang="scss" scoped>
@mixin inp($w: 90%, $h: 20%) {
    width: $w;
    height: $h;
    background-color: transparent;
    border: 1px solid whitesmoke;
    border-radius: 3px;
    padding: 5px;
    transition: all 0.3s;
}

.loginForm {
    width: 30%;
    height: 35%;
    position: absolute;
    left: 35vw;
    top: 35vh;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .login_inp {
        @include inp();
        color: whitesmoke;
    }

    .login_btn {
        @include inp();
    }


    .login_btn:hover,
    .login_inp:focus{
        border-color: #66b1ff;
        color: #66b1ff;
    }

    .login_btn:active {
        border-color: #409EFF;
        color: #409EFF;
    }

    .yzm {
        width: 90%;
        height: 20%;
        display: flex;
        justify-content: space-between;

        .yzm_inp {
            @include inp(50%, 100%);
        }

        .yzm_inp:focus {
            border-color: #66b1ff;
            color: #66b1ff;
        }

        img {
            width: 40%;
            height: 100%;
            border: 1px solid black;
        }
    }
}
.signForm {
    width: 30%;
    height: 40%;
    position: absolute;
    left: 35vw;
    top: 35vh;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .sign_inp {
        @include inp(90%,15%);
        color: whitesmoke;
    }

    .sign_btn {
        @include inp(90%,15%);
    }


    .sign_btn:hover,
    .sign_inp:focus {
        border-color: #66b1ff;
        color: #66b1ff;
    }

    .sign_btn:active {
        border-color: #409EFF;
        color: #409EFF;
    }

    .yzm {
        width: 90%;
        height: 15%;
        display: flex;
        justify-content: space-between;

        .yzm_inp {
            @include inp(50%, 100%);
        }

        .yzm_inp:focus {
            border-color: #66b1ff;
            color: #66b1ff;
        }

        img {
            width: 40%;
            height: 100%;
            border: 1px solid black;
        }
    }
}
</style>