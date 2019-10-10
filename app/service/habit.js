'use strict';

const Service = require('egg').Service;

class HabitService extends Service {
  /* 查询 */
    async selectsHabit(habitInfo) {
        const {ctx}=this;
        let selectsHabit=await ctx.app.model.Habit.findAll({
            where:{
                user_id:habitInfo
            }
        })
        console.log("查询");
        // console.log(selectsSum)
        return selectsHabit;
  }
  /* 修改 */
  async modifyHabit(habitInfo) {
    const {ctx}=this
    let updateHabit=await ctx.app.model.Habit.update(
        {
            habit_title:habitInfo.habit_title,
            habit_time:habitInfo.habit_time
        },
        {
            where:{
                habit_id:habitInfo.habit_id,
            }
        }
    )
    // console.log("修改");
    // console.log(updateHabit)
    return updateHabit;
  };

  /* 删除 */
  async deleteHabit(habitInfo){
    const {ctx}=this
    let deleteHabit=await ctx.app.model.Habit.destroy({
        where:{
            habit_id:habitInfo
        }
    })
    return deleteHabit

  }

   /* 增加 */
   async addHabit(habitInfo){
    const {ctx}=this
    let addHabit=await ctx.app.model.Habit.create({
        user_id:habitInfo.user_id,
        habit_title:habitInfo.habit_title,
        habit_time:habitInfo.habit_time
    })
    
    return addHabit
  }

    /* 查询单条数据 */
    async aHabit(habitInfo){
        const {ctx}=this
        let aHabit=await ctx.app.model.Habit.findOne({
            where:{
                habit_id:habitInfo
            }
        })
        console.log("查询单条数据");
        console.log(aHabit)
        return aHabit
      }

}

module.exports = HabitService;
