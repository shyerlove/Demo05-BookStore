<template>
    <div class="home">
        <Slideshow></Slideshow>
        <Divider h1="畅销书籍"></Divider>
        <List style="position:static;margin:0 auto" :list="10"></List>
        <el-backtop :right="50" :bottom="50">
            <el-icon><Upload /></el-icon>
        </el-backtop>
        <footer>
            2024-04-29 
        </footer>
    </div>
</template>

<script setup name="home">

    import Slideshow from '../../components/Slideshow/index.vue'
    import List from '../../components/List/index.vue'
    import Divider from '../../components/Divider/index.vue'

</script>

<style lang="scss">
    .home{
        width:100vw;
        background-color:$bgc_color;

        .el-backtop{
        background-color: $blueplus;
        display: flex;
        align-items: center;
        justify-content: center;
        }
        .el-backtop:hover{
            background-color: $blue;
        }

        footer{
            text-align: center;
        }
    }
</style>