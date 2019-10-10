'use strict';

const Controller = require('egg').Controller;
class DetailListController extends Controller {
  /* 
    查询所有   
  */
    async findAll() {
        const {ctx}=this;
        let account_id=ctx.params.account_id;
        let SelectDetailList=await this.service.detailList.SelectDetailList(account_id);
        return ctx.body={
          code:0,
          SelectDetailList
        }
  };
  /* 
    增加
  */
  async add() {
    const {ctx}=this;
    let detailListInfo={
        account_id:ctx.request.body.account_id,
        list_title:ctx.request.body.list_title,
        list_content:ctx.request.body.list_content,
        list_images:ctx.request.body.list_images,
        list_remind_time:ctx.request.body.list_remind_time
    }
    console.log(detailListInfo)
    let addDetailList=await this.service.detailList.addDetailList(detailListInfo)

    if(addDetailList.length!=0){
        return ctx.body={
            code:0,
            msg:"添加成功"
        }
    }else{
        return ctx.body={
            code:1,
            msg:"添加失败"
        }
    }
  };
  /* 
    修改
  */
  async update() {
   const {ctx}=this;
   let detailListInfo={
    list_id:ctx.request.body.list_id,
    list_title:ctx.request.body.list_title,
    list_content:ctx.request.body.list_content,
    list_images:ctx.request.body.list_images,
    list_remind_time:ctx.request.body.list_remind_time
   };
   console.log(detailListInfo)
   let modifyDetailList=await this.service.detailList.modifyDetailList(detailListInfo);
  //  console.log(modifyHabit[0])
   if(modifyDetailList[0]!=0){
    return ctx.body={
      code:0,
      msg:"修改成功"
    }
   }else{
    return ctx.body={
      code:1,
      msg:"数据不存在"
   }
  }
};

  /* 
    删除习惯
  */

 async delete() {
    const {ctx}=this;
    let list_id=ctx.params.list_id;
    let deleteDetailList=await this.service.detailList.deleteDetailList(list_id);
    console.log(deleteDetailList)
    
    if(deleteDetailList!=0){
      return ctx.body={
        code:0,
        msg:"已删除"
      }
     }else{
      return ctx.body={
        code:1,
        msg:"数据不存在"
     }
    }
  };

  /* 
    查看单条习惯
  */
 async findOne() {
    const {ctx}=this;
    let list_id=ctx.params.list_id
    let aDetailList=await this.service.detailList.aDetailList(list_id)
    if(aDetailList){
        return ctx.body={
            code:0,
            msg:"查找成功",
            sumdata:aDetailList
        }
    }else{
        return ctx.body={
            code:1,
            msg:"暂无数据"
        }
    }

  };
}

module.exports = DetailListController;
