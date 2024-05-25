<template>
    <el-menu 
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        router
    >
        <el-menu-item>
            <img src="" alt="">
        </el-menu-item>
        <div class="flex-grow"></div>
                <el-menu-item index="/show" v-if="user.role">首页</el-menu-item>
                <el-menu-item index="/show/search" v-if="user.role">搜索</el-menu-item>
                <el-menu-item index="/show/shopcar" v-if="user.role">购物车</el-menu-item>
                <el-menu-item index="/man" v-if="!user.role">管理</el-menu-item>
                <el-menu-item index="/show/my">个人中心</el-menu-item>            
    </el-menu>    
</template>
 
 <script setup name="login" lang="ts">
import { ref,onMounted } from 'vue'
import { useStore } from 'vuex';
import {useRouter} from 'vue-router'
// 获取userstore
const userStore = useStore();
// 获取用户信息
const {user} = userStore.state ;
// 创建路由对象
const router = useRouter();
// 当前路径
const activeIndex = ref<string>('') ;
/* 每次刷新页面都会跳回首页 */
onMounted(() => {
    if(user.role){
        activeIndex.value = '/show' ;
        router.push('/show') ;
    }else{
        activeIndex.value = '/man' ;
        router.push('/man') ;
    }
})
 </script>
 
 <style lang="scss" scoped>
 .el-menu-demo{
    width:100vw;
    height: 10vh;
    position:fixed;
    z-index:999;

    .flex-grow{
         flex-grow: 1;
    }
 }
 </style>