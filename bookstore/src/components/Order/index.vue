<template>
    <div class="order">
       <div class="head">
        {{ data.store_name }}
       </div>
       <div class="body">
        <div class="left">
            <img :src="'http://127.0.0.1:3002/img?i='+data.book_imgUrl" alt="加载中...">
        </div>
        <div class="right">
            <h1>{{ data.book_name }}</h1>
            <p>{{ data.msg }}</p>
            <span>
                <div class="state" v-if="data.userorder_state===-1">
                    <img :src="svgs[0].src" style="width:2vw;">
                    <p>{{ svgs[0].msg}}</p>
                </div>
                <div class="state" v-if="data.userorder_state===0">
                    <img :src="svgs[1].src" style="width:2vw;">
                    <p>{{ svgs[1].msg}}</p>
                </div>
                <div class="state" v-if="data.userorder_state===1">
                    <img :src="svgs[2].src" style="width:2vw;">
                    <p>{{ svgs[2].msg}}</p>
                </div>
                <div class="state" v-if="data.userorder_state===2">
                    <img :src="svgs[3].src" style="width:2vw;">
                    <p>{{ svgs[3].msg}}</p>
                </div>
                <div class="edit">
                    <el-button  
                        round 
                        class="edit_btn"  
                        v-if="data.userorder_state!==-1"
                        @click="DealOrder(data.userorder_id,'REFUND')"
                        :disabled="data.userorder_state == -2"
                    >{{data.userorder_state == -2 ?'申请退款中...':'申请退款'}}</el-button>
                    <el-button  
                        round 
                        class="edit_btn"  
                        v-if="data.userorder_state===2"
                        @click="DealOrder(data.userorder_id,'OK')"
                    >确认收货</el-button>
                    <el-button  
                        round 
                        class="edit_btn"  
                        v-if="data.userorder_state===-1"
                        @click="DealOrder(data.userorder_id,'DELETE')"
                    >删除该订单</el-button>
                </div>
            </span>
        </div>
       </div>
    </div>
</template>

<script setup name="order" lang="ts">
import myAxios from '@/use/myAxios';
import { ElMessage, ElMessageBox } from 'element-plus';


const props = defineProps(['data','main']) ;
const svgs = [
        {src:'/src/assets/svg/yituikuan.svg',msg:'已退款'},
        {src:'/src/assets/svg/daifahuo.svg',msg:'待发货'},
        {src:'/src/assets/svg/peisongzhong.svg',msg:'配送中'},
        {src:'/src/assets/svg/yiqianshou.svg',msg:'已签收'}
    ] ;
    
// 修改订单状态
const DealOrder =  (userorder_id: number,state: string) => {
    let message = state == 'OK' ? '确认收货?':state == 'DELETE' ? '确认删除该订单?':'确认退款吗?';
    ElMessageBox.confirm(
    message,
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    const {data:{msg,type}} = await myAxios({
    url:'/webapi/userorder',
    method:'POST',
    data:{
        userorder_id,
        state
    }
});
  ElMessage({message: msg,type});
  await props.main();
  });

}


    
</script>

<style lang="scss" scoped>
.order{
    width:80%;
    height: auto;
    margin: 1Svh 0 ;
    .head{
        width:100%;
        height: 5vh;
        background-image: linear-gradient(to right,#c6e2ff,#c6e1ff90,#79bcff00);
        border:1px solid skyblue;
        border-bottom:none;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        line-height: 5vh;
        text-indent: 1em;
        color: #409EFF;
        transition: all 0.3s;
        &:hover{
            cursor: pointer;
            background-image: linear-gradient(to right,#409EFF,#40a0ff87,#79bcff00);
            color:#c6e2ff;
        }
    }
    .body{
        width:100%;
        height: 30vh;
        border:1px solid skyblue;
        border-top:none;
        display: flex;
        align-items: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        .left{
            width:15%;
            height: 100%;
            display: flex;
            align-items: center;
            margin-left: 1em;
            img{
                display: block;
                border:1px solid skyblue;
                width: 100%;
                height: 90%;
            }
        }

        .right{
            width:80%;
            height: 90%;
            margin-left: 1vw;
            
            h1{
                font-size: 1.625rem;
                margin-bottom: 1vh;
            }
            p{
                font-size: 1.25rem;
                text-wrap: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 2vh;
            }
            span{
                display: block;
                width:100%;
                height: 15vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                .state{
                    width:100%;
                    height: 5vh;
                    background-color: #c0c4cc48;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    padding:0 1vw;

                    p{
                        font-size: 14px;
                        color: black;
                        margin-left: 1vw;
                        margin-bottom:0;
                    }
                }
                .edit{
                    width:100%;
                    height: 8vh;
                    display: flex;
                    align-items: center;
                    justify-content: end;

                    .edit_btn:nth-child(1){
                        background-color: white;
                        border:1px solid #F56C6C;
                        color:#F56C6C;
                        &:hover{
                            background-color: #F56C6C;
                            color:white;
                        }
                    }
                    .edit_btn:nth-child(2){
                        background-color: white;
                        border:1px solid #409EFF;
                        color:#409EFF;
                        &:hover{
                            background-color: #409EFF;
                            color:white;
                        }
                    }
                    
                }
                
            }
        }
    }
}
</style>