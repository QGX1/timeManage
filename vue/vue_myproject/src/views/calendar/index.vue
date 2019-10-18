<template>
    <div>
        <HeaderTop title="日程" >
            <router-link slot="left" to="/search" class="header_search">
                <i class="iconfont icon-icon_xinyong_xianxing_jijin-"></i>
            </router-link>
            <span slot="right" class="hearder_login" @click="exit">
                <span class="hearder_login_text">退出登录</span>
            </span>
        </HeaderTop>
         <div class="block" >
            <el-date-picker
              v-model="gotoDay"
              type="date"
              placeholder="选择日期"
              value-format='yyyy-MM-dd'
              @change="gotoPast"
              size='small'
             >
            </el-date-picker>
          </div>
       <FullCalendar
        class='demo-app-calendar'
        ref="fullCalendar"
        :plugins="calendarPlugins"
        :all-day-slot="true"
        all-day-text="全天"
        contentHeight=200
        event-limit=3
        :header="{
          left: 'hiddent',
          center: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          right: 'title'
        }"
        aspectRatio=0.7
        :slot-event-overlap="false"
        :button-text="{
          today: '今天'
        }"
        :unselect-auto="false"
        :select-overlap="false"
        :business-hours="{
          startTime: '00:00',
          endTime:'24:00',
          daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0 ]
        }"
        :select-allow="handlerSeelctAllow"
          select-mirror="true"
          selectable="true"
          slot-duration="00:30"
          slot-label-format="HH:mm"
          title-format="YYYY年MM月D日"
          defaultView="timeGridWeek"
          locale="zh-cn"
          :buttonText="buttonText"
          @dateClick="handleDateClick"
          @eventClick="handleEventClick"
          :events="calendarDataList"
          
        />
      <addCalendar v-show="showAddCalendar" 
      @listenAddCalendarEvent='showAdd'
      :selectTime='selectTime'
      ></addCalendar>
      <!-- <detailCalendar v-show="showDetailCalendar" 
        @listenDetailCalendarEvent='showDetail'
        :calendarInfo='calendarInfo'
      ></detailCalendar> -->
      <!-- <Calendar></Calendar> -->
    </div>
  
</template>

<script>


import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list'
import '@fullcalendar/core/locales/zh-cn' // 支持中文
import momentPlugin from '@fullcalendar/moment'
import moment from "moment"
import interactionPlugin from '@fullcalendar/interaction'
import HeaderTop from '../../components/HeaderTop'
// import Calendar from '../../components/calendar/index'
import addCalendar from '../../components/calendar/addCalendar'
// import detailCalendar from '../../components/calendar/detailCalendar'
import {getCalendar} from '../../api/index.js'
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    HeaderTop,
    addCalendar,
    // detailCalendar
  },
  data() {
     return {
      calendarPlugins: [
        dayGridPlugin,
         timeGridPlugin, 
         momentPlugin, 
         listGridPlugin,
         interactionPlugin],
      handlerSeelctAllow: info => {
        const currentDate = new Date()
        const start = info.start
        const end = info.end
        return (start <= end && start >= currentDate)
      },
      calendarWeekends: true,
      calendarEvents: [ // initial event data
        { title: 'Event Now', start: new Date() }
      ],
      buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '天',
          list:'列表'
          },
      calendarDataList:[],
      showAddCalendar:false,
      ca_id:0,
      gotoDay:'',
      selectTime:'',
      user_id:this.$store.state.users.userInfo.user_id,
      calendarInfo:{}
    }
  },
  methods: {
    // 登出
    exit(){
      console.log("退出登录")
      this.$store.dispatch('logOut')
        // console.log(res)
        this.$router.push({
          path:'/'
      })
    },
    getCalendarEvents(info, successCallback, failureCallback){
      let events=[
        ...this.calendarEvents,
        {
          title: info.startStr,
          start: info.start.valueOf(),
        }
      ]
      successCallback(events)
    },
    // 点击日程事件显示详情
     handleEventClick (info) {
      // this.showDetailCalendar=true;
      this.ca_id=info.event.id;
      console.log("传递数据")
      console.log(this.ca_id)
      this.$router.push({
        path:'/detailCalendar',
        query:{
          ca_id:this.ca_id
        }
      })
    },
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    // 跳转到选择的日期
    gotoPast() {
      let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
      calendarApi.gotoDate(this.gotoDay) // call a method on the Calendar object
    },
    // 点击显示添加日程数据组件
    handleDateClick(arg) {
      this.showAddCalendar=true;
      var time=moment(arg.date).format("YYYY-MM-DD hh:mm:ss");
      this.selectTime=time;
      // console.log(this.selectTime);
    },
    // 控制添加组件的显示
    showAdd(data){
      // console.log(data);
      this.showAddCalendar=false;
      // console.log(this.showAddCalendar)
    },
    // // 控制查看详情组件的显示
    //  showDetail(data){
    //   // console.log(data);
    //   this.showDetailCalendar=false;
    //   // console.log(this.showDetailCalendar)
    // },
    showColose(data){
      console.log(data);
      this.showAddCalendar=false;
    },
    // 获取数据
    getCalendarData(){
      getCalendar(this.user_id).then(res=>{
        console.log("日程数据")
        console.log(res)
        this.calendarDataList=res.data.SelectCalendar;
        console.log(this.calendarDataList) 
      })
    }
  },
  // 页面加载添加数据
  mounted() {
    this.getCalendarData();    
  },
}

</script>
<style lang='scss'>

    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
    @import '~@fullcalendar/timegrid/main.css';
    @import '~@fullcalendar/list/main.css';
    .demo-app-top {
        margin: 0 0 3em;
        }
    .demo-app-calendar {
        margin: 0 auto;
        max-width: 900px;
        overflow-y: hidden;
        height: 600px;
    }
    .fc-view-container{
      
      height: 500px ;
    }
</style>
<style>

</style>

<style lang="stylus" scoped>
      .icon-icon_xinyong_xianxing_jijin-
          font-size: 30px;
          margin-top 0px
          margin-left 10px
          // position absolute
          float left
      .block
        margin-top: 110px;
        position: absolute;
        margin-left: 118px;
      .el-date-editor.el-input, .el-date-editor.el-input__inner
        width 150px !important 
      
      .searchIcon
          margin-top 20px
          height 100%
          width 30px
          
      .hearder_login
          right 10px
          top 15px
          position absolute
          z-index 100
      .swiper-container 
          height: 200px;
          border 1px solid rgb(219,219,221);
    
      .swiper-slide {
          display: flex;
          float: left;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
      }
      a.link_to._food 
          margin-bottom 10px
          margin-top 10px
      .fc-dayGridMonth-button fc-button fc-button-primary
        margin 10px
</style>
