import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";
import error from "../components/error.vue";
import login1 from "@/views/admin/login"
import Calendar from "@/views/calendar/index"
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
      name: "login1",
      component: login1,
      beforeEnter: (to, from, next) => {
        let token = window.sessionStorage.getItem("token");
        if (token) {
          next("/home");
        } else {
          next();
        }
      }
    },
    {
      path:'/calendar',
      component:Calendar,
      meta:{
          showFooter:true
      }
    },
    {
      path:'/habit',
      component:Habit,
      meta:{
          showFooter:true
      }
    },
    {
      path:'/count',
      component:Count,
      meta:{
          showFooter:true
      }
    },
    {
      path:'/sum',
      component:Sum,
      meta:{
          showFooter:true
      }
    },
    {
      path:'/timeHabit',
      component:timeHabit,
      meta:{
          showFooter:false
      }
    },
    // {
    //   path: "/home",
    //   name: "主页",
    //   components: {
    //     header,
    //     home,
    //     tab
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    //   // 需要登录才能访问
    // },
    // {
    //   path: "/note",
    //   name: "note",
    //   components: {
    //     note,
    //     tab
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: "/mine",
    //   name: "mine",
    //   components: {
    //     mine,
    //     tab
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    
    // },
    // {
    //   path: "/register",
    //   name: "register",
    //   components: {
    //     register
    //   },
    //   beforeEnter: (to, from, next) => {
    //     let token = window.sessionStorage.getItem("token");
    //     if (token) {
    //       console.log("丘桂娴" + token);
    //       next("/home");
    //     } else {
    //       next();
    //     }
    //   }
    // },

    // {
    //   path: "/search",
    //   name: "search",
    //   components: {
    //     search
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: "/more",
    //   name: "more",
    //   components: {
    //     more
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: "/detail/:id",
    //   name: "detail",
    //   components: {
    //     detail
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // //6月9日加

    // {
    //   path: "/todo",
    //   name: "todo",
    //   components: {
    //     todo
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: "/write",
    //   name: "write",
    //   components: {
    //     write
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: "/notes/:id",
    //   name: "notes",
    //   components: {
    //     notes
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: "/collect",
    //   name: "collect",
    //   components: {
    //     collect
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    // },

    // {
    //   path: "/about",
    //   name: "about",
    //   components: {
    //     about
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: "/edit",
    //   name: "edit",
    //   components: {
    //     edit
    //   },
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: "/adminlogin",
    //   name: "adminlogin",
    //   component: adminlogin
    // },
    // {
    //   path: "/admin",
    //   name: "admin",
    //   components: {
    //     admin,
    //     user1,
    //   },
    //   redirect: "/user1",
    //   children: [
    //     {
    //       path: "/user1",
    //       name: "user1",
    //       component: user1
    //     },
    //     {
    //       path: "/user2",
    //       name: "user2",
    //       component: user2
    //     }
    //   ],
    //   meta: {
    //     requiresAuth: true
    //   }
    // },

    // /////////////
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
