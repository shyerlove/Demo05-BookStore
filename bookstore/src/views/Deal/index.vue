<template>
    <div class="deal">
        <ul class="left">
            <span>
                <input type="text">
                <el-button type="primary">搜索</el-button>
            </span>
            <h1 v-show="obj.dealList.length <= 0" style="margin:0 auto;">空空如也...</h1>
            <li 
                v-show="obj.dealList.length > 0"
                v-for="(item,index) in obj.dealList" 
                :key="index" 
                @click.stop="tabClass(item.book_id,$event)"
                :class="index===0?'active':''"
            >
                <p class="tit">xxx用户</p>
                <p class="time">2022-9-2 12:22:11</p>
                <p class=""></p>
            </li>
        </ul>
        <div class="right" >
            <h1 v-show="obj.dealList.length <= 0" style="margin:20%  auto;">没有交易记录...</h1>
            <div class="img" v-show="obj.dealList.length > 0">
                <img :src="'http://127.0.0.1:3002/img?i='+obj.deals.book_imgUrl" alt="加载中...">
            </div>
            <div class="msg" v-show="obj.dealList.length > 0">
                <p class="book_name">{{ obj.deals.book_name }}</p>
                <p class="book_price">价格:{{ obj.deals.book_price }}</p>
                <p class="book_count">数量:{{ obj.deals.count }}</p>
                <p class="book_allPrice">总计:{{ obj.deals.book_allPrice }}</p>
                <div class="btns">
                    <el-button @click="agree(obj.deals,0)" type="warning">退款</el-button>
                    <el-button @click="agree(obj.deals,1)" type="primary">发货</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import myAxios from '@/use/myAxios';
import mySocket from '@/use/useSocket';
import { ref,reactive,onMounted, nextTick } from 'vue' ;
import { useStore } from 'vuex';
const store = useStore();

const storeSocket = new mySocket(`/wsapi/userorder?store_id=${store.state.user.id}`,3);
storeSocket.onMessaged(async () => {
    await main() ;
    await nextTick();
})

const obj = reactive({
    dealList:<any>[],
        deals:<any>{}
})

const main = async () => {
    const { data } = await myAxios.get(`/webapi/userorder?store_id=${store.state.user.id}`)
    console.log(data);
    
    obj.dealList = data.data.filter((item: any)=>item.userorder_state === 0 ) ;
    console.log('更新交易记录:',obj.dealList);
    
}
onMounted(async () => {
    await main() ;
    obj.deals = obj.dealList[0] ;
})

const tabClass = async (book_id:number,e?:any) => {
    console.log(e);
    
    // 激活点击样式
    if(e){
        if(e.target.localName === 'p'){
            const list = e.target.parentNode?.parentNode.children ;
            for (let i = 0; i < list.length; i++) {
                list[i].classList.remove('active');
            }
            e.target.parentNode.classList.add('active');
        }else{
            const list = e.target.parentNode.children;
            for (let i = 0; i < list.length; i++) {
                list[i].classList.remove('active');
            }
            e.target.classList.add('active');
        }
    }
    // 重新获取分类数据
    obj.deals = obj.dealList.filter((item:any) => item.book_id === book_id)[0] ;
}
const agree = (obj:any,tem:0|1) => {
    const data = {
        role:2,
        data:{
            user_id:obj.user_id,
            userorder_id: obj.userorder_id,
            tem
        }
    }
    storeSocket.send(data);
    main() ;
}

</script>

<style scoped lang="scss">
.deal{
    width:100vw ;
    height: 90vh;
    display: flex;
    .left{
        width:30% ;
        height: 100% ;
        display: flex;
        flex-direction: column;
        overflow-y:auto;
        &::-webkit-scrollbar{display: none;}
        span{
            display: flex;
            width:100%;
            height:10vh;
            align-items: center;
            justify-content: space-around;
            input{
                width:70%;
                height: 50%;
                border:1px solid $blueplus ;
                border-radius: .1875rem;
                text-indent: .625rem;
                transition: all .3s ;
            }
        }
        li{
            width:100%;
            height: 10vh;
            border-bottom: 1px solid #909399;
            transition: all .3s ;
            &:hover{
                cursor: pointer;
                background-color: #ffffff;
                border-bottom: 1px solid #ffffff;
            }
        }
        li.active{
            background-color: #ffffff;
            border-bottom: 1px solid #ffffff;
        }
        
    }

    .right{
        width:70%;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        .img{
            width:50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width:80%;
                height: 70%;
            }
        }

        .msg{
            width:50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding:10vh 10vh 0 0;
            .book_name{
                width: 100%;
                height: 30%;
                font-size: 1.875rem ;
                text-align: center;
            }
            .book_price,
            .book_count,
            .book_allPrice{
                width:100%;
                height: 15%;
            }
            .btns{
                width:100%;
                height: 25%;
                display: flex;
                justify-content: end;
            }
        }
    }
}



</style>