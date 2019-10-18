'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log("获取权限");
    const { ctx } = this;
    ctx.status = 200;           // 状态码 200
    
  }
}

module.exports = HomeController;