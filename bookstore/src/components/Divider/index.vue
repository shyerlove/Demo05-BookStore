<template>
    <div class="divider">
        <span><el-divider /></span>
        <h1>{{ h1 }}</h1>
        <span><el-divider /></span>
    </div>
</template>

<script setup name="divider">
    const props = defineProps(['h1']) ;
</script>

<style lang="scss">
    .divider{
        width:100vw;
        height:10vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 5vh;
        h1{
            width:fit-content;
            height: 100%;
            color:$blueplus;
        }
        span{
            width:40vw;
            height:100%;
            display: block;
        }
    }
</style>