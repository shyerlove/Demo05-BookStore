<template>
  <div :class="isLogin ? 'loginForm' : 'signForm'">
    <el-form 
      class="form" 
      v-show="isLogin" 
      :rules="rule.loginRule" 
      :model="loginForm"
      ref="loginRef"
    >
      <el-form-item prop="username" class="form_item">
        <el-input class="inp" type="text" placeholder="用户名" v-model="loginForm.username" prefix-icon="User" clearable />
      </el-form-item>
      <el-form-item prop="password" class="form_item">
        <el-input class="inp" type="password" placeholder="密码" v-model="loginForm.password" prefix-icon="Lock" clearable
          show-password @keyup.enter="login(loginRef)" />
      </el-form-item>
      <el-button @click="login(loginRef)">登录</el-button>
      <div class="bottom">
        <a @click="forget">忘记密码</a>
        <a @click="tabLogin">没有账号？点击注册</a>
      </div>
    </el-form>

    <el-form 
      class="form" 
      v-show="!isLogin" 
      :rules="rule.signRule" 
      :model="signForm"
      ref="signRef"
    >
      <el-form-item prop="realname" class="form_item">
        <el-input class="inp" type="text" placeholder="真实姓名" v-model="signForm.realname" prefix-icon="User" clearable />
      </el-form-item>
      <el-form-item prop="username" class="form_item">
        <el-input class="inp" type="text" placeholder="用户名" v-model="signForm.username" prefix-icon="User" clearable />
      </el-form-item>
      <el-form-item prop="password" class="form_item">
        <el-input class="inp" type="password" placeholder="密码" v-model="signForm.password" prefix-icon="Lock" clearable show-password />
      </el-form-item>
      <el-form-item prop="phone" class="form_item">
        <el-input class="inp" type="phone" placeholder="手机号" v-model="signForm.phone" prefix-icon="Iphone" clearable />
      </el-form-item>
      <el-form-item prop="site" class="form_item">
        <el-input class="inp" type="text" placeholder="家庭住址" v-model="signForm.site" prefix-icon="Location" clearable />
      </el-form-item>
      <div class="radio">
        <el-form-item prop="sex" class="form_item">
          <el-radio-group v-model="signForm.sex" class="ml-4">
            <el-radio-button :value="1" style="color:white;">男</el-radio-button>
            <el-radio-button :value="0" style="color:white;">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="identity" class="form_item">
          <el-radio-group v-model="signForm.identity" class="ml-4" style="position: absolute;right:0">
            <el-radio-button :value="1" style="color:white;">普通用户</el-radio-button>
            <el-radio-button :value="0" style="color:white;">管理员</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-button @click="sign(signRef)">注册</el-button>
      <div class="bottom">
        <a @click="forget">忘记密码</a>
        <a @click="tabLogin">已有账号？点击登录</a>
      </div>
    </el-form>
  </div>
</template>

<script setup name="loginForm" lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import { ref, reactive } from "vue";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import myAxios from "@/use/myAxios";
type loginForm = {
  username: string;
  password: string;
}
type signForm = {
  realname: string;
  username: string;
  sex: 0 | 1;
  password: string;
  phone: string;
  site: string;
  identity: 0 | 1;
}
const userStore = useStore();

// 创建路由对象
const router = useRouter();
// 登录表单dom
const loginRef = ref();
// 注册表单dom
const signRef = ref();
// 声明表单状态 登录：true 注册：false
let isLogin = ref<boolean>(true);
// 登录表单数据
const loginForm = reactive<loginForm>({
  username: "",
  password: "",
});
// 注册表单数据
const signForm = reactive<signForm>({
  realname: "",
  username: "",
  sex: 1,
  password: "",
  phone: "",
  site: "",
  identity: 1,
});
// 表单验证规则
const rule = reactive({
  loginRule: {
    username: [
      { required: true, message: "用户名不能为空", trigger: "blur" },
      { required: true, min: 2, max: 10, message: "用户名长度为2-10", trigger: "blur" },
    ],
    password: [
      { required: true, min: 4, max: 12, message: "密码长度为4-12", trigger: "blur" },
    ],
  },
  signRule: {
    realname: [
      { required: true, message: "真实姓名不能为空", trigger: "blur" },
      {min:2,message:'姓名长度至少为2', trigger: "blur" },
    ],
    username: [
      { required: true, min: 2, max: 10, message: "用户名不能为空", trigger: "blur" },
      {min: 2, max: 10, message: "用户名长度为2-10", trigger: "blur"}
    ],
    password: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { required: true, min: 4, max: 12, message: "密码长度为4-12", trigger: "blur" },
    ],
    phone: [
      { required: true, message: "手机号不能为空", trigger: "blur" },
      { required: true, min: 11, max: 11, message: "请输入手机号", trigger: "blur" },
    ],
    site: [
      { required: true, message: "请输入家庭住址", trigger: "blur" },
    ],
  }
})

/* 切换登录/注册 */
const tabLogin = () => {
  // 清空数据
  if (isLogin.value) {
    loginForm.username = "";
    loginForm.password = "";
  } else {
    signForm.username = "";
    signForm.password = "";
    signForm.phone = "";
    signForm.identity = 0;
  }
  // 切换登录/注册
  isLogin.value = !isLogin.value;
};

/* 忘记密码 */
const forget = () => {
  /* 跳转到忘记密码页面 */
  router.push('/forget');
}
/* 登录 */
const login = async (loginDOM:FormInstance) => {
  await loginDOM.validate((valid) => {
    if (!valid) {
      return ;
    } 
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
        userStore.commit('initUser', user);

        // 提示登录成功
        ElMessage({
          message: "登录成功，欢迎回来",
          type: "success",
        });
        //判断用户是管理员还是用户
        if (user.role === 0) {
          router.push("/man");
        } else {
          router.push("/show");
          userStore.dispatch('initOrder');
        }
      } else {
        ElMessage({
          message: "账号或密码错误!",
          type: "warning",
        });
      }
    })
    .catch(() => {
      ElMessage({
        message: "请检查网络连接...",
        type: "warning",
      });
    });
  })  
};

/* 注册 */
const sign = async (signDOM:FormInstance) => {
  // 验证表单合法性
  await signDOM.validate((valid) => {
    if (!valid) {
      return ;
    } 
  // 发送注册请求
  myAxios({
    method: "POST",
    url: "/webapi/sign",
    data: signForm,
  })
    .then(res => {
      if (res.data.code === 200) {
        // 提示注册成功
        ElMessage({
          message: "注册成功，请前往登录",
          type: "success",
        });
        // 切换到登录页
        tabLogin();
      } else {
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
  })
}
</script>

<style lang="scss" scoped>
.loginForm,
.signForm {
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
    transition: all .2s;

    .form_item {
      width: 90%;
      height: 15%;
    }

    .inp,
    button {
      height: 100%;
      background-color: transparent;
      border-radius: 3px;
      transition: all 0.2s;
      color: $blue;
    }

    button {
      width: 90%;
      height: 15%;
      border: 1px solid white;
      color: white;
    }


    .radio {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .form_item{
        width:50%;
        height: 100%;
      }
    }

    .bottom {
      width: 90%;
      height: 10%;
      display: flex;
      justify-content: space-between;
    }

    a {
      color: white;
      transition: all .3s;
    }


    button:hover {
      cursor: pointer;
      background-color: $blue;
      border-color: $blue;
      color: white;
    }

    .inp {
      & :nth-child(n) {
        color: white;
      }
    }

    a:hover {
      cursor: pointer;
      color: $blue;
    }
  }
}

.signForm {
  height: 70vh;
  top: 20vh;

  .form {
    .form_item {
      width: 90%;
      height: 8%;

      .inp {
        height: 100%;
      }
      }
    button {
      height: 10%;
    }




  }
}
</style>