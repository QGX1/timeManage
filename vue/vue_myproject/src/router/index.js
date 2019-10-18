import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";
import error from "../components/error.vue";
import login from "@/views/admin/login"
import Calendar from "@/views/calendar/index"
import detailCalendar from "@/views/calendar/detailCalendar"
import Habit from "@/views/habit/index"
import timeHabit from "@/views/habit/timeHabit"
import Count from "@/views/count/index"
import Sum from "@/views/sum/index"

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: login,
      beforeEnter: (to, from, next) => {
        let token = window.sessionStorage.getItem("token");
        if (token) {
          next("/calendar");
        } else {
          next();
        }
      }
    },
    {
      path:'/calendar',
      component:Calendar,
      meta:{
          showFooter:true,
          requiresAuth:true
      }
    },
    {
      path:'/habit',
      component:Habit,
      meta:{
          showFooter:true,
          // requiresAuth:true
      }
    },
    {
      path:'/count',
      component:Count,
      meta:{
          showFooter:true,
          // requiresAuth:true
      }
    },
    {
      path:'/sum',
      component:Sum,
      meta:{
          showFooter:true,
          // requiresAuth:true
      }
    },
    {
      path:'/timeHabit',
      component:timeHabit,
      meta:{
          showFooter:false,
          // requiresAuth:true
      }
    },
    {
      path:'/detailCalendar',
      component:detailCalendar,
      meta:{
          showFooter:false,
          // requiresAuth:true
      }
    },
    {
      path: "/error",
      name: "error",
      component: error
    },
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/error"
    }
  ]
});

router.beforeEach((to, from, next) => {
  //路由中设置的needLogin字段就在to当中
  //let token = window.localStorage.getItem('token') 获取token localStorage
  //在sessoinStorage中获取token
  let token = window.sessionStorage.getItem("token");
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      //store.dispatch('getUser')
      next();
    } else {
      // 没有登录,重定向到登录页面
      store.dispatch("logOut");
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
