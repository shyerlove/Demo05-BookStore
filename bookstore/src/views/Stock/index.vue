<template>
    <div class="stock">
        <el-row class="content">
            <el-col :span="4">
                <h5 class="mb-2">分类</h5>
                <ul class="menus">
                    <li 
                        v-for="(item,index) in book_class" 
                        :index="index" 
                        @click="tabClass(item.book_class,$event)"
                        :class="nowClass === item.book_class ? 'active' : ''"
                    >
                        {{item.book_class}}({{ item.class_count }})
                    </li>
                </ul>
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
                            <el-button 
                                :type="item.stock_state == 1 ? 'success':'warning'" 
                                size="large" 
                                :icon="item.stock_state == 1 ? 'Check': 'ShoppingTrolley'" 
                                style="font-size: 20px;"
                                :disabled="item.stock_state == 1"
                                @click="stockHandler(item)"

                            >{{ item.stock_state == 1 ? '已下单' : '下单' }}</el-button>
                        </div>
                    </div>
                    <el-divider v-if="index !== book.filterBook.length-1"/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="stock">
import Book from '@/types/book';
import bookclass from '@/types/bookclass';
import myAxios from '@/use/myAxios';
import useSocket from '@/use/useSocket';
import {ElMessage, ElMessageBox} from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

// 图书数据
const book = reactive({
    books:<Array<Book>>[],
    filterBook:<Array<Book>>[],
});

// 分类数据
const book_class = reactive<Array<bookclass>>([]) ;
// 当前类
let  nowClass = ref<string>('');
    
/* 进行初始化操作 */
onMounted(async () => {
    // 获取分类和数量
    const result = await myAxios.get('webapi/bookclass');
    Object.assign(book_class,result.data.data);
    // 获取所有的书籍
    const {data} = await myAxios.get('webapi/books');
    book.books = data.data;
    // 获取订单状态
    // 默认显示第一行数据
    nowClass.value = book_class[0].book_class ; 
    tabClass(book_class[0].book_class);
})

const getOrderState = async () => {
    // 获取订单状态
    const orders = await myAxios.get('/webapi/stackorder',{params:{user_id:store.state.user.id}});
    book.filterBook.map((item)=>{
        orders.data.data.forEach((j:any)=>{
            if(j.book_id === item.book_id){
                item.stock_state = j.stock_state ;
            }
        }) 
    })
}
    
/* 分类展示 */
const tabClass = async (book_class:string,e?:Event) => {
    // 激活点击样式
    if(e){
        const list = ((e.target as HTMLElement).parentNode as HTMLElement).children;
        for (let i = 0; i < list.length; i++) {
            console.log(i);
            list[i].classList.remove('active');
        }
        (e.target as HTMLElement).classList.add('active');
    }
    // 重新获取分类数据
    book.filterBook = book.books.filter((item:Book) => item.book_class === book_class) ;
    getOrderState();
}


const s = new useSocket(`/wsapi/stockorder?store_id=${store.state.user.id}`,3) ;
s.onMessaged(() => {
    getOrderState() ;
})
/* 下单 */
const stockHandler = (book:Book) => {
    ElMessageBox.prompt('请输入购买的数量', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputType:'text',
        inputPattern: /^[0-9]+$/,
        inputErrorMessage: '请输入数字',
    })
        .then(async ({value}) => {
            const data = {
                role: 2,
                data:{
                    store_id: store.state.user.id,
                    book_id: book.book_id,
                    count: +value
                }
            }
            s.send(JSON.stringify(data))
            
        })
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
            background-color: $blueplus;
            color:white;
        }
        p{
            font-size: 20px;
        }

        .menus{
            height: 90vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            background-color: $blue;
            &::-webkit-scrollbar{
                display: none;
            }

            li{
                width: 100%;
                height: 14vh;
                text-align: center;
                line-height: 14vh;
                color:white;
                transition:all .3s;
                &:hover{
                    cursor: pointer;
                    background-color: white;
                    color:$blueplus;
                }
            }
            .active{
                background-color: white;
                color:$blueplus;
            }
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