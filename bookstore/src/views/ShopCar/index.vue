<template>
    <div class="shopcar">
       <table>
            <th>
                <input type="checkbox" @click="all" :checked="isAll"/> 全选
            </th>
            <th>书名</th>
            <th>描述</th>
            <th>单价</th>
            <th>数量</th>
            <th>操作</th>
       </table>
       <div class="hid">
        <div class="cars">
           <Shopcard 
                v-for="(item,index) in obj.showcarData" 
                :key="index" 
                :data="item"
                :send="get"
                :index="index"
                :isAll="isAll"
                :isClick="isClick"
                :show = "show"
                :del = "dels"
           />
       </div>
       </div>
       <div class="bill">
            <button :class="count?'delBtn active':'delBtn'" @click="dels">删除选择项</button>
            <button :class="count?'closeBtn active':'closeBtn'" @click="buy">去结算</button>
            <span>￥{{ allPrice }}</span>
            <span>
                已选择{{ count }}本书籍
                <el-icon color="#2d2d2f" @click="rotate" class="icon"><ArrowUpBold  /></el-icon>
            </span>
            <el-card class="win" v-show="isOpenWin">
                <ul>
                    <li v-for="(item,index) in obj.list " :key="index" class="win_li">
                        <strong>{{ item.book_name }}</strong>
                        <span>数量：{{ item.book_count }}</span>
                    </li>
                </ul>
            </el-card>
       </div>
    </div>
</template>

<script setup name="shopcar" lang="ts">
import Shopcard from '../../components/Shopcard/index.vue'
import {computed,reactive,ref,watch} from 'vue'
import {useStore} from 'vuex'
import {ElMessage} from 'element-plus'
import myAxios from '@/use/myAxios';
import fenlei from '@/utils/shopcar.js'

// 获取用户基本数据
const userStore = useStore();
const {user} = userStore.state;

type shopCard = {
    book_id: number,
    book_name: string,
    book_press: string,
    store_name: string,
    book_imgUrl: string,
    book_count:number,
    book_cost: number,
    book_price: number
    isSelect: boolean
}
/* 初始化数据 */
const obj = reactive<any>({
    showcarData: [],
    list: []
})
const show = async () => {
    obj.showcarData = fenlei((await myAxios.post('/webapi/shopCar',{id:user.id})).data.data); 
}
watch(()=>obj.showcarData,(newVal)=>{
    const temList:shopCard[] = [] ;
    (newVal as shopCard[][]).forEach(i=>{
         i.forEach(j=>{
            if(j.isSelect){
                temList.push(j);
            }
        })
    }) ;
    obj.list = temList; 
    
},{deep:true});
/* 初始化数据 */
show();
/* 计算购买的数量 */
let count = computed(() => {
    let temVal = 0 ;
    (obj.showcarData as shopCard[][]).forEach(i=>{
        i.forEach( j => {
            j.isSelect
                ? temVal += j.book_count
                : []
        })
    })
    return temVal ;
})
/* 计算购买的总价 */
let allPrice = computed(() => {
    let temVal = 0 ;
    (obj.showcarData as shopCard[][]).forEach(i=>{
        i.forEach( j => {
            j.isSelect
            ? temVal += j.book_count * j.book_price
            : []
        })
    })
    return temVal.toFixed(2) ;
})
let isAll = ref(false) ; // 是否将购物车商品全部选中
/* 选中该商家的全部商品 */
const get = (index:number,val:boolean) => {
    (obj.showcarData[index] as shopCard[]).map(item=>{
        item.isSelect = val ;
    })
}
/* 判断是否将购物车全选 */
watch((obj.showcarData as shopCard[][]),(newVal) => {
    let tem = true ;
    newVal.forEach(i=>{
        i.forEach(j=>{
            if(!j.isSelect) tem = false; 
        })
    })
    isAll.value = tem ;
})

let isClick = ref<Boolean>(false);
const all = () => {
    isClick.value = !isClick.value ;
    isAll.value = !isAll.value ;
}

/* 支付 */
const buy = () => {
    // 获取删除的id集合
    let books:Array<Array<number>> = [] ;
    obj.showcarData.forEach((v:shopCard[]) => {
        v.forEach((l)=>{
            if(l.isSelect){
                books.push([l.book_id,l.book_count]);
            }
        })
    }) ;
    myAxios({
        method:'POST',
        url:'/webapi/buyBook',
        data:{
            user_id: user.id,
            books
        },
    }).then( res =>{
        ElMessage({
            message:'支付成功！',
            type:'success'
        });
        show();
    }).catch( err => {
        ElMessage({
            message:'支付失败！',
            type:'warning'
        });
    });
}
   
/* 批量删除 */
const dels = () => {
    // 获取删除的id集合
    let ids:number[] = [];
    obj.showcarData.forEach((v:shopCard[])=>{
        (v as shopCard[]).forEach(l=>{
            if(l.isSelect){
                ids.push(l.book_id);
            }
        })
    })
    myAxios({
        method:'POST',
        url:'/webapi/delsShopcar',
        data:{
            user_id:user.id,
            ids
        }
    }).then(() => {
        ElMessage({
            message:'删除成功！',
            type:'success'
        });
        show();
    }).catch(err => {
        ElMessage({
            message:'删除失败！',
            type:'warning'
        });
        console.log(err);
    });
}
let isRotate = ref(false);
let isOpenWin = ref(false);
const rotate = (e:Event) => {
    isRotate.value =!isRotate.value ;
    if(isRotate.value){
        (e.target as HTMLElement).style.transition = 'all 0.2s';  
        (e.target as HTMLElement).style.transform = 'rotate(-180deg)';  
        isOpenWin.value = true;
    }else{
        (e.target as HTMLElement).style.transform = 'rotate(0)';  
        isOpenWin.value = false;
    }
}
</script>

<style lang="scss" scoped>
    .shopcar{
        width:100vw;
        height: 90vh;
        position: relative;
        background-color: $bgc_color;
        table{
            margin: 0 auto;
            width: 95vw;
            border-spacing: 0px;
            th{
                color: black;
                height:10vh;
                line-height: 10vh;
                background-color: $blueplus;
                color:white;
            }
            th:nth-child(1){width:10%}
            th:nth-child(2){width:30%}
            th:nth-child(3){width:30%}
            th:nth-child(4){width:10%}
            th:nth-child(5){width:10%}
            th:nth-child(6){width:10%}
        }

     
        .cars{
            width:95vw;
            height: 70vh;
            margin:0 auto ;
            overflow-y: scroll;
        }
        ::-webkit-scrollbar{
            display: none;
        }
        

        .bill{
            position: absolute;
            width: 100vw;
            height: 10vh;
            bottom:0;
            background-color: white;
            .delBtn{
                width:100px;
                height: 100%;
                float:left;
                background-color: rgba(255, 0, 0, 0.5);
                color:white;
            }
            .closeBtn{
                color:white;
                width:100px;
                height: 100%;
                float:right;
                background-color: rgba(255, 0, 0, 0.5);
            }
            .active{background-color: red;}
            .active:hover{
                cursor: pointer;
            }
            span{
                height: 100%;
                float: right;
                color:black;
                line-height: 10vh;
                margin-right: 2vw;
            }
            .icon{
                &:hover{
                    cursor: pointer;
                }

            }
            .win{
                position: fixed;
                width:20vw;
                height: 40vh;
                border-radius: 5px;
                right:15vw;
                bottom:8vh;
                transition: all 0.2s;
                overflow-y: auto;
                &::-webkit-scrollbar{
                    display: none;
                }

                .win_li{
                    width: 100%;
                    height: 10vh;
                    line-height: 10vh;
                    text-align: center;
                    background-color: white;
                    color: $blue;
                    border-bottom: 1px solid #a0cfff;
                    transition: all 0.2s;
                    span{
                        transition: all 0.2s;
                        color: $blue;
                    }
                    &:hover{
                        cursor: pointer;
                        border-radius: 10px;
                        background-color: #a0cfff;
                        color: white;
                        span{
                            color:white;
                        }
                    }
                }
            }
        }
    }
</style>