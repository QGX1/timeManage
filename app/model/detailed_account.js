module.exports = app => {
  const { STRING, INTEGER, DATE, NOW, TEXT } = app.Sequelize;
  var moment = require("moment");

  const DetailedAccount = app.model.define("detailed_account", {
    account_id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comments: "清单集记录标识"
    },
    user_id: {
      type: INTEGER.UNSIGNED,
      references: {
          model: "user",
          key: "user_id",
          comment: "用户表id(外键)"
      }
  },
    account_title: {
      type: STRING(30),
      allowNull: false,
      comments:"清单集标题"
    },
    account_color: {
      type: STRING,
      allowNull: true,
      comments:"清单集颜色"
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
      comments:"用户创建时间",
      defaultValue: NOW(),
      get() {
        return moment(this.getDataValue("created_at")).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    }
  });
  DetailedAccount.associate = function() {
      app.model.DetailedAccount.belongsTo(app.model.User,
        {
          foreignKey:'user_id',
          targetKey:'user_id'
        });
        app.model.DetailedAccount.hasOne(app.model.DetailedList,
        {
          foreignKey:'account_id',
        });
        
  };
  return DetailedAccount;
};
