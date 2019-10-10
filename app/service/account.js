'use strict';

const Service = require('egg').Service;

class AccountService extends Service {
  /* 查询 */
    async selectsAccount(accountInfo) {
        const {ctx}=this;
        let selectsAccount=await ctx.app.model.DetailedAccount.findAll({
            where:{
                user_id:accountInfo
            },
            include:{
                model:ctx.app.model.DetailedList
            }
        })
        console.log("查询");
        console.log(selectsAccount)
        return selectsAccount;
  }
  /* 修改 */
  async modifyAccount(accountInfo) {
    const {ctx}=this
    let updateAccount=await ctx.app.model.DetailedAccount.update(
        {
            account_title:accountInfo.account_title,
            account_color:accountInfo.account_color
        },
        {
            where:{
                account_id:accountInfo.account_id,
            }
        }
    )
    // console.log("修改");
    // console.log(updateHabit)
    return updateAccount;
  };

  /* 删除 */
  async deleteAccount(accountInfo){
    const {ctx}=this
    let deleteAccount=await ctx.app.model.DetailedAccount.destroy({
        where:{
            account_id:accountInfo
        },
        include:{
            model:ctx.app.model.DetailedList
        }
    })
    return deleteAccount

  }

   /* 增加 */
   async addAccount(accountInfo){
    const {ctx}=this
    let addAccount=await ctx.app.model.DetailedAccount.create({
        user_id:accountInfo.user_id,
        account_title:accountInfo.account_title,
        account_color:accountInfo.account_color
    })
    
    return addAccount
  }

    /* 查询单条数据 */
    async aAccount(accountInfo){
        const {ctx}=this
        let aAccount=await ctx.app.model.DetailedAccount.findOne({
            where:{
                account_id:accountInfo
            }
        })
        console.log("查询单条数据");
        console.log(aAccount)
        return aAccount
      }

}

module.exports = AccountService;
