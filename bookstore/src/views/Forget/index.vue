<template>
    <div class="forget" >
        <el-form 
            ref="forgetFormRef"
            :model="form"
            :rules="rules"
            label-width="120px"
            class="forget_form"
            status-icon
            show-message
            v-show="!isRemember"
        >
            <el-form-item label="姓名" prop="name" >
                <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="用户名"  prop="userName">
                <el-input v-model="form.userName" />
            </el-form-item>
            <el-form-item label="密码"  prop="password1">
                <el-input type="password" v-model="form.password1" />
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
                <el-input type="password" v-model="form.password2"  />
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
                <el-input v-model="form.phone"  />
            </el-form-item>
            <el-button type="primary" @click="submitForm(forgetFormRef)">确认修改</el-button>
            <el-button type="warning" style="margin-right: 10px;" @click="backLogin">返回</el-button>
        </el-form>
        <div class="title" v-show="isRemember">
            <h1>{{h1.s}}秒后跳转至登录页{{ h1.str }}</h1>
            <a @click="goLogin">直接跳转登录页</a>
        </div>
    </div>
    
</template>

<script setup name="forget" lang="ts">
import myAxios from '@/use/myAxios';
import { ElMessage } from 'element-plus';
import { onMounted, reactive,ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {useStore} from 'vuex'
// 路由实例
const router = useRouter();
// store
const store = useStore();
// 表单dom
const forgetFormRef = ref() ;
// 表单数据
const form = reactive({
    name:'',
    userName:'',
    password1:'',
    password2:'',
    phone:'',
})
onMounted(() => {    
    // 判断用户是否登录状态，初始化当前用户数据
    if(store.state.user){
        form.userName = store.state.user.username ;
        form.phone = store.state.user.phone ;
        form.name = store.state.user.realname;
    }
})
// 是否注册成功
const isRemember = ref<boolean>(false);
// 注册成功后的提示信息
const h1 = reactive({
    s:10,
    str:'',
});

// 表单验证
const sameRule = (rule:any,value:String,callback:Function) => {
    if(form.password1 === value){
        callback() ;
    }else{
        callback(new Error('两次密码必须相同')) ;
    }
}
/* 表单规则 */
const rules = {
    name:[
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, message: '长度至少为2',trigger: 'blur' },
    ],
    userName:[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 6, message: '用户名长度在2-6之间', trigger: 'blur' },
    ],
    password1:[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度在6-12之间', trigger: 'blur' },
    ],
    password2:[
        { required: true, message: '请确认密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度在6-12之间', trigger: 'blur' },
        {validator: sameRule,message:'两次密码必须相同', trigger: 'blur' },
    ],
    phone:[
        { required: true, message: '请输入电话号码', trigger: 'blur' },
    ]
}


const submitForm = (forgetFormRef:any) => {
    forgetFormRef.validate(async (valid:any) => {
        if(valid){
            const {data} = await myAxios({
                url:'/webapi/forget',
                method:'post',
                data:{
                    userName:form.userName,
                    password:form.password1,
                    phone:form.phone,
                },
            })
            if(data.code == 200){
                ElMessage({
                    message: "修改成功",
                    type: "success",
                });
                isRemember.value = true ;
            }else{
                ElMessage({
                    message: "用户不存在",
                    type: "warning",
                });
            }
        }else{
            ElMessage({
                message: "修改失败",
                type: "warning",
            });
        }
  })
}
// 注册成功跳转函数
const backLogin = () => {
    store.state.user ? router.push('/show/my') : router.push('/login') ;
}
// 定时器
let Interval: NodeJS.Timeout;
// 定义n秒后跳转
watch(isRemember,(newVal)=>{
    if(newVal){
        Interval = setInterval(()=>{
            h1.s -- ;
            h1.str += '.';
            if(h1.str.length > 3){
                h1.str = '' ;
            }
            if(h1.s == 0){
                clearInterval(Interval) ;
                router.push('/login') ;
                return ;
            }
        },1000) ;
    }
})
// 直接跳转至登录页
const goLogin = () => {
    clearInterval(Interval) ;
    router.push('/login') ;
}

</script>

<style scoped lang="scss">
.forget{
    width:100vw;
    height: 100vh;
    background-color: #d9ecff;
    display: flex;
    justify-content: center;
    align-items: center;

    .forget_form{
        width:50vw ;
        height: auto;
        padding:50px;
        background-color: #ecf5ff;
        border-radius: 10px;
        box-shadow: 2px 2px 10px #8dbded;
        button{
            float:right;
        }
    }

    .title{
        width:50vw ;
        height: auto;
        padding: 20px 0;
        background-color: #ecf5ff;
        border-radius: 10px;
        box-shadow: 2px 2px 10px #8dbded;
        transition: all 0.2s;
        align-self:flex-start;
        margin-top: 100px;

        h1{
            text-align: center;
            color:$blue;
        }
        a{
            display: block;
            text-align: center;
            margin-top: 10px;
            color:$blueplus;
            &:hover{
                cursor: pointer;
                color: $blue;
            }
        }
    }
}

</style>