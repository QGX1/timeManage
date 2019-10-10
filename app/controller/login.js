// 用户登录（丘桂娴）
"use strict";

const Controller = require("egg").Controller;
const jwt = require("jsonwebtoken");
const md5 = require('blueimp-md5');//引入加密包

// 前后端分离，token框架

class LoginController extends Controller {
  
  // 获取验证码
  async verify() {
    const {ctx}=this;
    let getCode=await this.service.tools.captcha();//服务器里面的方法
    ctx.response.type='image/svg+xml';//知道你返回的类型content-type
    console.log(5555) 
    console.log(getCode.sessionCode)
    // this.verify=getCode.sessionCode;
    ctx.session.code=getCode.sessionCode
    ctx.body=getCode.captcha.data;
  }//返回一张图片
 
  async index() {
      const {ctx} = this;
      //在数据库中验证用户信息，获取用户id
      console.log(ctx.request.body)
      let user_email = ctx.request.body.user_email;
      let user_password = md5(ctx.request.body.user_password);//对用户密码进行加密
      let captcha = ctx.request.body.captcha.toLowerCase();//验证码,全部小写
      let headersCC = ctx.session.code;//获得session中的验证码
      console.log(headersCC, "查看token的内容");      
      console.log(captcha)
      console.log(this.ctx.session)
      // 对用户输入的验证码进行校验，如果验证码错误，返回错误信息
      if (captcha !== ctx.session.code) {
        
        return ctx.body = {
          code: 1,
          msg: "验证码不正确"
        }
      }else{
        delete ctx.session.code;//删除服务端缓存的验证码
        const info = {
          user_email,
          user_password
        }
        // 查询用户信息是否存在
        let userInfo = await this.service.adminLogin.login(info);
        console.log(userInfo)
        if (userInfo) {
          /*
          把用户信息加密成 token 
          */
          const token = jwt.sign(
            {
              user_email: ctx.query.user_email, // user_id
              user_password: ctx.query.userpassword
            },
            "hrmyproject2019",
            {
              // 秘钥
              expiresIn: "604800s",// 有效时间限定7天，单位为s
            }
          );
  
          ctx.body = {
            code: 0,
            token: token,
          };
          ctx.status = 200; // 状态码 200
      } else {
        return ctx.body = {
          code: 1,
          msg: '登录出错，请检查用邮箱和密码'
        }
      }
    }  
  }
}

module.exports = LoginController;