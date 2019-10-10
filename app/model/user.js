module.exports = app => {
  const { STRING, INTEGER, DATE, NOW, TEXT } = app.Sequelize;
  var moment = require("moment");

  const User = app.model.define("user", {
    user_id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comments: "用户记录标识"
    },
    user_name: {
      type: STRING(30),
      allowNull: false,
      comments:"用户名"
    },
    user_password: {
      type: STRING,
      allowNull: false,
      comments:"用户密码"
    },
    user_email: {
      type: STRING,
      allowNull: false,
      unique: true,
      comments:"用户邮箱"
    },
    user_phone:{
      type:STRING(11),
      allowNull:false,
      unique:true,
      comments:"用户联系电话"
    },
    created_at: {
      type: DATE,
      comments:"用户创建时间",
      defaultValue: NOW(),
      get() {
        return moment(this.getDataValue("created_at")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    }
  });
  User.associate = function() {
    app.model.User.hasOne(app.model.Calendar,
      {
        foreignKey:'user_id',
      });
    app.model.User.hasOne(app.model.DetailedAccount,
      {
        foreignKey:'user_id',
      });
    app.model.User.hasOne(app.model.Habit,
      {
        foreignKey:'user_id',
      });
    app.model.User.hasOne(app.model.Sum,
      {
        foreignKey:'user_id',
      });
  };
  return User;
};
