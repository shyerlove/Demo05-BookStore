<template>
    <div class="home">
        <Slideshow></Slideshow>
        <Divider h1="今日特价"></Divider>
        <List :list="dataList.special_offer"></List>
        <Divider h1="人气Top5"></Divider>
        <List :list="dataList.top"></List>
        <Divider h1="小说榜"></Divider>
        <List :list="dataList.novel"></List>
        <el-backtop :right="50" :bottom="50">
            <el-icon><Upload style="color:#ecf5ff"/></el-icon>
        </el-backtop>
    </div>
</template>

<script setup name="home">
    import Slideshow from '../../components/Slideshow/index.vue'
    import List from '../../components/List/index.vue'
    import Divider from '../../components/Divider/index.vue'
    import { reactive } from 'vue'
    import myAxios from '@/use/myAxios';
    // 页面数据
    const dataList = reactive({
        top:[],
        novel:[],
        special_offer:[]
    })
    /* 获取数据 */
    myAxios.get('/webapi/getTop').then(res => {
        dataList.top = res.data.data ;
    });
    myAxios.get('/webapi/getSpecial').then(res => {
        dataList.special_offer = res.data.data ;
    });
    myAxios.get('/webapi/getNovel').then(res => {
        dataList.novel = res.data.data ;
    });

</script>

<style lang="scss" scoped>
    .home{
        width:100vw;
        min-height: 90vh;
        background-color:$bgc_color;
        .el-backtop{
            background-color: $blueplus;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        .el-backtop:hover{
            background-color: $blue;
        }

    }
</style>