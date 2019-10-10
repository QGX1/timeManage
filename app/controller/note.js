// 笔记：查看、增加、删除（丘桂娴）
'use strict';

const Controller = require('egg').Controller;

const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class NoteController extends Controller {
  async checkNote() {
    const ctx=this.ctx;

    var user_id=ctx.request.query.user_id;
    console.log(user_id);

    let checkN=await ctx.app.model.Note.findAll({
      attributes: {  },
      where: {
        user_id:user_id
      }
    })
    console.log("查看用户笔记")

    ctx.body={
      checkN:checkN
    }
    ctx.status=200
  }


  async addNote() {
    const ctx=this.ctx;

    var user_id=ctx.request.body.user_id;
    var note_content=ctx.request.body.content;
    var note_permiss=ctx.request.body.permission;
    var note_title=ctx.request.body.title;
    var label_name=ctx.request.body.selectedItem;
    var label_id,note_id;
    
    let addLa=await ctx.app.model.Label.create({label_name:label_name}).then(res=>{
      label_id=res.label_id
      console.log("插入标签成功");
      
    })
    let addNo=await ctx.app.model.Note.create({label_id:label_id,user_id:user_id,note_title:note_title,
      note_content:note_content,note_permiss:note_permiss}).then(res=>{
        note_id=res.note_id
        console.log("插入笔记成功")
        
      })

      // console.log(note_id,label_id);
    let addNL=await ctx.app.model.NoteLabel.create({label_id:label_id,note_id:note_id})
    console.log("插入笔记标签")
    ctx.status=200
  }


  // 修改用户笔记,不允许修改标签和权限
  async updateNote(){
    const ctx=this.ctx;
    var user_id=ctx.request.body.user_id;
    var note_content=ctx.request.body.content;
    var note_title=ctx.request.body.title;
   
    
    let updateN=await ctx.app.model.Note.upload({

      note_title:note_title,
      note_content:note_content,
    },{
      where: {
          note_id:note_id
      }

    }).then(res=>{
        console.log(res);
        console.log("修改笔记成功")
        
      })
    console.log("修改笔记信息")
    ctx.body={
      message:"修改笔记成功"
    }
    ctx.status=200
  }


  // 删除笔记
  async removeNote(){
    const ctx=this.ctx;
    var user_id=ctx.request.query.user_id;
    var note_id=ctx.request.query.note_id;
    console.log("删除笔记")
    console.log(ctx.request.query)
    let removeN=await ctx.app.model.Note.destroy({
      where:{
        user_id:user_id,
        note_id:note_id
      }
    }).then(res=>{
      console.log(res);
    })
    
    console.log("删除成功")
    ctx.body={
      message:"删除笔记成功"
    }
    ctx.status=200
  }
  

}

module.exports = NoteController;
