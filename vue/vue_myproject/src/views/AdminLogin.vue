<!--autor:刘炽辉-->  <!--后台管理登录页面-->  
<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2" 
            status-icon ref="ruleForm2" 
            label-position="left" 
            label-width="0px" 
            class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off"  placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  inject: ["reload"],
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: "",
        password: ""
      },
      rules2: {
        username: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "enter your password", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(event) {//添加表单信息（黄昌壹）
      var self = this;
      self.$refs.ruleForm2.validate(valid => {
        if (valid) {
          self.logining = true;
          
          //登陆成功后跳转到主页面
          try {
            self.$store
              .dispatch("toAdminLogin", {//管理员登录（黄昌壹）
                adminLoginUser: self.ruleForm2.username,
                adminLoginPassword: self.ruleForm2.password
              })
              .then(res => {
                var num = res.data.user;
                self.$store.commit('getNum',num);
                if (num == 3) {//判断登陆者角色，用户不能登录后台管理
                  self.$router.push({
                    path: "/adminlogin"
                    //   query: { num: num }
                  });
                  this.reload(); //重载页面实现数据更新
                } else {
                  let redirectUrl = decodeURIComponent(
                    self.$route.query.redirect || "/admin"
                  );
                  // 跳转到指定的路由
                  self.$router.push({
                    path: redirectUrl,
                    // query: { num: num }
                  });
                }
              });
          } catch (error) {
            console.log("login error!");
            //self.$router.push({path:'*'});
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
.title{
  border-bottom: 0px !important;
}
</style>
