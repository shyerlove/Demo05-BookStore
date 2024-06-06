<template>
    <div class="my">
        <div class="my_left">
            <div class="top">
                <!-- 头像 -->
                <div class="head">
                    <img src="../../assets/login_bgc.jpg"/>
                </div>
                <div class="msg">
                    <h2 class="user_name">{{user.username}}</h2>
                    <span class="tag">{{ user.role?'用户':'管理员' }}</span>
                </div>
            </div>
            <div class="bottom">
                <!-- 退出登录 -->
                <el-button type="primary" @click="myRouter.push('/forget')">修改密码</el-button>
                <el-button type="primary" @click="esc">退出当前账号</el-button>
            </div>
        </div>
        <div class="my_right">
            <div class="my_order">
                <template v-for="item in userStore.state.order" :key="item.book_id">
                    <Order :data="item"/>
                </template>
                <h1 v-if="userStore.state.order.length==0" class="noOrder">
                    <img src="/src/assets/svg/zanwudingdan.svg">
                    暂无订单,快去购物吧...
                </h1>
            </div>
        </div>
    </div>
</template>

<script setup name="my">
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex' ;
    import Order from '@/components/Order/index.vue' ;
    import { onMounted } from 'vue';
    const userStore = useStore();
    const {user} = userStore.state;
    const myRouter = useRouter() ;
    // 初始化订单
    onMounted(() => {
        userStore.dispatch('initOrder');
    })
    const esc = () => {        
        // 清除用户数据
        sessionStorage.removeItem('user') ;
        userStore.commit('clearUser') ;
        myRouter.replace('/login');
    }
</script>

<style lang="scss" scoped>
    .my{
        width:90vw;
        height: 90vh;
        position: relative;
        left:5vw;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .my_left{
            width:40%;
            height: 90%;
            background-color: rgba(245, 245, 245, 0.6);
            border-radius:10px;
            display: flex;
            flex-direction: column;
            align-items:center;
            justify-content: space-between;
            padding-top:10vh;
            box-shadow: 2px 2px 20px rgb(175, 174, 174);

            .top{
                width:30vw;
                height: 20vh;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .head{
                    width:10vw;
                    height: 10vw;
                    border-radius: 50%;
                    img{
                        width:inherit;
                        height:inherit;
                        border-radius: inherit;
                    }
                }
                .msg{
                    width:auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    .user_name{
                        color:$blue;
                    }
                    .tag{
                        display: block;
                        width: 4vw;
                        height: 3vh;
                        text-align: center;
                        line-height: 3vh;
                        background-color: $blueplus;
                        border-radius:2px;
                        opacity: 0.6;
                        font-size: 14px;
                        margin-top: 3vh;
                        color: white;
                    }
                }
            }
            .bottom{
                width:30vw;
                height: 20vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                button{
                    width:20vw;
                    margin:0;
                }
            }
        }
        .my_right{
            width:50%;
            height: 90%;
            background-color: rgba(245, 245, 245, 0.6);
            border-radius:10px;
            display: flex;
            flex-direction: column;
            align-items:center;
            justify-content: space-between;
            padding:10vh 0;
            box-shadow: 2px 2px 20px rgb(175, 174, 174);
            overflow-y: auto;
            &::-webkit-scrollbar{
               width:4px;
            }
            &::-webkit-scrollbar-thumb{
                border-radius: 2px;
                background-color: gray;
            }
            
        }

        .noOrder{
            font-weight: 400;
            display: flex;
            font-size: 26px;
            line-height: 60vh;
            img{
                width:50px;
            }
            
        }
    }
</style>