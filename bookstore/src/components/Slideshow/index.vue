<template>
    <div class="slideshow">
        <el-carousel trigger="click" style="height:100%">
            <el-carousel-item v-for="item in imgs" :key="item">
            <img :src="item" alt="加载中..." >
        </el-carousel-item>
    </el-carousel>
    </div>  
</template>
 
 <script setup name="slideshow" lang="ts">
    // const activeIndex = ref<string>('1') ;
    const imgs: string[] = [
        '/src/assets/img1.png',
        '/src/assets/img2.png',
        '/src/assets/img3.png',
        '/src/assets/img4.png',
    ]
 </script>
 
 <style lang="scss" scoped>
    .slideshow{
        width:100%;
        height:40%;
        img{
            width:100%;
            height: 100%;
            object-fit: cover;
        }
        img:hover{
            cursor: pointer;
        }
    }
 </style>