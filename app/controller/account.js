'use strict';

const Controller = require('egg').Controller;
class AccountController extends Controller {
  /* 
    查询所有   
  */
    async findAll() {
        const {ctx}=this;
        let user_id=ctx.params.user_id;
        let SelectAccount=await this.service.account.selectsAccount(user_id);
        return ctx.body={
          code:0,
          SelectAccount
        }
  };
  /* 
    增加
  */
  async add() {
    const {ctx}=this;
    let accountInfo={
        user_id:ctx.request.body.user_id,
        account_title:ctx.request.body.account_title,
        account_color:ctx.request.body.account_color
    }
    console.log(accountInfo)
    let addAccount=await this.service.account.addAccount(accountInfo)

    if(addAccount.length!=0){
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
   let accountInfo={
    account_id:ctx.request.body.account_id,
    account_title:ctx.request.body.account_title,
    account_color:ctx.request.body.account_color
   };
   console.log(accountInfo)
   let modifyAccount=await this.service.account.modifyAccount(accountInfo);
  //  console.log(modifyHabit[0])
   if(modifyAccount[0]!=0){
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
    let account_id=ctx.params.account_id;
    let deleteAccount=await this.service.account.deleteAccount(account_id);
    console.log(deleteAccount)
    
    if(deleteAccount!=0){
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
    let account_id=ctx.params.account_id
    let aAccount=await this.service.account.aAccount(account_id)
    if(aAccount){
        return ctx.body={
            code:0,
            msg:"查找成功",
            sumdata:aAccount
        }
    }else{
        return ctx.body={
            code:1,
            msg:"暂无数据"
        }
    }

  };
}

module.exports = AccountController;
