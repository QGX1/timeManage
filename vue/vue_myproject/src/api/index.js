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
          baseURL: " http://172.16.221.16:7001/"
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

// 注册
export const register = ({ user_name, user_password,user_email ,user_phone,phone_code}) => {
  let data = {
    'user_name':user_name,
    'user_password':user_password,
    'user_email':user_email,
    'user_phone':user_phone,
    'phone_code':phone_code,
  }
  console.log(Qs.stringify(data)+"数据传递");
  
  return instance({
    method: 'post',
	  url: '/api/register',
	  data: Qs.stringify(data)
  });

}

// 手机验证码
export const phoneCode=(user_phone) =>{
  let data={
    'user_phone':user_phone
  }
  console.log("手机验证码");
  console.log(user_phone)
  return instance({
    method: 'post',
	  url: '/api/phoneCode',
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

// 上传图片
export const uploadSumImg=(Formdata)=>{
  console.log(Formdata)
  return instance({
    method:'post',
    url:'/api/uploadImg',
    data:Qs.stringify(Formdata)
  })
};
// 新增习惯养成数据
export const addHabit=({user_id,habit_title,habit_time,habit_img})=>{
  let data = {
    'user_id':user_id,
    'habit_title':habit_title,
    'habit_time':habit_time,
    'habit_img':habit_img
  }
  console.log(Qs.stringify(data)+"习惯养成");

  return instance({
    method: 'post',
    url: '/habit/add',
    data: Qs.stringify(data)
  });
}

// 获取该用户全部的习惯养成数据
export const getHabit=(user_id)=>{

  return instance({
    method: 'get',
      url: '/habit/findall/'+user_id,
      // data: Qs.stringify(data)
  });
}
// 删除习惯养成

export const deleHabit=(habit_id)=>{

  return instance({
    method: 'delete',
      url: '/habit/delete/'+habit_id,
  });
}

// 获取单条习惯养成数据
export const oneHabit=(habit_id)=>{
  return instance({
    method: 'get',
    url: '/habit/findone/'+habit_id,
  });
}

// 修改用户习惯养成时间
export const uploadHabit=({habit_id,habit_title,habit_time,habit_img})=>{
  let data = {
    'habit_id':habit_id,
    'habit_title':habit_title,
    'habit_time':habit_time,
    'habit_img':habit_img
  }
  console.log(Qs.stringify(data)+"数据传递");
  return instance({
    method: 'put',
    url: '/habit/update/',
    data: Qs.stringify(data)
  });
}

// 新增日程表单数据
export const addCalendar=({
  user_id,
  ca_title,
  ca_site,
  ca_daylong,
  ca_begin_time,
  ca_end_time,
  ca_color,
  ca_can_delete})=>{
  let data = {
    'user_id':user_id,
    'ca_title':ca_title,
    'ca_site':ca_site,
    'ca_daylong':ca_daylong,
    'ca_begin_time':ca_begin_time,
    'ca_end_time':ca_end_time,
    'ca_color':ca_color,
    'ca_can_delete':ca_can_delete
  }
  console.log(Qs.stringify(data)+"日程");

  return instance({
    method: 'post',
    url: '/calendar/add',
    data: Qs.stringify(data)
  });
}

// 获取该用户全部的日程表单数据
export const getCalendar=(user_id)=>{
  return instance({
    method: 'get',
      url: '/calendar/findall/'+user_id,
      // data: Qs.stringify(data)
  });
}

//查看当前日程详情
export const detailCalendar=(ca_id)=>{

  return instance({
    method: 'get',
      url: '/calendar/findone/'+ca_id,
      // data: Qs.stringify(data)
  });
}

// 修改用户日程
export const uploadCalendar=({
  ca_id,
  ca_title,
  ca_site,
  ca_daylong,
  ca_begin_time,
  ca_end_time,
  ca_color,
  ca_can_delete})=>{
  let data = {
    ca_id,
    ca_title,
    ca_site,
    ca_daylong,
    ca_begin_time,
    ca_end_time,
    ca_color,
    ca_can_delete
    }
  console.log(Qs.stringify(data)+"数据传递");
  return instance({
    method: 'put',
    url: '/calendar/update',
    data: Qs.stringify(data)
  });
}

// 删除日程
export const deleteCalendar=(ca_id)=>{

  return instance({
    method: 'delete',
      url: '/calendar/delete/'+ca_id,
  });
}

// 获取用户某天的总结数据
export const getSum=({user_id,sum_time})=>{
  console.log(111)
  console.log(user_id)
  console.log(sum_time)
  return instance({
    method: 'get',
      url: '/sum/aSum/'+user_id+'/'+sum_time,
  });
}

// 新增总结数据
export const addSum=({user_id,sum_content,sum_time})=>{
  let data = {
    user_id,
    sum_content,
    sum_time
  }
  console.log(Qs.stringify(data)+"总结数据");

  return instance({
    method: 'post',
    url: '/sum/addSum',
    data: Qs.stringify(data)
  });
}
// 删除总结日记
export const deleteSum=(sum_id)=>{

  return instance({
    method: 'delete',
    url: '/sum/deleteSum/'+sum_id,
  });
}
// 修改总结

export const uploadSum=({sum_id,sum_content})=>{
  let data = {
    sum_id,
    sum_content
  }
  console.log(Qs.stringify(data)+"数据传递");
  return instance({
    method: 'put',
    url: '/sum/updateSum',
    data: Qs.stringify(data)
  });
}