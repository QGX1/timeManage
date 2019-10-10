<template>
    <div class="login_content">
        <div class="register_form">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item  prop="user_name">
                    <el-input type="text" v-model="ruleForm.user_name" placeholder="用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="user_password">
                    <el-input type="password" v-model="ruleForm.user_password" placeholder="密码不少于6个字符"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="check_user_password">
                    <el-input type="password" v-model="ruleForm.check_user_password" placeholder="确认密码"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="user_email">
                    <el-input type="text" v-model="ruleForm.user_email" placeholder="邮箱"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="user_phone" class="user_phone">
                    <el-input type="text" v-model="ruleForm.user_phone" placeholder="联系电话"  ></el-input>
                    <button class="get_verification"
                        :class="{right_phone_number:rightPhoneNumber}"
                        @click.prevent="getVerifyCode"
                         >{{computedTime>0?`已发送(${computedTime})s`:'获取验证码'}}</button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() { 
        // 验证用户名
        var check_user_name=(rule,value,callback)=>{
            if(value===''){
                return callback(new Error('输入用户名'));
            }else{
                callback()
            }
        }
        // 验证用户邮箱
        var check_user_email = (rule, value, callback) => {
            let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!value) {
                return callback(new Error('邮箱不能为空'));
            }else if(!reg.test(value)){
                return callback(new Error('邮箱错误'));
            }else{
                callback();
            }
        };
        // 验证用户输入手机号码是否规范
        var check_user_phone = (rule, value, callback) => {
            let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (!value) {
                return callback(new Error('联系电话不能为空'));
            }else if(!phoneReg.test(value)){
                return callback(new Error('联系电话错误'));
            }else{
                callback();
            }
        };
        //  验证用户输入密码
        var validate_user_password = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不少于6个字符'));
            } else {
            if (this.ruleForm.check_user_password !== '') {
                this.$refs.ruleForm.validateField('check_user_password');//部分表单校验，关联确认密码的输入，进行两个密码的验证
            }
                callback();
            }
        };
        var validate_check_user_password = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.user_password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
      return {
        ruleForm: {
          user_name: '',
          user_password: '',
          check_user_password: '',
          user_email:'',
          user_phone:''
        },
        // es6,验证表单变量，光标失去时，验证输入信息
        rules: {
            user_name:[
                {validator:check_user_name}
            ],
            user_password: [
                { validator: validate_user_password}
            ],
            check_user_password: [
                { validator: validate_check_user_password}
            ],
            user_email:[
                {validator:check_user_email}
            ],
            user_phone: [
                { validator: check_user_phone }
            ]
        },
        computedTime:0,
      };
    },
    computed: {
        // 判断手机号码
        rightPhoneNumber:function(){
            return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.ruleForm.user_phone);
        }
    },
    methods: {
      submitForm(formName) {
        console.log(123)
        // console.log(valid)
        console.log( this.$refs[formName])
        // 对整个表单进行校验,表单验证结果只有true或false
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid)
            // 向服务器发出注册请求,注册成功以后跳转到登录页面
            this.$emit("listenRegisterEvent",valid)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //   表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    //   获取短信验证码倒计时
        getVerifyCode(){
            // 如果当前没有计时
            if(!this.computedTime){
                this.computedTime=30
                const intervalId=setInterval(()=>{
                    this.computedTime--
                    if(this.computedTime==0){
                        clearInterval(intervalId)
                    }
                },1000)
                // 向后端发送请求，获取验证码
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .login_content
        width 100%
        height 100%
        text-align center
        margin 0 auto
        .register_form
            margin-top 10px
    /deep/ .el-input__suffix
        color: #57d419 !important;
    .user_phone 
        /deep/  .el-input__suffix
            color: #ffffff !important;
        /deep/  .el-input__validateIcon
            color #ffffff
     /deep/ .el-button--primary
        background-color: #4cd96f
        border-color: #4cd96f;
    .get_verification
        border 0px 
        float right 
        color #cccccc
        font-size 14px
        background transparent
        position relative
        margin-top -37px
        right 10px
        height 20px
        // transform translateY(-50%)//垂直居中
        &.right_phone_number
            color #000
</style>
