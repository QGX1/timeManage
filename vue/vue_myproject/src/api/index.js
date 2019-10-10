import Axios from 'axios'
import router from '../router'
import * as types from '../store/types'
import vuex from '../store'
import Qs from 'qs'
import errorinfo from '../components/error'
//跨域请求设置,将token存储在本地
if (window.sessionStorage.getItem('token')) {
  Axios.defaults.headers ={
    // token中的默认头
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'hr ' + window.sessionStorage.getItem('token')
  }
}

export let instance = Axios.create({
         headers: {
           "content-type": "application/x-www-form-urlencoded"
         },
         //baseURL: process.env.NODE_ENV === 'production' ? 'http://sayhub.me/api' : 'http://localhost:7001'
         // baseURL:'http://127.0.0.1:7001',
         baseURL: "http://172.16.221.16:7001/"
       });

// respone 路由响应拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      router.push({
        path: '*'
      })
      vuex.commit(types.ERRORSTATUS,error.response.status);
      // console.log(error.response.status+"丘桂娴333")
    }
    // 返回接口错误信息
    return Promise.reject(error.response)
  }
)

export const login = ({ user_email, user_password,captcha }) => {
  let data = {
      "user_email": user_email,
      "user_password": user_password,
      "captcha":captcha
  }

  console.log(Qs.stringify(data));
  
  return instance({
    method: 'post',
	  url: '/api/login',
	  data: Qs.stringify(data)
  });

}

export const getUserInfo = () => {
  return instance.post('/api/home',{
    loginok:'had login'
    
  })
  
}

// 注册（丘桂娴）
export const register = ({ registerUser, registerPassword,registerEmail }) => {
  let data = {
      "username": registerUser,
      "password": registerPassword,
      "email":registerEmail
  }
  // console.log(data+"丘桂娴");
  console.log(Qs.stringify(data)+"数据传递");
  
  return instance({
    method: 'post',
	  url: '/api/register',
	  data: Qs.stringify(data)
  });

}

//邮箱数据传递给后端，请求处理
export const checkEmail = ({ checkEmail }) => {
  let data = {
      "checkEmail":checkEmail,
  }
  console.log(Qs.stringify(data)+"数据传递checkEmail");
  
  return instance({
    method: 'post',
      url: '/api/checkEmail',
      data: Qs.stringify(data)
  });

}




//编辑管理员信息数据传给后端，请求处理（黄昌壹）
export const EditAdminInfo = ({ formInfo }) => {
  let data = {
    formInfo: formInfo
  };
  return instance({
    method: "post",
    url: "/api/doEditAdminInfo",
    data: Qs.stringify(data)
  });
};

//编辑用户信息数据传给后端，请求处理（黄昌壹）
export const EditUserInfo = ({ formInfo }) => {
  let data = {
    formInfo: formInfo
  };
  return instance({
    method: "post",
    url: "/api/doEditUserInfo",
    data: Qs.stringify(data)
  });
};

//向后端请求管理员信息（黄昌壹)
export const adminInfo = () => {
  return instance.post("/api/getAdminInfo", {});
};

//向后端请求用户信息（黄昌壹)
export const UsersInfo = () => {
  return instance.post("/api/getUsersInfo", {});
};


//管理员登录数据传给后端，请求处理(黄昌壹)
export const adminlogin = ({ adminLoginUser, adminLoginPassword }) => {
  let data = {
    adminUser: adminLoginUser,
    adminPassword: adminLoginPassword
  };
  console.log(Qs.stringify(data) + "这是管理员登录信息");
  return instance({
    method: "post",
    url: "/api/adminlogin",
    data: Qs.stringify(data)
  });
};

//增加管理员信息数据传给后端，请求处理（黄昌壹）
export const AddAdmin=({formInfo})=>{
  let data={
    formInfo:formInfo,
  }
  return instance({
    method: "post",
    url: "/api/doAddAdmin",
    data:Qs.stringify(data),
  });
}

//增加用户信息数据传给后端，请求处理（黄昌壹）
export const AddUser=({formInfo})=>{
  let data={
    formInfo:formInfo,
  }
  return instance({
    method: "post",
    url: "/api/doAddUser",
    data:Qs.stringify(data),
  });
}

//删除管理员信息数据传给后端，请求处理（黄昌壹）
export const DeleteAdmin=({formInfo})=>{
  let data={
    formInfo:formInfo,
  }
  return instance({
    method: "post",
    url: "/api/doDeleteAdmin",
    data:Qs.stringify(data),
  });
}

//删除用户信息数据传给后端，请求处理（黄昌壹）
export const DeleteUser=({formInfo})=>{
  let data={
    formInfo:formInfo,
  }
  return instance({
    method: "post",
    url: "/api/doDeleteUser",
    data:Qs.stringify(data),
  });
}
