'use strict';

const Controller = require('egg').Controller;
const users={};
const md5=require("blueimp-md5")
// 获取图形验证码
class CodeController extends Controller {
  async verify() {
    const {ctx}=this;
    let captcha=await this.service.tools.captcha();//服务器里面的方法
    ctx.response.type='image/svg+xml';//指定返回的类型content-type
    console.log(22222)
    console.log(this.ctx.session)
    ctx.body=captcha.data;//返回一张图片
  }
  /* 
    获取用户短信验证码
  */
  async phoneCode(){
    const {ctx}=this;
    const user_phone=ctx.request.body.user_phone;
    const code=await this.service.tools.randomCode(6);//生成6位数的随机验证码
    console.log(code)
    console.log('验证码')
    // 将验证码发送到手机
   await this.service.tools.sendCode(user_phone,code,function(success){
     if(success){
       users[user_phone]=code;//存储验证码
       console.log(users)
     }else{
       console.log("发送失败")
       users[user_phone]=''
       console.log(users)
     }
   })
    return ctx.body={
      code:0,
      msg:users[user_phone]
    }
  }

  /* 
    用户注册
  */

  async register(){

    const {ctx}=this;
    const user_name = ctx.request.body.user_name;//用户名
    const user_password= md5(ctx.request.body.user_password);//密码
    const user_email= ctx.request.body.user_email;//用户邮箱
    const user_phone=ctx.request.body.user_phone;//用户电话号码
    const phone_code=ctx.request.body.phone_code;//信息验证码
    console.log(user_name+"/"+user_password+"/")
    //1. 验证用户手机验证码
    console.log(users[user_phone])
    console.log(phone_code)
    if(users[user_phone]!=phone_code){
      ctx.body={
        code:1,
        msg:"验证码不正确"
      };
      return
    }else{
      // 删除保存的phone_code
        delete users[phone_code];
        //2. 验证用户手机号码\邮箱是否存在
        let usersInfo={
          user_name,
          user_password,
          user_email,
          user_phone
        }
        let user=await this.service.adminLogin.verify2(usersInfo);

      if(user.length!=0){
        return ctx.body={
          code:1,
          msg:"用户邮箱或电话号码已存在，请登录"
        };
      }else{
        //4.用户信息插入数据库
        let reg=await this.service.adminLogin.register(usersInfo)
        return ctx.body={
          code:0,
          msg:"注册成功"
        }
      }
    }
  }
}

module.exports = CodeController;
