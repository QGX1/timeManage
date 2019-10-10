// 后端获取图书数据响应前端（丘桂娴）
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log("获取权限");
    const { ctx } = this;

    
    //获取数据显示到新闻页面

     var lists=await this.service.bookapi.getNewsList();
    
    //  console.log(lists)
    console.log("图书数据home")
    ctx.body={
       lists:lists,
      message:"图书数据"
    }
    ctx.status = 200;           // 状态码 200 
  }


  // 查看所有用户的笔记内容

  async allNote(){
    var ctx=this.ctx;
    console.log("请求全部用户数据")
// 联表查询
    let allN = await ctx.app.model.Note.findAll({
      include:[ 
        {
          model:
              ctx.app.model.Label,          
        },
      ],
      where:{
        note_permiss:1
      }
      
     })

    console.log(allN);
    ctx.body = {
      allN,
      message:"所有笔记内容"
    }
  }
}

module.exports = HomeController;


