<template>
  <div :class="listDown?'list listDown':'list'">
    <ul >
        <li v-for="item in list" :key="item" @click="dialog(item)">
           <BookCard :book="item"/>
        </li>
    </ul>
    <el-dialog v-model="dialogVisible" :title="(bookMsg as Book).store_name">
        <el-row class="dialog">
            <el-col :span="12" class="left" >
                <img :src="'http://127.0.0.1:3002/img?i='+(bookMsg as Book).book_imgUrl" alt="加载中...">
            </el-col>
            <el-col :span="12" class="right">
                <h1>{{(bookMsg as Book).book_name}}</h1>
                <p>{{(bookMsg as Book).msg}}</p>
                <strong>￥ {{ (bookMsg as Book).book_price }}</strong>
                <el-input-number v-model="num" :min="1" :max="100" class="number"/>
               <div class="btns">
                   <el-button type="warning" class="btn2" @click="addShopcar">加入购物车</el-button>
               </div>
            </el-col>
        </el-row>
    </el-dialog>
  </div>
</template>

<script setup name="list" lang="ts">
import myAxios from '@/use/myAxios';
import {reactive, ref} from 'vue'
import {useStore} from 'vuex'
import { ElMessage } from 'element-plus';
import type Book from '@/types/book';
import BookCard from '@/components/BookCard/index.vue' ;
const userStore = useStore();
const {user} = userStore.state;
// 接收父组件传过来的数据
const props = defineProps(['listDown','list']);

// 弹框数据
const bookMsg = reactive({});
// 对话框状态
const dialogVisible = ref<Boolean>(false);
// 购买的数量
const num = ref<Number>(1);

/* 点击弹出对话框 */
const dialog = (data:Book) => {
    // 弹框
    dialogVisible.value = true ;
    // 初始化弹框数据
    Object.assign(bookMsg,data);
}

/* 加入购物车 */
const addShopcar = async () => {
    const result = await myAxios.post('/webapi/addShopcar',{
        store_id: (bookMsg as Book).store_id,
        user_id: user.id,
        book_id: (bookMsg as Book).book_id,
        count: num.value
    });
    if(result.data.code == 200){
        ElMessage({
            message:'加入购物车成功，快去看看吧',
            type:'success'
        });
        dialogVisible.value = false ;
    }else{
        ElMessage({
            message:'加入购物车失败',
            type:'warning'
        });
    }   
}

</script>

<style lang="scss" scoped>
    .list{
        width: 100%;
        padding:2vw;
        transition: all 0.3s linear;
        &>ul{
            width:100%;
            display: grid;
            grid-template-columns: repeat(5,1fr);
            gap: 2vw;   

        }
    }
    .listDown{
        transition: all 0.3s linear;
        top:10vh;
    }
    // 对话框
    .dialog{
        height: 50vh;
        .left{
            img{
                width:90%;
                height: 90%;
            }
        }
        .right{
            display: flex;
            flex-direction: column;
            align-items: end;
            justify-content: space-between;
            h1{
                align-self: self-start;
            }
            p{
                align-self: self-start;
                font-weight: 300;
                text-align: start;
            }
            strong{
                display: block;
                text-align: end;
                font-size: 20px;
            }
            .number{
                margin-top: 1vh;
            }
            .btns{
                height: 10vh;
                display: flex;
                justify-content: center;
                .btn1,.btn2{
                    width:100px;
                }
            }
        }
    }
</style>