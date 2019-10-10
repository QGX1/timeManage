// 用户登录（丘桂娴）
"use strict";

const Controller = require("egg").Controller;
const jwt = require("jsonwebtoken");
// 前后端分离，token框架

class LoginController extends Controller {
  async index() {
    const ctx = this.ctx;
    //在数据库中验证用户信息，获取用户id
    let user_email = ctx.request.body.user_email;
    let user_password = ctx.request.body.user_password;

    // 访问用户数据库，查询用户信息，返回token(丘桂娴)
    let user1 = await ctx.app.model.User.findAll({
      attributes: {},
      where: {
        user_email: user_email,
        user_password: userpassword
      }
    });
    if (user1.length == 0) {
      ctx.body={
        code:0,
        err:'登录出错，请检查用户名和密码'
      }
      ctx.status = 200; // 返回给前端
    } else {
      let user2 = await ctx.app.model.User.findOne({
        where: {
          user_email: user_email,
          user_password: userpassword
        }
      })
        .then(res => {
          return Promise.all([
            ctx.app.model.UserRole.findOne({
              where: {
                user_id: res.user_id
              }
            })
          ]);
        })
        .catch(err => {
          console.error(err);
        });
      console.log(user2.role_id + "登录用户身份");
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
          expiresIn: "600s" // 过期时间
        }
      );

      ctx.body = {
        user: user2, // 返回给前端
        token: token,
        user_id: user1[0].user_id,
        email: user1[0].email
      };
      ctx.status = 200; // 状态码 200
    }
  }
}

module.exports = LoginController;
