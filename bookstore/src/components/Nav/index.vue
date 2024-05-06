<template>
    <el-menu 
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false">
        <el-menu-item>
            <img src="" alt="">
        </el-menu-item>
        <div class="flex-grow"></div>
            
            <RouterLink to="/show/home">
                <el-menu-item index="1">首页</el-menu-item>
            </RouterLink>
            <RouterLink to="/show/search">
                <el-menu-item index="2">搜索</el-menu-item>
            </RouterLink>
            <RouterLink to="/show/shopcar">
                <el-menu-item index="3">购物车</el-menu-item>
            </RouterLink>
            <RouterLink to="/show/manage">
                <el-menu-item index="4">管理</el-menu-item>
            </RouterLink>
            <RouterLink to="/show/my">
                <el-menu-item index="5">个人中心</el-menu-item>
            </RouterLink>
            
    </el-menu>    
</template>
 
 <script setup name="login">
    import {RouterLink} from 'vue-router'
    import {ref} from 'vue'
    const activeIndex = ref('1') ;
    
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