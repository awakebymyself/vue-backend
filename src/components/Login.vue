<template>
  <div class="login_container">
    <div class="login_box_test">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 表单  :model 定义表单数据对象, rules验证对象-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- 双向绑定 v-model -->
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        userName: "admin",
        password: "123456",
      },
      // 表单验证
      loginFormRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
      reset() {
        //  console.log(this)
        this.$refs.loginFormRef.resetFields()
      },
      login() {
            this.$refs.loginFormRef.validate(async pass => {
                console.log(pass)
                if(!pass) {
                    return;
                }
              const resp =  await this.$http.post('login', this.loginForm)
              console.log(resp.data)
              const result = resp.data
              if(!result.code == 200) {
                return this.$message.error("登录失败");
              }
              this.$message.success("登录成功");
              // 登录成功保存服务端token 到sessionstorage 当前会话有效
              window.sessionStorage.setItem("token",  result.msg);
              // 通过编程式导航跳转到指定页面
              this.$router.push('/home');

            })
      }
  }
};
</script>

<style lang="less" scoped>
/* // lang="less" 支持less格式
// scoped vue的指令，只在当前组件生效 */

.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box_test {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
}
.info {
  font-size: 13px;
  margin: 10px 15px;
}
</style>
