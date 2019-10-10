<!-- autor:刘炽辉 --> <!--后台管理导航--> 
<template>
    <div>
        <el-container >
            <el-header class="main-header">
                <el-dropdown>
                   <!-- 超级管理员 -->
                    <span class="el-dropdown-link">
                        <img src="@/assets/logo.png" alt="">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
        </el-container>
        <el-container class="main">
            <el-aside :width="tabWidth+'px'">
                <div>
                    <div class="isClossTab" >
                      <!-- @click="isClossTabFun" -->
                        <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" ></i>
                    </div>
                      <!-- :collapse="isCollapse" 该语句控制选项卡显示和隐藏 -->
                    <el-menu :class="'menu'"
                             default-active="1"
                             ctive-text-color="#ffd04b"
                             class="el-menu-vertical-demo"
                             @open="handleOpen"
                             @close="handleClose"
                           
                             background-color="#545c64"
                             text-color="#fff"
                             active-text-color="#ffd04b">
                         <router-link to="user1">   
                        <el-menu-item index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span slot="title">用&nbsp;&nbsp;&nbsp;&nbsp;户</span>
                            </template>
                            <!-- <el-menu-item-group>
                            <router-link to="user1"><el-menu-item index="1-1">选项1</el-menu-item></router-link>   
                            <router-link to="user2"><el-menu-item index="1-2">选项2</el-menu-item></router-link>
                            </el-menu-item-group> -->
                        </el-menu-item>
                        </router-link>
                        <router-link to="user2">    
                        <el-menu-item index="2" v-show=isShow>
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">管理员</span>
                            </template>
                            <!-- <el-menu-item-group>
                               <router-link to="user3"><el-menu-item index="2-1">选项1</el-menu-item></router-link>   
                               <router-link to="user4"><el-menu-item index="2-2">选项2</el-menu-item></router-link>
                            </el-menu-item-group> -->
                        </el-menu-item>
                        </router-link>
                    </el-menu>
                </div>
            </el-aside>
            <el-main >
                    <div>            
                        <router-view></router-view>
                    </div>
            </el-main>
        </el-container>
    </div>
</template>
<style>
* {
  padding: 0;
  margin: 0;
}
</style>
<style scoped lang="scss">
$header-height: 60px;
$background-color: #545c64;
$color: #fff;

.main-header {
  background-color: $background-color;
  color: $color;

  .el-dropdown {
    cursor: pointer;
    float: right;
  }
  .el-dropdown-link {
    img {
      $imgMargin: (($header-height - 50)/2);
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      background-color: #fff;
      margin-top: $imgMargin;
    }
  }
}

.main {
  height: 100vh;
  min-width: 800px;
  min-height: 600px;
  overflow: hidden;

  aside {
    overflow: visible;
    height: 100%;
    background-color: $background-color;
    color: $color;
    .isClossTab {
      width: 100%;
      height: $header-height;
      cursor: pointer;
      font-size: 25px;
      text-align: center;
      line-height: $header-height;
      font-weight: bold;
      border-right: 1px solid #807c7c;
      box-sizing: border-box;
    }
    .menu {
      width: 100%;
      border-right: 0;
    }
  }
  .crumbs {
    margin-bottom: 20px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      getValue1: "",
      isCollapse: false,
      tabWidth: 200,
      test1: 1,
      intelval: null,
      isShow: true
    };
  },
  created() {
    this.getValue1 =this.$store.state.users.num;
    // this.getValue1 = this.$route.query.num;
    if (this.getValue1 == 2) {
      this.isShow = false;
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // isClossTabFun() {
    //   clearInterval(this.intelval);
    //   if (!this.isCollapse) {
    //     this.intelval = setInterval(() => {
    //       if (this.tabWidth <= 64) clearInterval(this.intelval);
    //       this.tabWidth -= 1;
    //     }, 1);
    //   } else {
    //     this.tabWidth = 200;
    //   }
    //   this.isCollapse = !this.isCollapse;
    // },

    logout() {
      console.log("logout");
      this.$store.dispatch("logOut");
      this.$router.push({
        path: "/adminlogin"
      });
    }
  }
};
</script>
