<template>
  <div class="loginForm">
    <div class="form" v-if="isLogin">
      <input
        type="text"
        placeholder="用户名"
        v-model="loginForm.username"
      />
      <input
        type="password"
        placeholder="密码"
        v-model="loginForm.password"
      />
      <button @click="login">登录</button>
      <a @click="tabLogin">没有账号？点击注册</a>
    </div>
    <div class="form" v-if="!isLogin">
      <input
        type="text"
        placeholder="用户名"
        v-model="signForm.username"
      />
      <input
        type="password"
        placeholder="密码"
        v-model="signForm.password"
      />
      <input
        type="phone"
        placeholder="手机号"
        v-model="signForm.phone"
      />
      <el-radio-group v-model="signForm.identity" class="ml-4" size="small">
        <el-radio :value="1" border style="color:white">普通用户</el-radio>
        <el-radio :value="0" border style="color:white">管理员</el-radio>
      </el-radio-group>
      <button @click="sign">注册</button>
      <a @click="tabLogin">已有账号？点击登录</a>
    </div>
  </div>
</template>

<script setup name="loginForm" lang="ts">
import { ElMessage } from "element-plus";
import { ref, reactive} from "vue";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import myAxios from "@/use/myAxios";
type loginForm = {
  username: string;
  password: string;
}
type signForm = {
  username: string;
  password: string;
  phone: string;
  identity: number;
}
const userStore = useStore();

// 创建路由对象
const router = useRouter();
// 声明表单状态 登录：true 注册：false
let isLogin = ref<boolean>(true);
// 登录表单数据
const loginForm = reactive<loginForm>({
    username: "",
    password: "",
});
// 注册表单数据
const signForm = reactive<signForm>({
    username: "",
    password: "",
    phone: "",
    identity: 0
});

/* 切换登录/注册 */
const tabLogin = () => {
    // 清空数据
    if(isLogin.value){
        loginForm.username = "";
        loginForm.password = "";
    }else{
        signForm.username = "";
        signForm.password = "";
        signForm.phone = "";
        signForm.identity = 0;
    }
    // 切换登录/注册
    isLogin.value = !isLogin.value;
};
/* 登录 */
const login = () => {
  myAxios({
    method: "POST",
    url: "/webapi/login",
    params: loginForm,
  })
    .then((res) => {
      if (res.data.code === 200) {
        // 获取token
        const user = res.data.data;
        // 存放在本地存储中
        sessionStorage.setItem("user", JSON.stringify(user));
        // 初始化store
        userStore.commit('initUser',user);
        
        // 提示登录成功
        ElMessage({
          message: "登录成功，欢迎回来",
          type: "success",
        });
        //判断用户是管理员还是用户
        user.role === 0 ? router.push("/man") : router.push("/show");
      } else {
        ElMessage({
          message: "账号或密码错误!",
          type: "warning",
        });
      }
    })
    .catch((err) => {
      ElMessage({
        message: "请检查网络连接...",
        type: "warning",
      });
    });
};

/* 注册 */
const sign = () => {
    myAxios({
        method: "POST",
        url: "/webapi/sign",
        params: signForm,
    })
    .then(res => {
        if(res.data.code === 200){
            // 提示注册成功
            ElMessage({
                message: "注册成功，请前往登录",
                type: "success",
            });
            // 切换到登录页
            tabLogin();
        }else{
            // 提示注册失败
            ElMessage({
                message: "注册失败，请重新注册",
                type: "warning",
            });
        }
    })
    .catch(err => {
        ElMessage({
            message: "请检查网络连接...",
            type: "warning",
        });
    })
}
</script>

<style lang="scss" scoped>
.loginForm {
  width: 40vw;
  height: 40vh;
  position: absolute;
  top: 30vh;
  left: 30vw;
  z-index: 999;

  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    input,
    button {
      width: 90%;
      height: 15%;
      background-color: transparent;
      border: 1px solid $blueplus;
      border-radius: 3px;
      transition: all 0.2s;
      color: $blue;
    }

    input {
      text-indent: 1vw;
      color: white;
    }

    a {
      color: $blue;
    }

    input:focus {
      border-color: $blue;
    }

    button:hover {
      cursor: pointer;
      background-color: $blue;
      color: white;
    }

    a:hover {
      cursor: pointer;
      color: white;
    }
  }
}
</style>