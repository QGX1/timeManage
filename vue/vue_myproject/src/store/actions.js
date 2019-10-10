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

  // 注册成功后台返回状态以及token，修改登录状态（丘桂娴）
  toRegister({ commit }, info) {
    return new Promise((resolve, reject) => {
      register(info)
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            commit(types.LOGIN, res.data.token);
            commit(types.LOGINSTATUS, true);
            //获取登陆token保存到sessionStorage
            window.sessionStorage.setItem("token", res.data.token);
            //设置axios跨域请求和token
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
          console.log("检测进入home页面的图书数据（丘桂娴）");
          // console.log(res.data.lists);
          if (res.status === 200) {
            // commit(types.USERINFO, res.data);
            console.log("全局变量");
            console.log(info);
            commit(types.USERINFO, {
              user_id: info.user_id,
              email: info.email
            });
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //后台管理获取管理员信息（黄昌壹）
  getAdminInfo({ commit }) {
    return new Promise((resolve, reject) => {
      adminInfo()
        .then(res => {
          if (res.status === 200) {
            console.log("获取成功");
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //后台管理获取用户信息（黄昌壹）
  getUsersInfo({ commit }, info) {
    return new Promise((resolve, reject) => {
      UsersInfo(info)
        .then(res => {
          if (res.status === 200) {
            console.log("后台用户信息获取成功");
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //删除管理员（黄昌壹）
  doDeleteAdmin({ commit }, info) {
    return new Promise((resolve, reject) => {
      DeleteAdmin(info)
        .then(res => {
          if (res.status === 200) {
            console.log("管理员删除成功");
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //删除用户（黄昌壹）
  doDeleteUser({ commit }, info) {
    return new Promise((resolve, reject) => {
      DeleteUser(info)
        .then(res => {
          if (res.status === 200) {
            console.log("用户删除成功");
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //修改管理员信息（黄昌壹）
  doEditAdminInfo({ commit }, info) {
    return new Promise((resolve, reject) => {
      EditAdminInfo(info)
        .then(res => {
          if (res.status === 200) {
            console.log("管理员信息修改成功");
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //修改用户信息（黄昌壹）
  doEditUserInfo({ commit }, info) {
    return new Promise((resolve, reject) => {
      EditUserInfo(info)
        .then(res => {
          if (res.status === 200) {
            console.log("用户信息修改成功");
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //添加管理员（黄昌壹）
  doAddAdmin({ commit }, info) {
    return new Promise((resolve, reject) => {
      AddAdmin(info)
        .then(res => {
          if (res.status === 200) {
            console.log("添加管理员成功");
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //添加用户（黄昌壹）
  doAddUser({ commit }, info) {
    return new Promise((resolve, reject) => {
      AddUser(info)
        .then(res => {
          if (res.status === 200) {
            console.log("添加用户成功");
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //黄昌壹
  getAdmin({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            commit(types.USERINFO, res.data);
          }
          console.log(res.data + "res带回了什么");
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //后台管理系登录(黄昌壹)
  toAdminLogin({ commit }, info) {
    return new Promise((resolve, reject) => {
      adminlogin(info)
        .then(res => {
          if (res.status === 200) {
            commit(types.LOGIN, res.data.token);
            commit(types.LOGINSTATUS, true);
            //获取登陆token保存到sessionStorage
            window.sessionStorage.setItem("token", res.data.token);
            //设置axios跨域请求和token;
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
// 退出登录（丘桂娴）
  logOut({ commit }) {
    return new Promise((resolve, reject) => {
      commit(types.USERINFO, null);
      commit(types.LOGINSTATUS, false);
      commit(types.LOGIN, "");
      window.sessionStorage.removeItem("token");
    });
  }
};
