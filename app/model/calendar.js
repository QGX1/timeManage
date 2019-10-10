module.exports = app => {
    const { STRING, INTEGER, DATE, NOW, TINYINT } = app.Sequelize;
    var moment = require('moment');
    
    const Calendar = app.model.define("calendar", {
        ca_id: {
            type: INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            comments:"日程记录标识"
          },
        user_id: {
            type: INTEGER.UNSIGNED,
            references: {
                model: "user",
                key: "user_id",
                comment: "用户表id(外键)"
            }
        },
        ca_title: {
          type: STRING(50),
          allowNull: false,
          comments:"日程标题"
        },
        ca_site:{
          type:STRING,
          allowNull:true,
          comments:"日程地点"
        },
        ca_daylong:{
          type: TINYINT,
          allowNull: false,
          is: [[0-1], "i"],
          comment: "日程是否全天(0为是，1为否)"
        },
        ca_can_delete:{
          type: TINYINT,
          allowNull: false,
          is: [[0-1], "i"],
          comment: "日程是否允许删除(0为是，1为否)"
        },
        ca_begin_time:{
          type:DATE,
          allowNull:true,
          comments:"日程开始时间"
        },
        ca_end_time:{
          type:DATE,
          allowNull:true,
          comments:"日程结束时间"
        },
        ca_remind:{
          type:DATE,
          allowNull:true,
          comments:"日程提醒时间"
        },
        updated_at: {
            type: DATE,
            defaultValue: NOW(),
            get() {
                return moment(this.getDataValue("updated_at")).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
            }
        },
        created_at: {
            type: DATE,
            defaultValue: NOW(),
            get() {
                return moment(this.getDataValue("created_at")).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
            }
        }
    });
    Calendar.associat=()=>{
      app.model.Calendar.belongsTo(app.model.User,
        {
          foreignKey:'user_id',
          targetKey:'user_id'
        })
    }
    return Calendar;
};
