<template>
  <div class="login-container">
    <div class="login-box">
      <h3 class="login-title">小U商城后管理系统</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <!-- prop:指定错误消息的显示位置 -->
        <el-form-item prop="username">
          <el-input
            type="text"
            placeholder="请输入登录账号"
            v-model="ruleForm.username"
            autocomplete="off"
          >
            <template slot="prepend">
              <i class="el-icon-user-solid"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            show-password
            v-model="ruleForm.password"
            autocomplete="off"
          >
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="btn-login"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      //表单校验规则
      rules: {
        username: {
          required: true,
          message: "请输入登录账号",
          trigger: "blur",
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    //validate:进行终极表单校验
    //valid 系统形参   true:表单校验通过  false:校验不通过
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          this.$http.post("/userlogin", this.ruleForm).then((res) => {
            console.log(res, "1111");
            if (res.code == 200) {
              // 1.将用户相关信息存储到localStorage中
              localStorage.setItem("loginInfo",JSON.stringify(res.list));
              // 2.给出成功提示
              this.$success(res.msg);
              //3.跳转到管理中心
              this.$router.push("/");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  background: url("../assets/images/loginbg.jpg");
  block-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 4px;
  padding: 0 30px;
}
.login-title {
  text-align: center;
  color: #409eff;
  margin-top: 40px;
  margin-bottom: 30px;
}
.btn-login {
  width: 100%;
}
</style>