// 用户头像、图片上传本地（丘桂娴）
'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class MoniController extends Controller {

  // 编辑用户头像
  async check(){
    const ctx=this.ctx;
    
    const stream = await ctx.getFileStream();
    console.log(stream)
    console.log(stream.fields.user_id)
    // 文件名:随机数+时间戳+原文件后缀
    // path.extname(stream.filename).toLocaleLowerCase()为后缀名（.jpg,.png等）
    const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
    // 图片存放在静态资源public/img文件夹下
    const target = path.join(this.config.baseDir, 'app/public/img', filename);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);

   
    try {
        // 异步把文件流 写入
        await awaitWriteStream(stream.pipe(writeStream));
        console.log("写入成功")
        console.log(target)
    } catch (err) {
        // 如果出现错误，关闭管道
        await sendToWormhole(stream);
        throw err;
    }

     var user_id=stream.fields.user_id
 
    console.log("头像")

    let avatar=await ctx.app.model.User.update({
         avatar:filename,
        },{
            where: {
                user_id:user_id
            }
    
      }).then(function(result){
        console.log('updated atavar');
     })
    ctx.body={
      massage:"头像修改成功",
      data:filename
    }
    ctx.status=200
  }



  // 模拟上传笔记图片
  async uploadImg(){
    const ctx=this.ctx;
    
    const stream = await ctx.getFileStream();
    console.log(stream);
    // 文件名:随机数+时间戳+原文件后缀
    // path.extname(stream.filename).toLocaleLowerCase()为后缀名（.jpg,.png等）
    const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
    // 图片存放在静态资源public/note文件夹下
    const target = path.join(this.config.baseDir, 'app/public/note', filename);
    console.log("图片")
    console.log(target);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    console.log("绝对路径");
    console.log(writeStream.path);
    try {
        // 异步把文件流 写入
        await awaitWriteStream(stream.pipe(writeStream));
        console.log("写入成功")
        
    } catch (err) {
        // 如果出现错误，关闭管道
        await sendToWormhole(stream);
        throw err;
    }
    
    console.log("模拟笔记图片上传成功")
    ctx.body={
      data: filename,
      message:"上传成功"
    }
    ctx.status=200;
  }
  
}

module.exports = MoniController;
