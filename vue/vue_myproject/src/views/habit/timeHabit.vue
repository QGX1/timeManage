<template>
    <div class="container">
        <div id="app">
            <div class="study">开始学习</div>
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
export default {
  data() {
      return{
        timer: null,
        totalTime: (25 * 60),
        resetButton: false,
        title: "Countdown to rest time!",
        edit: false,
        userTime: 25,
        diameter: 200,
        totalPomodoro: 4
      }
  },
  methods: {
    startTimer: function() {
      this.timer = setInterval(() => this.countdown(), 1000); //1000ms = 1 second
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
      this.resetButton = false;
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
      return this.padTime(seconds);
    }
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
            background-color: #222831;
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
