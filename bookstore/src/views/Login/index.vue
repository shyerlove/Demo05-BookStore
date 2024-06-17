<template>
    <div class="login">
        <el-button 
        type="primary" 
        class="btn" 
        plain
        @click="tab">{{isUser ?'切换到商家端':'切换到用户端' }}</el-button>
        <loginForm v-show="isUser" />
        <StoreLogin v-show="!isUser"/>
    </div>
</template>

<script setup name="login" lang="ts"> 
import {reactive, ref} from 'vue'
import loginForm from './loginForm.vue'
import StoreLogin from '@/components/StoreLogin/index.vue'
import { ElMessage } from 'element-plus';

const isUser = ref<boolean>(true);
const tab = () => {
    isUser.value = !isUser.value;
    ElMessage({
        message: isUser.value ? '已切换到用户端' : '已切换到商家端',
        type: isUser.value ? 'success' : 'warning' ,
        duration: 1000
    })
}
const fn = () => {
    
} 
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    position: relative;

    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background-image: url('../../assets/login_bgc.jpg');
        background-size: cover;
        filter: blur(5px);
        z-index: -1;
        top: 0;
    }

    .btn {
        position: absolute;
        top: 2vh ;
        right: 2vw ;
        z-index: 999 ;
        background-color: transparent;
        color:white;
        &:hover{
            color:$blue;
        }
    }
}
</style>