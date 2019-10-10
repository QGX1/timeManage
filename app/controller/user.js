'use strict';
//author：黄昌壹

//后台管理操作用户的controller，包含增删查改
const Controller = require('egg').Controller;

class UserController extends Controller {
  //获取用户信息
  async getInfo() {
    const ctx = this.ctx;
    const usersInfo = await this.service.user.getInfo();
    ctx.body = {
      usersInfo: usersInfo,
    };
    ctx.status = 200;
  }
  //删除用户
  async deleteUser() {
    const ctx = this.ctx;
    const info = ctx.request.body.formInfo;
    // 删除用户表
    const code = await this.service.user.deleteUser(info);
    ctx.body = {};
    ctx.status = 200;
  }
  //增加用户
  async AddUser(){
      const ctx = this.ctx;
      const info = ctx.request.body.formInfo;
      console.log(info);
      let code = await this.service.user.AddUser(info);
      console.log(code);

      ctx.body = {
        // 返回给前端
      };
      ctx.status = 200;
  };
  //更新用户信息
  async EditUser(){
    const ctx = this.ctx;
    const info = ctx.request.body.formInfo;
    const code = await this.service.user.EditUser(info);
    console.log(code);
    ctx.body = {};
    ctx.status = 200;
  }
}

module.exports = UserController;
