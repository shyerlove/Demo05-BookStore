<template>
    <div class="slideshow">
        <el-carousel trigger="click" style="height:100%">
            <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
    </div>  
</template>
 
 <script setup name="login">
    import {RouterLink} from 'vue-router'
    import {ref} from 'vue'
    const activeIndex = ref('1') ;
    
 </script>
 
 <style lang="scss" scoped>
    .slideshow{
        width:100%;
        height:40%;
        &:nth-child(2n) {
            background-color: #99a9bf;
        }

        &:nth-child(2n + 1) {
            background-color: $blue;
        }
    }
 </style>