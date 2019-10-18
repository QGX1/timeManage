'use strict';

const Controller = require('egg').Controller;
const {ctx}=this;
class SumController extends Controller {
  /* 
    查询所有总结    
  */
    async selectSum() {
        const {ctx}=this;
        let user_id=ctx.params.user_id;
        let selectSum=await this.service.selectSum.selectsSum(user_id);
        // let sumSelect=selectSum[0].dataValues;
        return ctx.body={
          code:0,
          selectSum
        }
  };
  /* 
    增加总结
  */
  async addSum() {
    const {ctx}=this;
    let sumInfo={
        user_id:ctx.request.body.user_id,
        sum_content:ctx.request.body.sum_content,
        sum_time:ctx.request.body.sum_time
    }
    let addSum=await this.service.selectSum.addSum(sumInfo)

    if(addSum.length!=0){
        return ctx.body={
            code:0,
            msg:"添加总结成功"
        }
    }else{
        return ctx.body={
            code:1,
            msg:"添加总结失败"
        }
    }
  };
  /* 
    修改总结
  */
  async modifySum() {
   const {ctx}=this;
   let sumInfo={
       sum_id:ctx.request.body.sum_id,
       sum_content:ctx.request.body.sum_content,
       sum_time:ctx.request.body.sum_time
   };
  //  console.log(ctx.request.body.sum_id)
   let modifySum=await this.service.selectSum.modifySum(sumInfo);
   if(modifySum[0]!=0){
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
    删除总结
  */

 async deleteSum() {
    const {ctx}=this;
    let sum_id=ctx.params.sum_id;
    let deleteSum=await this.service.selectSum.deleteSum(sum_id);
    return ctx.body={
        code:0,
        msg:"总结已删除"
    }
  };

  /* 
    查看单条总结
  */
 async aSum() {
    const {ctx}=this;
    let user_id=ctx.params.user_id
    let sum_time=ctx.params.sum_time
    let sumInfo={
      user_id,
      sum_time
    }
    console.log(1111)
    console.log(sumInfo)
    let aSum=await this.service.selectSum.aSum(sumInfo)
    if(aSum){
        return ctx.body={
            code:0,
            msg:"查找成功",
            sumdata:aSum
        }
    }else{
        return ctx.body={
            code:1,
            msg:"暂无数据"
        }
    }

  };
}

module.exports = SumController;
