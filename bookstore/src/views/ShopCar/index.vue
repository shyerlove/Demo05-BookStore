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
           <h1 v-if="obj.showcarData.length == 0" class="noOrder">
                <img src="/src/assets/svg/konggouwuche.svg">
                购物车空空如也...
            </h1>
       </div>
       </div>
       <div class="bill">
            <button :class="count?'delBtn active':'delBtn'" @click="dels">删除选择项</button>
            <button :class="count?'closeBtn active':'closeBtn'" @click="openPayWin">去结算</button>
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
    <div class="pay" v-show="isPay">
        <!-- 支付框 -->
       <div class="pay_win">
            <div class="pay_list">
                <div class="pay_item" v-for="(item,index) in obj.list " :key="index">
                    <h1>{{item.store_name}}</h1>
                    <div class="content">
                        <div class="left">
                            <img :src="'http://127.0.0.1:3002/img?i='+item.book_imgUrl" alt="加载中...">
                        </div>
                        <div class="right">
                            <h1>{{ item.book_name }}</h1>
                            <p>{{ item.book_name }}</p>
                            <span>
                                <span class="msg">包邮</span>
                                <span class="count">× {{ item.book_count }}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <el-radio-group v-model="payMode" class="pay_mode">
                <el-radio :value="1" size="large" border ><img src="/src/assets/svg/weixinpay.svg" class="pay_icon"/>微信支付</el-radio>
                <el-radio :value="2" size="large" border ><img src="/src/assets/svg/zhifubaopay.svg" class="pay_icon"/>支付宝支付</el-radio>
                <el-radio :value="3" size="large" border ><img src="/src/assets/svg/yinhangkapay.svg" class="pay_icon"/>银行卡支付</el-radio>
            </el-radio-group>
            <div class="btns">
                <strong>￥ {{ allPrice }}</strong>
                <el-button type="primary" style="height: 6vh;" @click="isPay=false">我在想想</el-button>
                <el-button type="danger" style="height: 6vh;" @click="buy" >确认支付</el-button>
            </div>
       </div>
    </div>
</template>

<script setup name="shopcar" lang="ts">
import Shopcard from '../../components/Shopcard/index.vue'
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElLoading } from 'element-plus'
import myAxios from '@/use/myAxios';
import fenlei from '@/utils/shopcar.js'

// 获取用户基本数据
const userStore = useStore();
const {user} = userStore.state;
// 是否支付
let isPay = ref<boolean>(false) ;
// 支付方式 1:微信 2：支付宝 3：银行卡
let payMode = ref<1|2|3>(1) ;
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
let openPayWin = () => {
    if(obj.list.length > 0) {
        isPay.value = true ;
    }else{
        ElMessage({
            message: '请选择需要支付的商品',
            type: 'warning',
        })
    }
};

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
    // 获取商品的id及数量集合
    let books:any = [] ;
    obj.showcarData.forEach((v:shopCard[]) => {
        v.forEach((l)=>{
            if(l.isSelect){
                books.push(l);
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
        const loading = ElLoading.service({
            lock: true,
            text: '加载中...',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
            loading.close();
            // 重新渲染数据
            show();
            // 提示支付成功
            ElMessage({
                message:'支付成功！',
                type:'success'
            });
            // 关闭支付窗口
            isPay.value = false ;
        }, 2000)
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
            .noOrder{
                width:100%;
                font-weight: 400;
                display: flex;
                justify-content: center;
                font-size: 26px;
                line-height: 60vh;
                img{
                    width:50px;
                    margin-right: 1vw;
                }
            }
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

    .pay{
        width:100vw;
        height: 100vh;
        background-color: rgba(128, 128, 128, 0.3);
        position: fixed;
        top:0;
        z-index: 999;
        // 支付窗口
        .pay_win{
            width:70vw;
            height: 80vh;
            position: absolute;
            top: 10vh;
            left: 15vw;
            z-index: 999;
            background-color: white;
            box-shadow: 0 0 10px #c6e2ff;
            border-radius: 5px;

            .pay_list{
                width:100%;
                height: 70%;
                padding:0 1vw;
                overflow-y: auto;
                &::-webkit-scrollbar{display: none;}
                display: flex;
                flex-direction: column;
                align-items: center;
                .pay_item{
                    width:90%;
                    min-height: 30%;
                    background-color: #d9ecff;
                    margin-top: 2vh;
                    border-radius: 5px;
                    &>h1{
                       width:100%;
                       height: 30%;
                       font-size: 18px; 
                       background-color: $blue;
                       border-top-left-radius: 5px;
                       border-top-right-radius: 5px;
                       text-indent: 1vw;
                       color:white;
                    }
                    .content{
                        width:100%;
                        height: 70%;
                        display: flex;
                        align-items: center;
                        .left{
                            width:20%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            img{
                                width:40%;
                                height: 90%;
                                border:1px solid $blueplus;
                            }
                        }
                        .right{
                            width:70%;
                            height: 100%;
                            h1{
                                font-size: 20px;
                            }
                            p{
                                overflow: hidden;
                                text-wrap: nowrap;
                                text-overflow: ellipsis;
                            }
                            span{
                                width:100%;
                                display: flex;
                                justify-content: space-between;
                                padding-right:1vw;
                                span{
                                    width:fit-content
                                }
                            }
                        }
                    }
                }
            }
            .pay_mode{
                width:100%;
                height: 10vh;
                position: absolute;
                bottom:10vh;
                display: flex;
                justify-content: center;
                span.el-radio__label {
                    display: flex;
                    .pay_icon{
                        width:20px;
                        margin-right: 5px;
                    }
                }
            }
            .btns{
                width:100%;
                height: 10vh;
                position: absolute;
                bottom:0;
                display: flex;
                align-items: center;
                justify-content: end;
                strong{
                    margin-right: 5vw;
                    font-size: 24px;
                    font-weight: 400;
                }
                button{
                    margin-right: 1vw;
                }
            }
        }
    }
</style>