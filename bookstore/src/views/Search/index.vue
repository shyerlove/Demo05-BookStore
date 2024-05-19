<template>
    <div class="search">
        <span></span>
       <div :class="isMini?'search_inp search_inp_min':'search_inp'">
            <input type="text" ref="inp">
            <button @click="search">搜索</button>
       </div>
       <List
            :listDown="isMini" 
            :list="list"
            v-show="isHaveBook"
        />
        <h1 v-show="!isHaveBook">暂无数据...</h1>
    </div>
</template>

<script setup name="search" lang="ts">
import myAxios from '@/use/myAxios';
import List from '../../components/List/index.vue'
import {reactive, ref} from 'vue'


// 搜索列表数据
const list = reactive([]);
// 搜索框是否移动到左侧
const isMini = ref<boolean>(false) ;
// 是否有结果
const isHaveBook = ref<boolean>(true) ;
// 输入框
const inp = ref<HTMLInputElement>();

/* 搜索 */
const search = async () => {
    isMini.value = true ;
    /* 等待查询结果 */
    const result = await myAxios.get(`/webapi/search?book_name=${inp.value?.value}`);
    if(result.data.code == 200){
        isHaveBook.value = true ;
        Object.assign(list,result.data.data);
    }else{
        isHaveBook.value = false ;
    }
}
</script>

<style lang="scss" scoped>
.search{
    width: 100%;
    min-height: 90vh;
    position: relative;
    background-color: $bgc_color;
    &>h1{
        width:100%;
        position: absolute;
        top:40vh;
        text-align: center;
        color:$blueplus;
    }
    &>span{
        display: block;
        width: 100vw;
        height: 10vh;
    }
    
    .search_inp{
        position: absolute;
        width: 60%;
        height: 10vh;
        left:20vw;
        top:40vh;
        display: flex;
        transition: all 0.3s linear;
        z-index: 2;
        input{
            width: 80%;
            height: 90%;
            border:1px solid $blueplus;
            border-radius: 5px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            font-size: 18px;
            text-indent: 10px;
            color:$blueplus;
            border-right:none;
            background-color: transparent;
        }
        input:focus{
            border-color: $blue;
        }
        button{
            width: 20%;
            height: 90%;
            border:1px solid $blue;
            border-radius: 5px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            background-color:  $blueplus;
            font-size:20px;
            transition: all 0.2s;
            color:white;
        }
        button:hover{
            cursor: pointer;
            font-size: 22px;
            background-color: $blue;
        }
        button:active{
            font-size: 18px;
            background-color: $blueplus;
        }
    }

    .search_inp_min{
        width:30%;
        height: 7vh;
        top:2vh;
        left:1vw;
    }
}

</style>