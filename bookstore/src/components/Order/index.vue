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
            <p>{{ data.book_name }}</p>
            <span>
                <div class="state">
                    <img :src="svgs[data.order_state].src" style="width:2vw;">
                    <p>{{svgs[data.order_state].msg}}</p>
                </div>
                <div class="edit">
                    <el-button  round class="edit_btn" size="small">申请退款</el-button>
                    <el-button  round class="edit_btn" size="small">确认收货</el-button>
                </div>
            </span>
        </div>
       </div>
    </div>
    <el-divider />
</template>

<script setup name="order" lang="ts">

const prop = defineProps(['data']) ;
const svgs = [
        {src:'/src/assets/svg/daifahuo.svg',msg:'待发货'},
        {src:'/src/assets/svg/peisongzhong.svg',msg:'配送中'},
        {src:'/src/assets/svg/yiqianshou.svg',msg:'已签收'}
    ] ;
</script>

<style lang="scss" scoped>
.order{
    width:40vw;
    height: auto;
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
        height: 20vh;
        border:1px solid skyblue;
        border-top:none;
        display: flex;
        align-items: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        .left{
            width:20%;
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
            width:70%;
            height: 90%;
            margin-left: 1vw;
            
            h1{
                font-size: 20px;
            }
            p{
                font-size: 14px;
                text-wrap: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            span{
                display: block;
                width:100%;
                height: 10vh;
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
                    }
                }
                .edit{
                    width:100%;
                    height: 5vh;
                    display: flex;
                    align-items: end;
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