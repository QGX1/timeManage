"use strict";
//author:黄昌壹

//请求管理员数据;
const Controller = require("egg").Controller;

class AdminInfoController extends Controller {
  async index() {
    console.log("请求管理员数据");
    const ctx = this.ctx;
    //联表（角色表和用户表）查询角色为管理员的用户信息
    let adminInfo = await ctx.app.model.UserRole.findAll({
      // raw: true,
      where: {
        role_id: 2
      },
      include: [
        {
          model: ctx.app.model.User,
          attributes: { exclude: ["created_at",'updated_at'] },
          where: {
            user_id: this.app.Sequelize.col("user_role.user_id")
          }
        }
      ]
    });
    ctx.body = {
      // 返回给前端
      adminInfo: adminInfo
    };
    ctx.status = 200; // 状态码 200
  }
}

module.exports = AdminInfoController;
