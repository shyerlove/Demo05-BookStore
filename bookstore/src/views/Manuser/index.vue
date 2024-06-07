<template>
    <div class="manuser">
        <div class="search">
            <el-input 
                v-model="search"
                size="small" 
                class="search_inp" 
                placeholder="请输入关键字..."
                @keyup.enter="HandleSearch"
            />            
            <el-button type="primary" class="search_btn" @click="HandleSearch">搜索</el-button>
            <el-radio-group v-model="radio1" size="small" class="search_radio" >
                <el-radio-button label="全部" />
                <el-radio-button label="仅管理员" />
                <el-radio-button label="仅用户"  />
            </el-radio-group>
        </div>
        <el-table 
            :data="obj.filterData" 
            class="user_list"
        >
            <el-table-column type="expand">
                <template #default="props" >
                    <div m="4" class="show_msg">
                        <div class="left">
                            <img src="/src/assets/img1.png">
                        </div>
                        <div class="center">
                            <p>
                                <span>ID: {{ props.row.id }}</span>
                                <span>身份: {{ props.row.role }}</span>
                                </p>
                                <p>
                                <span>姓名: {{ props.row.name }}</span>
                                <span>电话号码: {{ props.row.phone }}</span>
                                </p>
                                <p>
                                <span>用户名: {{ props.row.username }}</span>
                                <span v-if="props.row.sex">性别: {{ props.row.sex }}</span>
                                <span v-if="props.row.site">收货地址: {{ props.row.site }}</span>
                            </p>
                        </div>
                        <div class="right0" v-if="props.row.role=='管理员'">
                            <el-button type="primary" >编辑</el-button>
                            <el-button type="danger" >删除</el-button>
                        </div>
                        <div class="right1" v-if="props.row.role=='用户'">
                            <el-button 
                                :type="props.row.isBlack?'danger':'success'"
                                @click="addBlackList(props.row)"
                            >
                                {{props.row.isBlack?'加入黑名单':'移出黑名单'}}
                            </el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="ID" prop="id" />
            <el-table-column label="姓名" prop="name" />
            <el-table-column label="身份" >
                <template #default="props">
                    <el-tag :type="props.row.role === '用户' ? '' : 'success'">
                        {{ props.row.role }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script setup name="manuser" lang="ts">
import user from '@/types/user';
import myAxios from '@/use/myAxios';
import { ElMessage, ElMessageBox} from 'element-plus';
import { ref, computed, watch, reactive, onMounted} from 'vue' ;
import {useStore} from 'vuex';
import {ADMIN_PASSWORD} from '@/utils/about'
const userStore = useStore();
let radio1 = ref<string>('全部') ;

const obj = reactive({
    userData:<Array<user>>[],
    filterData:<Array<user>>[]
})

const search = ref<string>('') ;
onMounted(() => {
    main();
})

const main = async () => {
    const { data } = await myAxios.get('/webapi/users',{params:{id:userStore.state.user.id}});
    obj.userData = data.data ;
    obj.filterData = obj.userData ;
}

const HandleSearch = () => {
    switch (radio1.value) {
        case '全部':
            obj.filterData = obj.userData.filter(data => {
                return (
                   !search.value 
                    || data.name.toLowerCase().includes(search.value.toLowerCase())
                ) ;
            }) ;
            break;
        case '仅管理员':
        obj.filterData = obj.userData.filter(data => {
            if(!search.value){
                return data.role === '管理员'
            }else{
                return data.name.toLowerCase().includes(search.value.toLowerCase()) && data.role === '管理员' ;
            }
        }) ;
            break;
        case '仅用户':
        obj.filterData = obj.userData.filter(data => {
            if(!search.value){
                return data.role === '用户'
            }else{
                return data.name.toLowerCase().includes(search.value.toLowerCase()) && data.role === '用户' ;
            }
        }) ;
            break;
        default:
            break;
    }
}

/* 加入/移出 黑名单 */
const addBlackList = (item:user) => {
    ElMessageBox.prompt('请输入你的账号密码', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern:/^[a-zA-Z0-9]+$/,
    inputErrorMessage: '请输入登录密码',
  })
    .then(async ({value}) => {
        if(value !== ADMIN_PASSWORD){
            ElMessage({
                message: '密码错误',
                type: 'error'
            })
            return ;
        }
        if(!item.isBlack){
            const {data} = await myAxios.get('/webapi/blacklist',{params:{id:item.id,c:1}}) ;
            if(data.code === 200){
                main();
                ElMessage({
                    message: '移出黑名单成功',
                    type:'success'
                })
            }else{
                ElMessage({
                    message: '移出黑名单失败',
                    type: 'error'
                })
            }
        }else{
            const {data} = await myAxios.get('/webapi/blacklist',{params:{id:item.id,c:-1}}) ;
            if(data.code === 200){
                main();
                ElMessage({
                    message: '加入黑名单成功',
                    type:'success'
                })
            }else{
                ElMessage({
                    message: '移出黑名单失败',
                    type: 'error'
                })
            }
        }
    })
    .catch((e) => {
      console.log(e);
      
    })
    
}

</script>

<style lang="scss" scoped>
.manuser{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height:90vh;
    .search{
        width:70%;
        height: 10vh;
        display: flex;
        align-items: center;
        padding:0 2vw;
        background-color: white;
        border-radius: 5px;
        .search_inp {
            width:60%;
            height: 4vh;
            }
        .search_btn{
            margin-left: 2vw;
            height: calc(4vh + 2px);
        }
        .search_radio{
            margin-left: 1vw;
            .el-radio-button__inner{
                height: calc(4vh + 2px);
            }
        }
    }
    .user_list{
        width: 70%;
        height: 75vh;
        overflow-y: auto;
        border-radius: 5px;

        .show_msg{
            display: flex;
            padding:0 3vw ;
            .left{
                width:20%;
                img{
                    width:80px;
                    height: 80px;
                    border-radius: 5px;
                }
            }
            .center{
                width:60%;
                margin-left: 3vw;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                p{
                    width:100%;
                    display: flex;
                    span{
                        display: block;
                        width:50%;
                        overflow: hidden;
                        text-wrap: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
            .right0,
            .right1{
                width:20%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                button{
                    margin:0;
                }
            }
            .right1{
                justify-content: center
            }
        }
    }
    }
</style>