'use strict';

const Service = require('egg').Service;

class SelectSumService extends Service {
  /* 查询 */
    async selectsSum(sumInfo) {
        const {ctx}=this;
        let selectsSum=await ctx.app.model.Sum.findAll({
            where:{
                user_id:sumInfo
            }
        })
        console.log("查询");
        // console.log(selectsSum)
        return selectsSum;
  }
  /* 修改 */
  async modifySum(sumInfo) {
    const {ctx}=this
    let updateSum=await ctx.app.model.Sum.update(
        {
            sum_content:sumInfo.sum_content,
            sum_time:sumInfo.sum_time
        },
        {
            where:{
                sum_id:sumInfo.sum_id,
            }
        }
    )
    console.log("修改");
    console.log(updateSum)
    return updateSum;
  };

  /* 删除 */
  async deleteSum(sumInfo){
    const {ctx}=this
    let deleteSum=await ctx.app.model.Sum.destroy({
        where:{
            sum_id:sumInfo
        }
    })
    return deleteSum

  }

   /* 增加 */
   async addSum(sumInfo){
    const {ctx}=this
    let deleteSum=await ctx.app.model.Sum.create({
        user_id:sumInfo.user_id,
        sum_content:sumInfo.sum_content,
        sum_time:sumInfo.sum_time
    })
    
    return deleteSum
  }

    /* 查询单条数据 */
    async aSum(sumInfo){
        const {ctx}=this
        let aSum=await ctx.app.model.Sum.findAll({
            where:{
                user_id:sumInfo.user_id,
                sum_time:sumInfo.sum_time
            }
        })
        console.log("查询单条数据");
        console.log(aSum)
        return aSum
      }

}

module.exports = SelectSumService;
