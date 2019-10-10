// 验证是否为本站用户，发送邮箱（丘桂娴）
'use strict';

const Controller = require('egg').Controller;

class CheckEmailController extends Controller {
    async index() {
        const ctx = this.ctx;
        let checkEmail = ctx.request.body.checkEmail;//获取前端数据
        console.log("后台验证邮箱" + checkEmail);

        let check = await ctx.app.model.User.findAll({
          raw: true,
          attributes: { exclude: ["user_id"] },
          where: {
            email: checkEmail
          }
        });
        // console.log("用户名 ："+check[0].user_name+"，密码："+check[0].user_password);
        // console.log(JSON.stringify(check));//将onject类型处理成string类型
        // 判断用户是否存在
        if(check[0]==null){
            //  console.log("用户不存在")
            ctx.body={
                message:"邮箱不存在",
                status:404
            }
        }else{

            const email = checkEmail;  // 接收者的邮箱
            const subject = '学习管理系统邮件';
            const text = '亲爱的用户'+check[0].user_name+",您的密码为"+check[0].user_password;
            // const html = '<h2>测试一下::</h2><a class="elem-a" href="https://baidu.com"><span class="content-elem-span">测试链接</span></a>';  
           
            const has_send = await this.service.tool.sendMail(email, subject, text);
            
            if (has_send) {
                ctx.body={
                    message: '发送成功',
                    status : 200
                };
                return;
            }
            ctx.body={
                message: '发送失败',
                status:404
            };
        }
            ctx.status=200
     }
}

module.exports = CheckEmailController;
