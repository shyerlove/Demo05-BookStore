<template>
    <div class="manuser">
        <div class="search">
            <!-- 搜索框 -->
            <el-input 
                v-model="search"
                size="small" 
                class="search_inp" 
                placeholder="请输入关键字..."
                @keyup.enter="HandleSearch" 
            />
            <!-- 条件搜索 -->
            <el-radio-group v-model="radio1" size="small" class="search_radio" @change="HandleSearch">
                <el-radio-button label="全部" />
                <el-radio-button label="仅管理员" />
                <el-radio-button label="仅用户" />
                <el-radio-button label="仅商家" />
            </el-radio-group>
        </div>
        <!-- 表格 -->
        <el-table 
            :data="obj.filterData" 
            empty-text="暂无数据..."
            :row-style="rowStyle"
            class="user_list"
        >
            <el-table-column type="expand">
                <template #default="props">
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
                                <span v-if="props.row.role == '管理员'">性别: {{ props.row.sex }}</span>
                                <span v-if="props.row.role == '用户'">收货地址: {{ props.row.site }}</span>
                                <span v-if="props.row.role == '商家'">发货地址: {{ props.row.site }}</span>
                            </p>
                        </div>
                        <div class="right0" v-if="props.row.role == '管理员'">
                            <el-button type="primary">编辑</el-button>
                            <el-button type="danger" @click="delAdmin(props.row)">删除</el-button>
                        </div>
                        <div class="right1" v-if="props.row.role == '用户'">
                            <el-button :type="props.row.isBlack ? 'danger' : 'success'" @click="addBlackList(props.row)">
                                {{ props.row.isBlack ? '加入黑名单' : '移出黑名单' }}
                            </el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="ID" prop="id" />
            <el-table-column label="状态">
                <template #default="props">
                    <el-icon >
                        <CircleCheckFilled v-if="props.row.isBlack" color="#67C23A"/>
                        <CircleCloseFilled v-if="!props.row.isBlack" color="#F56C6C"/>
                    </el-icon>
                </template>
            </el-table-column>
            <el-table-column label="用户名" prop="username" />
            <el-table-column label="身份">
                <template #default="props">
                    <el-tag v-if="props.row.role === '用户'" :type="!props.row.isBlack  ? 'danger' : 'success'">
                        {{ props.row.role }}
                    </el-tag>
                    <el-tag v-if="props.row.role === '管理员'" type="primary">
                        {{ props.row.role }}
                    </el-tag>
                    <el-tag v-if="props.row.role === '商家'" type="warning">
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ADMIN_PASSWORD } from '@/utils/about'
const userStore = useStore();
let radio1 = ref<string>('全部');

const obj = reactive({
    userData: <Array<user>>[],
    filterData: <Array<user>>[]
})

// 行样式
const rowStyle = ({row}:{row:user}) => {
    if(!row.isBlack){
        return {
            'background-color': '#fef0f0',
            'text-decoration': 'line-through',
            }
    }else{
        return {
            'font-weight': 'bold'
        }
    }
}


const search = ref<string>('');
onMounted(() => {
    // 初始化数据
    main();
})

const main = async () => {
    const { data } = await myAxios.get('/webapi/users', { params: { id: userStore.state.user.id } });
    obj.userData = data.data;
    obj.filterData = obj.userData;
    
}
// 搜索
const HandleSearch = () => {
    switch (radio1.value) {
        case '全部':
            obj.filterData = obj.userData.filter(data => {
                return (
                    !search.value
                    || data.username.toLowerCase().includes(search.value.toLowerCase())
                    || data.id === +search.value
                );
            });
            break;
        case '仅管理员':
            obj.filterData = obj.userData.filter(data => {
                if (!search.value) {
                    return data.role === '管理员'
                } else {
                    return (
                        data.username.toLowerCase().includes(search.value.toLowerCase()) && data.role === '管理员'
                        || data.id === +search.value && data.role === '管理员'
                    )
                    ;
                }
            });
            break;
        case '仅用户':
            obj.filterData = obj.userData.filter(data => {
                if (!search.value) {
                    return data.role === '用户'
                } else {
                    return (
                        data.username.toLowerCase().includes(search.value.toLowerCase()) && data.role === '用户'
                        || data.id === +search.value && data.role === '用户'
                    );
                }
            });
            break;
        case '仅商家':
            obj.filterData = obj.userData.filter(data => {
                if (!search.value) {
                    return data.role === '商家'
                } else {
                    return (
                        data.username.toLowerCase().includes(search.value.toLowerCase()) && data.role === '用户'
                        || data.id === +search.value && data.role === '商家'
                    );
                }
            });
            break;
        default:
            break;
    }
}

/* 加入/移出 黑名单 */
const addBlackList = (item: user) => {
    ElMessageBox.prompt('请输入你的账号密码', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputType:'password',
        inputPattern: /^[a-zA-Z0-9]+$/,
        inputErrorMessage: '请输入登录密码',
    })
        .then(async ({ value }) => {
            if (value !== ADMIN_PASSWORD) {
                ElMessage({
                    message: '密码错误',
                    type: 'error'
                })
                return;
            }
            if (!item.isBlack) {
                const { data } = await myAxios.get('/webapi/blacklist', { params: { id: item.id, c: 1 } });
                if (data.code === 200) {
                    main();
                    ElMessage({
                        message: '移出黑名单成功',
                        type: 'success'
                    })
                } else {
                    ElMessage({
                        message: '移出黑名单失败',
                        type: 'error'
                    })
                }
            } else {
                const { data } = await myAxios.get('/webapi/blacklist', { params: { id: item.id, c: -1 } });
                if (data.code === 200) {
                    main();
                    ElMessage({
                        message: '加入黑名单成功',
                        type: 'success'
                    })
                } else {
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

/* 删除管理员 */
const delAdmin = (item: user) => {
    ElMessageBox.prompt('超级管理员密码', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9]+$/,
        inputErrorMessage: '请输入超级管理员密码',
    })
        .then(async ({ value }) => {
            if (value !== ADMIN_PASSWORD) {
                ElMessage({
                    message: '密码错误',
                    type: 'error'
                })
                return;
            }
            const { data } = await myAxios.get('/webapi/admin', { params: { id: item.id } });
            if (data.code === 200) {
                // 提示删除删除成功
                ElMessage({
                    message: '删除成功！',
                    type: 'success'
                })
                // 重新渲染页面
                main();
            } else {
                ElMessage({
                    message: '删除失败',
                    type: 'warning'
                })
            }
        })
        .catch(e => {
            console.log(e);
        })
}
</script>

<style lang="scss" scoped>
.manuser {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 90vh;

    .search {
        width: 70%;
        height: 10vh;
        display: flex;
        align-items: center;
        padding: 0 2vw;
        background-color: white;
        border-radius: 5px;

        .search_inp {
            width: 60%;
            height: 4vh;
        }

        .search_btn {
            margin-left: 2vw;
            height: calc(4vh + 2px);
        }

        .search_radio {
            margin-left: 1vw;

            .el-radio-button__inner {
                height: calc(4vh + 2px);
            }
        }
    }

    .user_list {
        width: 70%;
        height: 75vh;
        overflow-y: auto;
        border-radius: 5px;

        .show_msg {
            display: flex;
            padding: 0 3vw;

            .left {
                width: 20%;

                img {
                    width: 80px;
                    height: 80px;
                    border-radius: 5px;
                }
            }

            .center {
                width: 60%;
                margin-left: 3vw;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                p {
                    width: 100%;
                    display: flex;

                    span {
                        display: block;
                        width: 50%;
                        overflow: hidden;
                        text-wrap: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }

            .right0,
            .right1 {
                width: 20%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;

                button {
                    margin: 0;
                }
            }

            .right1 {
                justify-content: center
            }
        }
    }
    .isBlack{background-color: blue;}
}
</style>