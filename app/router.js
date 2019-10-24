"use strict";

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  const checktoken = app.middleware.checktoken();
  /* 
    登录、注册
  */
  router.post("/api/login", controller.login.index);//用户登录
  router.post("/api/home", checktoken, controller.home.index);
  router.get('/api/verify',app.controller.login.verify);//获取图形验证码
  router.post('/api/phoneCode',app.controller.code.phoneCode);//手机发送验证码
  router.post("/api/register", controller.code.register);//用户注册
  router.post("/api/uploadImg", controller.moni.uploadImg);//上传图片
  //   router.post("/api/checkEmail", controller.checkEmail.index);
  /* 
    总结操作
  */
  router.get("/sum/:user_id",app.controller.sum.selectSum)//查询所有总结
  router.post("/sum/addSum",controller.sum.addSum)//增加总结
  router.delete("/sum/deleteSum/:sum_id",controller.sum.deleteSum)//删除总结
  router.get("/sum/aSum/:user_id/:sum_time",controller.sum.aSum)//查询某条总结详情
  router.put('/sum/updateSum',controller.sum.modifySum)//更新数据

  /* 
    习惯操作
  */
 router.get("/habit/findall/:user_id",app.controller.habit.findAll)//查询所有
 router.post("/habit/add",controller.habit.add)//增加
 router.delete("/habit/delete/:habit_id",controller.habit.delete)//删除
 router.get("/habit/findone/:habit_id",controller.habit.findOne)//查询某条详情
 router.put('/habit/update/',controller.habit.update)//更新数据

 /* 
  清单集操作
 */
 router.get("/account/findall/:user_id",app.controller.account.findAll)//查询所有
 router.post("/account/add",controller.account.add)//增加
 router.delete("/account/delete/:account_id",controller.account.delete)//删除
 router.get("/account/findone/:account_id",controller.account.findOne)//查询某条详情
 router.put('/account/update',controller.account.update)//更新数据

 /* 
  清单列表操作
 */
 router.get("/detailList/findall/:account_id",app.controller.detailList.findAll)//查询所有
 router.post("/detailList/add",controller.detailList.add)//增加
 router.delete("/detailList/delete/:list_id",controller.detailList.delete)//删除
 router.get("/detailList/findone/:list_id",controller.detailList.findOne)//查询某条详情
 router.put('/detailList/update',controller.detailList.update)//更新数据

  /*
    日程操作
  */
 router.get("/calendar/findall/:user_id",app.controller.calendar.findAll)//查询所有
 router.post("/calendar/add",controller.calendar.add)//增加
 router.delete("/calendar/delete/:ca_id",controller.calendar.delete)//删除
 router.get("/calendar/findone/:ca_id",controller.calendar.findOne)//查询某条详情
 router.put('/calendar/update',controller.calendar.update)//更新数据
};
