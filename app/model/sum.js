module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
    var moment = require('moment');
    
    const Sum = app.model.define("sum", {
        sum_id: {
            type: INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            comments:"总结记录标识"
          },
        user_id: {
            type: INTEGER.UNSIGNED,
            references: {
                model: "user",
                key: "user_id",
                comment: "用户表id(外键)"
            }
        },
        sum_content: {
          type: STRING(50),
          allowNull: false,
          comments:"总结内容"
        },
        sum_time:{
          type:DATE,
          allowNull:false,
          comments:"总结时间"
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
    Sum.associat=()=>{
        app.model.Sum.belongsTo(app.model.User,
          {
            foreignKey:'user_id',
            targetKey:'user_id'
          })
      }
    return Sum;
};
