'use strict';

const Service = require('egg').Service;
const Sequelize=require("sequelize");
const Op = Sequelize.Op
class AdminLoginService extends Service {
  async login(info) {
    const ctx=this.ctx
    //  访问用户数据库，查询用户信息
    let user = await ctx.app.model.User.findAll({
        attributes: {},
        where: {
          user_email: info.user_email,
          user_password: info.user_password
        }
      })
      return user
  }
  

  // 验证用户手机号和邮箱是否存在
  async verify2(regInfo){

    const {ctx}=this;

    let usersInfo=await ctx.app.model.User.findAll({
      where:{
        [Op.or]:[
          {user_email:regInfo.user_email},
          {user_phone:regInfo.user_phone}
        ]
      }
    })
    return usersInfo
  }

  /* 
    插入用户信息
  */

  async register(userInfo){
    const {ctx}=this
    await ctx.app.model.User.create({
      user_name:userInfo.user_name,
      user_password:userInfo.user_password,
      user_email:userInfo.user_email,
      user_phone:userInfo.user_phone
    })
   return 0
  }
}

module.exports = AdminLoginService;
