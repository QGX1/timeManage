module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
    var moment = require('moment');
    
    const Habit = app.model.define("habit", {
      habit_id: {
            type: INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            comments:"养成记录标识"
          },
        user_id: {
            type: INTEGER.UNSIGNED,
            references: {
                model: "user",
                key: "user_id",
                comment: "用户表id(外键)"
            }
        },
        habit_title: {
          type: STRING(50),
          allowNull: false,
          comments:"养成标题"
        },
        habit_time:{
          type:STRING,
          allowNull:false,
          comments:"养成时间"
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
    Habit.associat=()=>{
        app.model.Habit.belongsTo(app.model.User,
          {
            foreignKey:'user_id',
            targetKey:'user_id'
          })
      }
    return Habit;
};
