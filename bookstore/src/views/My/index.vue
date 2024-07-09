<template>
    <div class="my">
        <ul class="left">
            <li v-for="item in 5" class="item">{{item}}</li>
            <li class="btns">
                <el-button @click="esc" type="danger" style="width:90%">退出登录</el-button>
            </li>
        </ul>
        <div class="right">
            <div class="top">
                <el-avatar  class="img" shape="square" src="/public/logo.svg" />
                <h2>shyerlove</h2>
            </div>
            <div class="bottom"></div>
        </div>
    </div>
</template>

<script setup name="my">
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Order from '@/components/Order/index.vue';
import { onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import myAxios from '@/use/myAxios';
const userStore = useStore();
const { user } = userStore.state;
const myRouter = useRouter();
// 初始化订单
onMounted(() => {
    userStore.dispatch('initOrder');
})

// 退出登录
const esc = () => {
    ElMessageBox.confirm(
        '确认退出当前账号?',
        'Warning',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        // 确认退出，清除用户数据
        sessionStorage.removeItem('user');
        userStore.commit('clearUser');
        myRouter.replace('/login');
    })
}

const edit = () => {
    
}
</script>

<style lang="scss" scoped>
.my {
    width: 90vw;
    height: 90vh;
    position: relative;
    left: 5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left,
    .top,
    .bottom {
        width: 20%;
        height: 90%;
        background-color: rgba(245, 245, 245, 0.6);
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 1vh 1vw;
    }
    .left{
        display: flex;
        flex-direction: column;
        .btns{
            height: 10%;
           margin-top: auto;
           display: flex;
           align-items: center;
           justify-content: center;
        }
        .item{
            width:100% ;
            height: 8vh;
            border-bottom: 1px solid #e9e9eb;
            text-align: center;
            line-height: 8vh;
            transition: all .3s;
            border-radius: .3125rem;
            &:hover{
                background-color: $blue;
                cursor: pointer;
            }
        }
    }
    .right{
        width:70%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top{
            width:100%;
            height: 45%;
            position: relative;
            padding:0 2vw;
            .img{
                width: 25vh;
                height: 25vh;
                border-radius: inherit;
                position: absolute;
                top:calc((100% - 25vh) / 2) ;
            }
            h2{
                position: absolute;
                width:fit-content;
                height: 10vh;
                font-size: 1.875rem;
                top:5vh;
                left:32vh;
            }
        }
        .bottom{
            width:100%;
            height: 45%;
        }
    }
}
</style>