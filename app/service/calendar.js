'use strict';

const Service = require('egg').Service;

class CalendarService extends Service {
  /* 查询 */
    async selectCalendar(calendarInfo) {
        const {ctx}=this;
        let selectsCalendar=await ctx.app.model.Calendar.findAll({
            attributes: [
                ['ca_id','id'],
                ['ca_title', 'title'],
                ['ca_begin_time','start'],
                ['ca_end_time','end'],
                ['ca_color','color'],
                ['ca_daylong','allDay']
            ],
            where:{
                user_id:calendarInfo
            }
        })
        console.log("查询");
        // console.log(selectsSum)
        return selectsCalendar;
  }
  /* 修改 */
  async modifyCalendar(calendarInfo) {
    const {ctx}=this
    let updateCalendar=await ctx.app.model.Calendar.update(
        {
            ca_title:calendarInfo.ca_title,
            ca_site:calendarInfo.ca_site,
            ca_daylong:calendarInfo.ca_daylong,
            ca_can_delete:calendarInfo.ca_can_delete,
            ca_begin_time:calendarInfo.ca_begin_time,
            ca_end_time:calendarInfo.ca_end_time,
            ca_color:calendarInfo.ca_color
        },
        {
            where:{
                ca_id:calendarInfo.ca_id,
            }
        }
    )
    console.log("修改");
    console.log(calendarInfo.ca_site)
    return updateCalendar;
  };

  /* 删除 */
  async deleteCalendar(calendarInfo){
    const {ctx}=this
    let deleteCalendar=await ctx.app.model.Calendar.destroy({
        where:{
            ca_id:calendarInfo
        }
    })
    return deleteCalendar

  }

   /* 增加 */
   async addCalendar(calendarInfo){
    const {ctx}=this
    let addCalendar=await ctx.app.model.Calendar.create({
        user_id:calendarInfo.user_id,
        ca_title:calendarInfo.ca_title,
        ca_site:calendarInfo.ca_site,
        ca_daylong:calendarInfo.ca_daylong,
        ca_can_delete:calendarInfo.ca_can_delete,
        ca_begin_time:calendarInfo.ca_begin_time,
        ca_end_time:calendarInfo.ca_end_time,
        ca_color:calendarInfo.ca_color
    })
    
    return addCalendar
  }

    /* 查询单条数据 */
    async aCalendar(calendarInfo){
        const {ctx}=this
        let aCalendar=await ctx.app.model.Calendar.findOne({
            where:{
                ca_id:calendarInfo
            }
        })
        console.log("查询单条数据");
        console.log(aCalendar)
        return aCalendar
      }

}

module.exports = CalendarService;
