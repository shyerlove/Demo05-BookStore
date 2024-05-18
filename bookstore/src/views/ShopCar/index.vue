<template>
    <div class="shopcar">
       <table>
            <th><input type="checkbox" @click="all" :checked="isAll"/> 全选</th>
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
           />
       </div>
       </div>
       <div class="bill">
            <button :class="count?'delBtn active':'delBtn'">删除选择项</button>
            <button :class="count?'closeBtn active':'closeBtn'" @click="buy">去结算</button>
            <span>￥{{ allPrice }}</span>
            <span>
                已选择{{ count }}本书籍
                <el-icon color="#2d2d2f"><ArrowUpBold /></el-icon>
            </span>
       </div>
    </div>
</template>

<script setup name="shopcar" lang="ts">
    import Shopcard from '../../components/Shopcard/index.vue'
    import {computed,reactive,ref,watch} from 'vue'
    import {ElMessage} from 'element-plus'
    import myAxios from '@/use/myAxios';
    import fenlei from '@/utils/shopcar.js'
    const user = JSON.parse(sessionStorage.getItem('user') as string) ;

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
    const obj = reactive({
        showcarData: []
    })
    const show = async () => {
        obj.showcarData = fenlei((await myAxios.post('/webapi/shopCar',{id:user.id})).data.data); 
    }
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
        let book_id = 0 ;
        (obj.showcarData as shopCard[][]).forEach(i=>{
            i.forEach(j=>{
                if(j.isSelect){
                    book_id = j.book_id ;
                }
            })
        }) ;
        myAxios({
            method:'POST',
            url:'/webapi/buyBook',
            data:{
                user_id: user.id,
                book_id,
                count:count.value
            },
        }).then(res=>{
            console.log(res.data);
            ElMessage({
                message:'支付成功！',
                type:'success'
            });
            show();
        }).catch(err=>{
            ElMessage({
                message:'支付失败！',
                type:'warning'
            });
        });
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
        }
    }
</style>