module.exports = app => {
  const { STRING, INTEGER, DATE, NOW, TEXT } = app.Sequelize;
  var moment = require("moment");

  const DetailedList = app.model.define("detailed_list", {
    list_id: {
      type: INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comments: "清单详情记录标识"
    },
    account_id: {
      type: INTEGER.UNSIGNED,
      references: {
          model: "detailed_account",
          key: "account_id",
          comment: "清单集记录标识id(外键)"
      }
  },
  list_title: {
      type: STRING(30),
      allowNull: false,
      comments:"清单详情标题"
    },
    list_content: {
      type: TEXT,
      allowNull: true,
      comments:"清单详情内容"
    },
    list_images: {
      type: STRING,
      allowNull: true,
      comments:"清单详情图片"
    },
    list_remind_time: {
      type: DATE,
      allowNull: true,
      comments:"清单详情提醒时间"
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
  DetailedList.associate = function() {
    app.model.DetailedList.belongsTo(app.model.DetailedAccount,
      {
        foreignKey:'account_id',
        targetKey:'account_id'
      });    
  };
  return DetailedList;
};
