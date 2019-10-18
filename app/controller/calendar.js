'use strict';

const Controller = require('egg').Controller;
class CalendarController extends Controller {
  /* 
    查询所有   
  */
    async findAll() {
        const {ctx}=this;
        let user_id=ctx.params.user_id;
        let SelectCalendar=await this.service.calendar.selectCalendar(user_id);
        return ctx.body={
          code:0,
          SelectCalendar
        }
  };
  /* 
    增加
  */
  async add() {
    const {ctx}=this;
    let ca_daylong=0;
    console.log(typeof(ctx.request.body.ca_daylong))
    if(ctx.request.body.ca_daylong=="true"){
      ca_daylong=1
    }else{
      ca_daylong=0
    }
    console.log(12212)
   
    console.log(ca_daylong)
    let calendarInfo={
        user_id:ctx.request.body.user_id,
        ca_title:ctx.request.body.ca_title,
        ca_site:ctx.request.body.ca_site,
        ca_daylong:ca_daylong,
        ca_can_delete:ctx.request.body.ca_can_delete,
        ca_begin_time:ctx.request.body.ca_begin_time,
        ca_end_time:ctx.request.body.ca_end_time,
        ca_color:ctx.request.body.ca_color
    }
    console.log("新增日程数据")
    console.log(calendarInfo)
    
    let addCalendar=await this.service.calendar.addCalendar(calendarInfo)

    if(addCalendar.length!=0){
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
   let calendarInfo={
      ca_id:ctx.request.body.ca_id,
      ca_title:ctx.request.body.ca_title,
      ca_site:ctx.request.body.ca_site,
      ca_daylong:ctx.request.body.ca_daylong,
      ca_can_delete:ctx.request.body.ca_can_delete,
      ca_begin_time:ctx.request.body.ca_begin_time,
      ca_end_time:ctx.request.body.ca_end_time,
      ca_color:ctx.request.body.ca_color
   };
   console.log("更新数据")
   console.log(calendarInfo)
   let modifyCalendar=await this.service.calendar.modifyCalendar(calendarInfo);
   console.log(11111)
   console.log(modifyCalendar)
   if(modifyCalendar[0]!=0){
    return ctx.body={
      code:0,
      msg:"修改成功"
    }
   }else{
    return ctx.body={
      code:1,
      msg:"修改失败"
   }
  }
};

  /* 
    删除习惯
  */

 async delete() {
    const {ctx}=this;
    let ca_id=ctx.params.ca_id;
    let deleteCalendar=await this.service.calendar.deleteCalendar(ca_id);
    console.log(deleteCalendar)
    
    if(deleteCalendar!=0){
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
    let ca_id=ctx.params.ca_id
    let aCalendar=await this.service.calendar.aCalendar(ca_id)
    if(aCalendar){
        return ctx.body={
            code:0,
            msg:"查找成功",
            sumdata:aCalendar
        }
    }else{
        return ctx.body={
            code:1,
            msg:"暂无数据"
        }
    }

  };
}

module.exports = CalendarController;
