<template>
  <div :class="listDown?'list listDown':'list'">
    <ul v-show="isHaveBook">
       <li  v-for="item in list" :key="item">{{ item }}</li>
    </ul>
    <h1 v-show="!isHaveBook">暂无图书...</h1>
  </div>
</template>

<script setup name="list">
    import {ref} from 'vue'
    const props = defineProps(['listDown','list']);
    let isHaveBook = ref(true);

</script>

<style lang="scss" scoped>
    .list{
        width: 100%;
        padding:2vw;
        position: absolute;
        top:0px;
        transition: all 0.3s linear;
        &>ul{
            width:100%;
            display: grid;
            grid-template-columns: repeat(5,1fr);
            gap: 2vw;

            & li{
                height: 40vh;
                border:1px solid #909399;
                transition: all 0.1s linear;
            }
            & li:hover{
                cursor: pointer;
                transform: translateY(-5px);
                box-shadow: 1px 1px 6px 1px gray;
            }
        }
        &>h1{
            width:40%;
            height: 50px;
            margin: calc(40vh - 25px);
        }
    }
    .listDown{
        top:10vh;
    }
</style>