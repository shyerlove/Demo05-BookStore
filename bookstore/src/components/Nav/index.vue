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
        <template v-for="item in userStore.state.menus" :key="item.src">
            <el-menu-item :index="item.menu_src">
                    {{item.menu_name}}
            </el-menu-item>
        </template>           
    </el-menu>    
</template>
 
<script setup name="mynav" lang="ts">

import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex';
// 获取userstore
const userStore = useStore();
// 初始化订单数据

// 当前路径
let activeIndex = ref<string>('') ;
onMounted(async () => {
    // 初始化菜单    
    if(userStore.state.user.role == undefined){
        await userStore.dispatch('initMenus',2) ;
    }else{
        await userStore.dispatch('initMenus',userStore.state.user.role)
    }
    // 刷新页面激活项不丢失
    activeIndex.value = window.location.pathname ;
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