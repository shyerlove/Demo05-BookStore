<template>
    <div class="stock">
        <el-row class="content">
            <el-col :span="4">
                <h5 class="mb-2">分类</h5>
                <el-menu
                    :default-active="now_class"
                    class="el-menu-vertical-demo"
                >
                    <el-menu-item v-for="(item,index) in book_class" :index="index" @click="tabClass(index)">
                        <span>{{item}}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" class="list">
                <div class="back">
                    <el-button type="primary" round icon="Back" @click="$router.push('/merchant/inventory')">返回</el-button>
                </div>
                <div class="item"  v-for="(item,index) in book.filterBook" :key=item.book_id>
                    <div class="show">
                        <div class="left">
                            <img :src="'http://127.0.0.1:3002/img?i='+item.book_imgUrl" alt="加载中...">
                        </div>
                        <div class="center">
                            <p class="book_name"><strong>书名: </strong>{{ item.book_name }}</p>
                            <p class="book_class"><strong>类别: </strong>{{ item.book_class }}</p>
                        </div>
                        <div class="right">
                            <p class="book_press"><strong>出版社: </strong>{{ item.book_press }}</p>
                            <p class="book_cost"><strong>成本价: ￥</strong>{{ item.book_cost }}</p>
                        </div>
                        <div class="btn">
                            <el-button type="primary" size="large" icon="ShoppingTrolley" style="font-size: 20px;">下单</el-button>
                        </div>
                    </div>
                    <el-divider v-if="index !== book.filterBook.length-1"/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="stock">
import myAxios from '@/use/myAxios';
import { onMounted, reactive, ref } from 'vue';


const book = reactive({
    books:<any>[],
    filterBook:<any>[],
});
const book_class = [
    '工具类',
    '教育类',
    '长篇小说',
    '短篇小说',
    '少儿类'
] ;
// 当前类
let now_class = ref<number>(0);
    
onMounted(async () => {
   const {data} = await myAxios.get('webapi/books');
   book.books = data.data;
   tabClass(0);
})

const tabClass = (index:any) => {
    console.log(index);
    book.filterBook = book.books.filter((item:any) => item.book_class === book_class[index]) ;
}

</script>

<style scoped lang="scss">
.stock{
    width:100vw;
    height: 100vh;
    position: fixed;
    top:0;
    background-color: white;
    z-index: 999;
    display: flex;
    justify-content: space-between;

    .content{
        width:100%;
        height: 100%;
        h5{
            width:100%;
            height: 10vh;
            text-align: center;
            line-height: 10vh;
            font-size: 20px;
            font-weight: 300;
        }
        p{
            font-size: 20px;
        }

        .list{
            padding:0 2vw ;
            height: 100%;
            overflow-y: auto;
            &::-webkit-scrollbar{
                display: none;
            }
            .back{
                width:100%;
                height: 10vh;
                padding-right: 2vw;
                display: flex;
                align-items: center;
                justify-content: end;
            }
            .item{
                width:100%;
                transition:all .2s;
                
                &:hover{
                    cursor: pointer;
                    box-shadow: 0 0 5px gray;
                }
                .show{
                    width:100%;
                    height: 30vh;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding:1vh 1vw;
                    .left{
                        width:18%;
                        height: 100%;
                        img{
                            width:100%;
                            height: 100%;
                        }
                    }
                    .center,
                    .right{
                        width:30%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                    }
                    
                    .btn{
                        width:20%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
    }

}
</style>