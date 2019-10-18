import * as types from "./types";
import {
  instance,
  login,
  getUserInfo,
  register,
  checkEmail,
  adminlogin,
  adminInfo,
  EditAdminInfo,
  AddAdmin,
  DeleteAdmin,
  UsersInfo,
  DeleteUser,
  AddUser,
  EditUserInfo
} from "../api";
import user from "./modules/user";

export default {
  
  // 登录
  toLogin({ commit }, info) {
    return new Promise((resolve, reject) => {
      login(info)
        .then(res => {
          if (res.status === 200) {
            login(info)
            commit(types.LOGIN, res.data.token);
            commit(types.LOGINSTATUS, true);
            //获取登陆token保存到sessionStorage
            window.sessionStorage.setItem("token", res.data.token);
            //设置axios跨域请求和token,将token保存在本地
            instance.defaults.headers = {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "hr " + window.sessionStorage.getItem("token")
            };
            resolve(res);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 注册，修改登录状态（丘桂娴）
  toRegister({ commit }, info) {
    return new Promise((resolve, reject) => {
      register(info)
        .then(res => {

          // if (res.status === 200) {
          //   console.log(res);
          //   // commit(types.LOGIN, res.data.token);
          //   // commit(types.LOGINSTATUS, true);
          //   //获取登陆token保存到sessionStorage
          //   // window.sessionStorage.setItem("token", res.data.token);
          //   //设置axios跨域请求和token
          //   instance.defaults.headers = {
          //     "Content-Type": "application/x-www-form-urlencoded",
          //     Authorization: "hr " + window.sessionStorage.getItem("token")
            // };

            resolve(res);
          // }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 邮箱检测后台请求以及响应前端处理（丘桂娴）
  tocheckEmail({ commit }, info) {
    return new Promise((resolve, reject) => {
      checkEmail(info)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            // console.log(res);
            resolve(res);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getUser({ commit }, info) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(res => {
          if (res.status === 200) { 
            console.log("全局变量");
            console.log(info.info.user_id);
            commit(types.USERINFO, {
              user_id: info.info.user_id,
              user_email: info.info.email,
              user_name:info.info.user_name
            });
          }
          console.log(1333)
          console.log(this.$store)
          resolve(types.USERINFO);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
// 退出登录（丘桂娴）
  logOut({ commit }) {
    console.log("登出")
    return new Promise((resolve, reject) => {
      commit(types.USERINFO, null);
      commit(types.LOGINSTATUS, false);
      commit(types.LOGIN, "");
      window.sessionStorage.removeItem("token");
    });
  }
};
