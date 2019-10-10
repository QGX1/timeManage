'use strict';

const Service = require('egg').Service;

class DetailListService extends Service {
  /* 查询 */
    async SelectDetailList(detailListInfo) {
        const {ctx}=this;
        let SelectDetailList=await ctx.app.model.DetailedList.findAll({
            where:{
                account_id:detailListInfo
            },
        })
        console.log("查询");
        console.log(SelectDetailList)
        return SelectDetailList;
  }
  /* 修改 */
  async modifyDetailList(detailListInfo) {
    const {ctx}=this
    let modifyDetailList=await ctx.app.model.DetailedList.update(
        {
            list_title:detailListInfo.list_title,
            list_content:detailListInfo.list_content,
            list_images:detailListInfo.list_images,
            list_remind_time:detailListInfo.list_remind_time
        },
        {
            where:{
                list_id:detailListInfo.list_id,
            }
        }
    )
    // console.log("修改");
    // console.log(updateHabit)
    return modifyDetailList;
  };

  /* 删除 */
  async deleteDetailList(detailListInfo){
    const {ctx}=this
    let deleteDetailList=await ctx.app.model.DetailedList.destroy({
        where:{
            list_id:detailListInfo
        },
    })
    return deleteDetailList

  }

   /* 增加 */
   async addDetailList(detailListInfo){
    const {ctx}=this
    let addDetailList=await ctx.app.model.DetailedList.create({
        account_id:detailListInfo.account_id,
        list_title:detailListInfo.list_title,
        list_content:detailListInfo.list_content,
        list_images:detailListInfo.list_images,
        list_remind_time:detailListInfo.list_remind_time
    })
    
    return addDetailList
  }

    /* 查询单条数据 */
    async aDetailList(detailListInfo){
        const {ctx}=this
        let aDetailList=await ctx.app.model.DetailedList.findOne({
            where:{
                account_id:detailListInfo
            }
        })
        console.log("查询单条数据");
        console.log(aDetailList)
        return aDetailList
      }

}

module.exports = DetailListService;
