<template>
    <div class="my">
        <ul class="left">
            <li v-for="item in 5" class="item">{{item}}</li>
            <li class="btns">
                <el-button @click="$router.push({name:'forget'})"  type="primary" style="width:90%">修改个人信息</el-button>
                <el-button  @click="esc" type="danger" style="width:90%;margin:0;">退出登录</el-button>
            </li>
        </ul>
        <div class="right">
            <div class="top">
                <label class="img">
                    <input type="file"  style="visibility: hidden;" @change="upload">
                    <el-avatar  class="img" ref="head" shape="square" :src="src" />
                </label>
                <h2>{{userStore.state.user.username}}</h2>
            </div>
            <div class="bottom"></div>
        </div>
    </div>
</template>

<script setup name="my" lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Order from '@/components/Order/index.vue';
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import myAxios from '@/use/myAxios';
import toBuffer from '@/utils/urlToBuffer';
import hash from '@/utils/hash';
const userStore = useStore();
const { user } = userStore.state;
const myRouter = useRouter();
// 初始化订单
onMounted(() => {
    userStore.dispatch('initOrder');
    if(userStore.state.user.headImg){
        src.value = 'http://127.0.0.1:3002/head?headImg='+userStore.state.user.headImg;
    }else{
        src.value = '/public/defaultHead.png';
    }
})

const src = ref<string>('');
// 上传头像
const upload = (e: Event) => {
    if((e.target as HTMLFormElement).files[0].type.split('/')[0] !=='image' || (e.target as HTMLFormElement).files.length > 1){
        ElMessage({message:'请上传图片!',type:'error'});
        return ;
    }
    const reader = new FileReader();
    reader.readAsDataURL((e.target as HTMLFormElement).files[0]);
    reader.onload = async (event) => {
        const fromdata = new FormData();
        let blob = await toBuffer((event.target?.result as string) ) ;
        let h = await hash(blob);
        fromdata.append('id',userStore.state.user.id);
        fromdata.append('role',userStore.state.user.role);
        fromdata.append('hash',h);
        fromdata.append('file',blob);
        const {data} = await myAxios({
            method:'POST',
            url:'/webapi/headimg',
            data:fromdata,
            headers: {
                'Content-Type':'multipart/form-data'
            }
        });
        ElMessage({message:data.msg,type:data.type})
        if(data.code === 200){
            userStore.commit('updateUser',data.data);
            src.value = 'http://127.0.0.1:3002/head?headImg='+userStore.state.user.headImg;
        }
    }
}

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
            height: 20%;
            margin-top: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
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
                overflow: hidden;

                .img::after{
                    content: '点击上传头像';
                    display: flex;
                    align-items: center;
                    justify-content: center;                   
                    width:inherit;
                    height: inherit;
                    background-color: rgba(0, 0, 0, 0.5);
                    position: absolute;
                    top:0;
                    font-size: 1.25rem;
                    transition: transform .2s, font-size .1s;
                    overflow: hidden;
                    transform: scale(0)
                }

                &:hover{
                    cursor: pointer;
                    &::after{
                        transform: scale(1)
                    }
                }
                &:active{
                    &::after{
                        font-size: small;
                    }
                }
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