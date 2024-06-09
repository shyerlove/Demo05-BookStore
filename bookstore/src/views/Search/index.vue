<template>
    <div class="search">
       <div :class="isMini?'search_inp search_inp_min':'search_inp'">
            <input type="text" ref="inp" @keyup.enter="search">
            <button @click="search">搜索</button>
       </div>
       <div class="show" @scroll="scroll">
           <List 
                :listDown="isMini" 
                :list="obj.list"
                v-show="isHaveBook"
            />
            <p class="null" v-show="!isHaveBook">无查询结果...</p>
            <div class="bottom" ref="bottom"></div>
       </div>
    </div>
</template>

<script setup name="search" lang="ts">
import myAxios from '@/use/myAxios';
import List from '../../components/List/index.vue'
import {defineCustomElement, reactive, ref} from 'vue'
import {ElLoading, ElMessage} from 'element-plus'
import Book from '@/types/book';
import { Domain } from 'domain';


// 搜索列表数据
const obj = reactive({
    list:<Array<Book>>[]
})
// 搜索框是否移动到左侧
const isMini = ref<boolean>(false) ;
// 是否有结果
const isHaveBook = ref<boolean>(true) ;
// 输入框
const inp = ref<HTMLInputElement>();
const isLoading = ref<boolean>(true) ;
// 加载次数
let count = ref<number>(0) ;
// dom
const bottom = ref<HTMLElement>() ;
/* 搜索 */
const search = async () => {
    // 初始化
    obj.list = [] ;
    count.value = 0 ;
    (bottom.value as HTMLElement).innerText = '' ;
    // 判断搜索框是否为空
    if(!inp.value?.value || inp.value?.value[0] === ' '){
        ElMessage({
            message: '内容不能为空',
            type: 'warning'
        })
        return;
    }
    // 开启搜索框动画
    isMini.value = true ;
    // 弹出loading
    const loading = ElLoading.service({
        target:'.show',
        lock: true,
        text: '加载中...',
        background: '#d9ecff'
    });
    setTimeout( () => {
        main();
        loading.close(); // 请求成功，关闭loading   
    }, 500);  
}

// 请求数据并渲染
const main = async () => {    
    const result = await myAxios({
        url:'/webapi/search',
        method:'GET',
        params:{
            book_name: inp.value?.value,
            index : 10 * count.value,
            count: 10
        }
    });
    if(result.data.code === 200){
        isHaveBook.value = true ;
        obj.list.push(...result.data.data);      
        // 判断下一次还需不需要加载
        if(obj.list.length % 10 === 0){
            isLoading.value = true ;
        }else{
            (bottom.value as HTMLElement).innerText = '到底啦...';
        }  
    }else{
        isHaveBook.value = false ;
    }
    count.value ++ ;
}

// 懒加载
let scroll = (e:any) => {
    const {clientHeight,scrollTop,scrollHeight} = e.target ;
    // 判断是否到底
    if(clientHeight + scrollTop + 1 >= scrollHeight){
        if(isLoading.value){
            // 显示加载图标
            const load = ElLoading.service({
                target:'.bottom',
                lock: true,
                background: '#d9ecff'
            });
            // 阻止触底加载
            isLoading.value = false ;
            // 判断后面还有没有数据
            if(obj.list.length % 10 === 0){            
                setTimeout( ()=>{
                    main(); // 请求渲染
                },2000)
            }
        }
    }
}

</script>

<style lang="scss" scoped>
.search{
    width: 100%;
    min-height: 90vh;
    position: relative;
    background-color: $bgc_color;
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
            color:black;
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

    .show{
        position: absolute;
        width:100%;
        height: 80vh;
        bottom:0;
        overflow-y:auto;
        &::-webkit-scrollbar{
            display: none;
        }

        .bottom{
            width:100%;
            height: 10vh;
            font-size: 20px;
            text-align: center;
            line-height: 10vh;
            letter-spacing: 3px;
            color:$blueplus;
        }

        .null{
            width:100%;
            position: absolute;
            top:30vh;
            text-align: center;
            color:$blueplus;
            font-size: 30px;
            letter-spacing: 5px;

        }
    }
}

</style>