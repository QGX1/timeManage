'use strict';

const Controller = require('egg').Controller;
class HabitController extends Controller {
  /* 
    查询所有习惯    
  */
    async findAll() {
        const {ctx}=this;
        let user_id=ctx.params.user_id;
        console.log(user_id)
        console.log("查询数据")
        let SelectHabit=await this.service.habit.selectsHabit(user_id);
        // let habitSelect=habitSum[0].dataValues;
        return ctx.body={
          code:0,
          SelectHabit
        }
  };
  /* 
    增加习惯
  */
  async add() {
    const {ctx}=this;
    let habitInfo={
        user_id:ctx.request.body.user_id,
        habit_title:ctx.request.body.habit_title,
        habit_time:ctx.request.body.habit_time,
        habit_img:ctx.request.body.habit_img
    }
    console.log(ctx.request.body)
    let addHabit=await this.service.habit.addHabit(habitInfo)

    if(addHabit.length!=0){
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
    修改习惯
  */
  async update() {
   const {ctx}=this;
   let habitInfo={
       habit_id:ctx.request.body.habit_id,
       habit_title:ctx.request.body.habit_title,
       habit_time:ctx.request.body.habit_time,
       habit_img:ctx.request.body.habit_img
   };
   console.log("修改数据")
   console.log(habitInfo)
   let modifyHabit=await this.service.habit.modifyHabit(habitInfo);
   if(modifyHabit[0]!=0){
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
    let habit_id=ctx.params.habit_id;
    console.log('删除习惯')
    console.log(habit_id)
    let deleteHabit=await this.service.habit.deleteHabit(habit_id);
    return ctx.body={
        code:0,
        msg:"已删除"
    }
  };

  /* 
    查看单条习惯
  */
 async findOne() {
    const {ctx}=this;
    let habit_id=ctx.params.habit_id
    let aHabit=await this.service.habit.aHabit(habit_id)
    if(aHabit){
        return ctx.body={
            code:0,
            msg:"查找成功",
            aHabit:aHabit
        }
    }else{
        return ctx.body={
            code:1,
            msg:"暂无数据"
        }
    }

  };
}

module.exports = HabitController;
