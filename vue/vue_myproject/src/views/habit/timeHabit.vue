<template>
    <div class="container" 
       v-bind:style="{ 
              'background-image': 'url(' + habit_img + ')',
              'background-repeat':'no-repeat',
              'background-size':'cover' }"  
    >
      <span class="gobackHabit" @click="gobackHabit">
        <i class="iconfont icon-houtui"></i>
      </span>
        <div id="app">

            <div class="study">{{study}}</div>
            <div class="timer">
                <span class="minute">{{ minutes }}</span>
                <span>:</span>
                <span class="seconds">{{ seconds }}</span>
            </div>
            <div class="controls">
                <div class="start" v-if="!timer" @click="startTimer">
                    <i class="iconfont icon-kaishi1"></i>
                </div>
                <div class="pause"  v-if="timer" @click="stopTimer">
                    <i class="iconfont icon-weibiaoti--"></i>
                </div>
                <div class="stop" v-if="resetButton" @click="resetTimer">
                    <i class="iconfont icon-shuaxin "></i>
                </div>
                <div class="edit" v-if="!timer" @click="editTimer">
                    <i class="iconfont icon-bianji1"></i>
                </div>
            </div>
            <div class="input">
                <transition name="fade">
                    <input type="text" v-if="edit" v-model="userTime">
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import {oneHabit} from '../../api/index.js'
import { Notification } from 'element-ui'
import {uploadHabit} from '../../api/index.js'
export default {
  data() {
      return{
        timer: null,
        totalTime:'',
        resetButton: true,
        title: "Countdown to rest time!",
        edit: false,
        userTime: 25,
        diameter: 200,
        totalPomodoro: 4,
        study:'',
        habit_img:'',
        habit_id:0
      }
  },
  mounted(){
    let that=this;
    that.getData();
  },
  methods: {
    // 完成消息提醒框
    notify(){
      Notification ({
         title: 'Info',
          message: '已完成',
          showClose: false,
          type:'success',
          position:'bottom-left',
          offset: 100
      })
    },
    // 获取习惯详情
    getData(){
      console.log(this.$router.currentRoute.query.index)
      let habit_id=this.$router.currentRoute.query.index;
      oneHabit(habit_id).then(res=>{
        console.log(res)
        this.totalTime=res.data.aHabit.habit_time*60;
        this.study=res.data.aHabit.habit_title;
        this.userTime=res.data.aHabit.habit_time;
        this.habit_img=res.data.aHabit.habit_img;
        this.habit_id=res.data.aHabit.habit_id;
      })
    },
    // 返回前一页
    gobackHabit(){
      this.$router.go(-1)
      // this.$options.methods.notify()
      
    },
    startTimer: function() {
     this.timer = setInterval(() => {
       this.countdown()
       if((this.minutes==0)&&(this.seconds==0)){
          clearInterval(this.timer)
          this.$options.methods.notify();
          this.timer=null
        }
       }, 1000)
      this.resetButton = true;
      this.edit = false;
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer: function() {
      this.totalTime = (this.userTime * 60);
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      console.log('修改用户输入的时间')
      let uploadHabitDate={
          habit_id:this.habit_id,
          habit_title:this.study,
          habit_time:this.userTime,
          habit_img:this.habit_img
      }    
      console.log(uploadHabitDate)
      uploadHabit(uploadHabitDate).then((res)=>{
        console.log(res)
      }

      )
    },
    editTimer: function() {
      this.edit = !this.edit;
    },
    padTime: function(time){
      return (time < 10 ? '0' : '') + time;
    },
    countdown: function() {
      this.totalTime--;
    }
  },
  computed: {
    minutes: function(){
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.totalTime - (this.minutes * 60);
      console.log(12212121)
      console.log(seconds)
      console.log(this.minutes)
      return this.padTime(seconds);
    }
  },
  // 数据监听
  watch:{
   
  }
}
</script>

<style lang=scss>
    $primary-color: #FD7014;
    $secondary-color: #393E46;
    $background-color: #222831;
    $text-color: #EEEEEE;

    html {
    font-size: 10px;
    }

    .container {
        height: 100vh;
        width: 100%;
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        background-color: $background-color;
        #app {
            display: flex; 
            flex-direction: column;
            align-items: center;
            background-color: #2d22680a;
            height: auto;
            & > * {
            margin-bottom: 2rem;
        }
    }
    .study{
        color: #EEEEEE;
        font-size: 17px;
    }
    .timer {
        font-size: 9rem;
        color: $text-color;
    }
    .controls {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        > * {
        color: $primary-color;
        transition: 0.1s ease;
        &:hover {
            cursor: pointer;
            transform: scale(1.2);
        }
        }
    }
    .input {
        input {
        background-color: $secondary-color;
        border: none;
        font-size: 2rem;
        padding: 1em;
        text-align: center;
        color: $text-color;
        }
        .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to {
        opacity: 0;
        }
    }
    }
</style>

<style lang="stylus" scoped>
  .gobackHabit
    color #eeeeee;
    color: #eee;
    position: absolute;
    top: 0px;
    left: 0px;
    .icon-houtui
      font-size 40px

</style>
