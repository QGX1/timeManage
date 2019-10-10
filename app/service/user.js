"use strict";
//响应controller层中user的调用
const Service = require("egg").Service;

class UserService extends Service {
  async getInfo() {
    let usersInfo = await this.app.model.UserRole.findAll({
      // raw: true,
      where: {
        role_id: 3
      },
      include: [
        {
          model: this.app.model.User,
          attributes: { exclude: ["created_at", "updated_at"] },
          where: {
            user_id: this.app.Sequelize.col("user_role.user_id")
          }
        }
      ]
    });
    return usersInfo;
  }

  async deleteUser(info) {
    console.log(info.id + "管理员id");
    let sc=await this.app.model.Schedule.destroy({
          where: {
            user_id: info.id
          }
        }).then(res=>{
          console.log("删除用户待办事项成功")
        });
      let no= await this.app.model.Note.destroy({
        where: {
          user_id: info.id
        }
      }).then(res=>{
        console.log("删除用户笔记成功")
      });
      let co= await this.app.model.Collect.destroy({
          where: {
            user_id: info.id
          }
        }).then(res=>{
          console.log("删除用户收藏成功")
        });
    //从用户表和用户角色表中删除信息
    await this.app.model.User.destroy({
      where: {
        user_id: info.id,
        user_name: info.name
      }
    }).then(result => {
      console.log(result);
      return Promise.all([
        this.app.model.UserRole.destroy({
          where: {
            user_id: info.id
          }
        }),
      ]);
    });
    
    return "删除成功";
  };

  async AddUser(info) {
    console.log(info.name);
    await this.app.model.User.create({
      //向用户表和角色表中插入数据
      user_name: info.name,
      user_password: info.password,
      sex: info.sex,
      email: info.email
    })
      .then(result => {
        return Promise.all([
          this.app.model.UserRole.create({
            user_id: result.user_id,
            role_id: 3
          })
        ]);
      })
      .catch(err => {
        console.error(err);
      });
    return true;
  };

  async EditUser(info){
    //更新user表信息
    await this.app.model.User.update(
      { user_name: info.name, sex: info.sex, email: info.email },
      { where: { user_id: info.id } }
    );
    return '用户信息修改成功'
  };
}

module.exports = UserService;
