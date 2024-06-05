<template>
    <div class="my">
        <div class="my_left">
            <!-- 头像 -->
            <div class="head">
                <img src="../../assets/login_bgc.jpg"/>
            </div>
           <div class="msg">
               <h2 class="user_name">{{user.username}}</h2>
               <span class="tag">{{ user.role?'用户':'管理员' }}</span>
           </div>
            <!-- 退出登录 -->
            <el-button type="primary" @click="myRouter.push('/forget')">切换账号</el-button>
            <el-button type="primary" @click="esc">退出当前账号</el-button>
        </div>
        <div class="my_right"></div>
    </div>
</template>

<script setup name="my">
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex' ;
    const userStore = useStore();
    const {user} = userStore.state;
    const myRouter = useRouter() ;

    const esc = () => {        
        // 清除用户数据
        sessionStorage.removeItem('user') ;
        userStore.commit('clearUser') ;
        myRouter.replace('/login');
    }
</script>

<style lang="scss" scoped>
    .my{
        width:80vw;
        height: 90vh;
        position: relative;
        left:10vw;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .my_left{
            width:40%;
            height: 90%;
            background-color: rgba(245, 245, 245, 0.6);
            border-radius:10px;
            display: flex;
            flex-direction: column;
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
                width:100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                .user_name{
                    color:black;
                }
                .tag{
                    display: block;
                    width: fit-content;
                    height: 3vh;
                    text-align: center;
                    line-height: 3vh;
                    background-color: $blueplus;
                    border-radius:2px;
                    opacity: 0.6;
                    font-size: 14px;
                }
            }
        }
        .my_right{
            width:40%;
            height: 90%;
        }
    }
</style>