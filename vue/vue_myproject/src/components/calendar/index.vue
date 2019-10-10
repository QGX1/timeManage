<template>
  <div class="hello">
    <el-date-picker size='small' v-model="selectDate" type="month"
      placeholder="选择月" value-format="yyyy-MM">
    </el-date-picker>
    <el-button size='small' @click='changeDate'>确定</el-button>
    <full-calendar  
      :config="config" 
      :events="events"
      ref="calendar" 
      @event-selected='eventClick' 
      @day-click="dayClick">
    </full-calendar> 
    <add-schedule v-if="isAdd" :isAdd='isAdd' :editItem='editItem' @add='addItem' @close='isAdd = false'></add-schedule>
  </div>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
import addSchedule from '@/components/calendar/add.vue'
export default {
   data () {
    return {
      isAdd:false,
      selectDate:'',//日期选择器选中的月份
      config: {
        firstDay:'0',//以周日为每周的第一天
        // weekends: true,//是否在日历中显示周末
        locale: 'zh-cn',//语言
        defaultView: 'month',//默认按月显示
        height: 'auto',//高度
        fixedWeekCount:false,//是否固定显示六周
        // weekMode:"liquid",//周数不定，每周的高度可变，整个日历高度不变
        allDaySlot:false,
        // allDay:true,
        header: {//表头信息
          left: 'prev, next, today',
          center: 'title',
          right: 'hide, custom'
        },
      },
      events: [{
        id:1,
        title:'出差',
        start:'2019-04-03',
        end:'2019-04-05'
      }, {
        id:2,
        title:'春游',
        start:'2019-04-12',
      }],
      newItem:{},
      editItem:{}
    }
  },
  components : { FullCalendar, addSchedule },
  methods:{
    changeDate(){
      // this.$refs.calendar.fireMethod('gotoDate', this.selectDate)
      this.$refs.calendar.fireMethod('prev');
    },
    eventClick(event){ //events的点击事件
      this.editItem = event
      this.isAdd = true
    },
    dayClick(date, jsEvent, view){ //日期的点击事件
      this.editItem = {}
      this.isAdd = true
    },
    addItem(detail){
      this.newItem = JSON.parse(detail)
      if(this.editItem.id){//如果是编辑，就删掉该条
        this.events.forEach( (el,ind)=>{
          if(el.id == this.editItem.id){
            this.events.splice(ind,1)
          }
        })
      }
      this.events.push({
        id : this.editItem.id?this.editItem.id:this.setUuid(),
        title : this.newItem.title,
        start : this.newItem.period[0],
        end : this.newItem.period[1],
      })
    },
    setUuid(){
        var s = [];
        var hexDigits = "0123456789abcdef";
        for(var i = 0; i < 36; i++){ s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); }
        s[14] = "4";  
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
        s[8] = s[13] = s[18] = s[23];
        var uuid = s.join("");
        return uuid;
    },
   
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
   <!-- <div class='demo-app'> -->
    
     <!-- <div class='demo-app-top'>
//       <button @click="toggleWeekends">toggle weekends</button>
//       <button @click="gotoPast">go to a date in the past</button>
//       (also, click a date/time to add an event)
//     </div> -->
     <!-- <FullCalendar
//       class='demo-app-calendar'
//       ref="fullCalendar"
//       defaultView="dayGridMonth"
//       :header="{
//         left: 'prev,next today',
//         center: 'title',
//         right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
//       }"
//       :plugins="calendarPlugins"
//       :weekends="calendarWeekends"
//       :events="calendarEvents"
//       @dateClick="handleDateClick"
//       />
//   </div> -->



 <script>
// import $ from 'jquery'
// require('webpack-jquery-ui')
// require('webpack-jquery-ui/css')
// import FullCalendar from '@fullcalendar/vue'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import '@fullcalendar/core/locales/zh-cn' // 支持中文
// import momentPlugin from '@fullcalendar/moment'
// import interactionPlugin from '@fullcalendar/interaction'
// export default {

//     name:'Schedule',
//     data(){
//         return {
            
//         }
//     },
//      mounted() {
//         this.showData()
//     },
//     methods: {
//         showData(){
//             $("#calendar_index").fullCalendar({ 
//                 header: { left: "title", center:'', right: "prev,title,next,"},
//                 // titleFormat: 'YYYY-MM-DD',
//                 defaultView:'month',//默认视图
//                 navLinks: true, // can click day/week names to navigate views
//                 editable: false, 
//                 eventLimit: true, // allow "more" link when too many events 
//                 eventLimitText: "更多",
//                 aspectRatio:2,//单元格宽高的比例，宽是高的2倍
//                 selectable: true,//允许选择事件                         
//             });
//             var odiv=$("<div class='today_div'></div>")
//             var p0=$("<p class='today_date'></p>").html(this.getTodaydate())
//             var p1=$("<p class='today_all'></p>").html(this.formatDate(new Date))
//             odiv.append(p0)
//             odiv.append(p1)
//             $(".right_calendar").append(odiv)
 
//             // $("#calendar_index .fc-right h2").html(odiv)
//         },
//         // 日期格式处理 年-月-日 星期-
//         formatDate(date){   
//           var year = date.getFullYear();
// 		  var month = date.getMonth() + 1;
// 		  month = month < 10 ? ('0' + month) : month;
//           var todaydate = date.getDate();
//           var day = date.getDay();
//           todaydate = todaydate < 10 ? ('0' + todaydate) : todaydate;
//           //星期大写
//           var dayCycleArray=["日","一","二","三","四","五","六"];
//             for(var i=0;i<7;i++){
//                 if(day==i){
//                     day=dayCycleArray[i];
//                 }
//             }
 
//           return year + '年' + month + '月' + todaydate + '日' + '  ' + '星期' + day;
//         },
//         //得到 今天 - 日 -
//         getTodaydate(){
//             var date = new Date();
//             var hours = date.getDate();
//             return hours
//         },
//     },
// }
// </script>



// <script>
// // import FullCalendar from '@fullcalendar/vue'
// // import dayGridPlugin from '@fullcalendar/daygrid'
// // import timeGridPlugin from '@fullcalendar/timegrid'
// // import '@fullcalendar/core/locales/zh-cn' // 支持中文
// // import momentPlugin from '@fullcalendar/moment'
// // import interactionPlugin from '@fullcalendar/interaction'
// // export default {
// //   components: {
// //     FullCalendar // make the <FullCalendar> tag available
// //   },
// //   data: function() {
// //     return {
// //       calendarPlugins: [ // plugins must be defined in the JS
// //         dayGridPlugin,
// //         timeGridPlugin,
// //         interactionPlugin // needed for dateClick
// //       ],
// //       calendarWeekends: true,
// //       calendarEvents: [ // initial event data
// //         { title: 'Event Now', start: new Date() }
// //       ]
// //     }
// //   },
// //   methods: {
// //     toggleWeekends() {
// //       this.calendarWeekends = !this.calendarWeekends // update a property
// //     },
// //     gotoPast() {
// //       let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
// //       calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
// //     },
// //     handleDateClick(arg) {
// //       if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
// //         this.calendarEvents.push({ // add new event data
// //           title: 'New Event',
// //           start: arg.date,
// //           allDay: arg.allDay
// //         })
// //       }
// //     }
// //   }
// // }
// </script>

// <style lang='scss'>
// // you must include each plugins' css
// // paths prefixed with ~ signify node_modules
// @import '~@fullcalendar/core/main.css';
// @import '~@fullcalendar/daygrid/main.css';
// @import '~@fullcalendar/timegrid/main.css';
// .demo-app {
//   font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
//   font-size: 14px;
// }
// .demo-app-top {
//   margin: 0 0 3em;
// }
// .demo-app-calendar {
//   margin: 0 auto;
//   max-width: 900px;
// }
// </style>
// <style>
// .right_small{ width:5.28rem; height:4.5rem; background: #ffffff; border-radius: 0.05rem; padding-left:0.28rem; padding-right:0.28rem; }
// /* 日历日程 */
//     /* 标题 */
// #calendar_index{ width:100%; height:4.5rem; border-bottom:1px solid #f5f4f7; }
// .right_calendar{ border-top:1px solid #e52355; position:relative;}
// #calendar_index .fc-toolbar.fc-header-toolbar{ margin-top:0.15rem; height:0.6rem; }
// #calendar_index .fc-left{ width:50%; border-right:1px solid #f5f4f7; }
// #calendar_index .fc-right{ width:50%; line-height: 0.6rem; font-weight:normal; padding-left:0.3rem; }
//   /* 标题左侧--今日 */
// .today_div{ position:absolute; left:0; top:0; z-index: 999; opacity: 1; background: #ffffff; margin:0.15rem 0 0 0.28rem; text-align: center; }
// .today_date{ color:#e52355; font-weight: lighter; font-size: 0.36rem; }
// .today_all{ color:#adadad; font-weight: lighter; font-size: 0.14rem; }
//   /* 标题右侧--左右键 */
// #calendar_index .fc-right h2{ color:#333333; font-weight: lighter; font-size: 0.2rem; margin:0 0.1rem 0 0.1rem; }
// #calendar_index .fc-right button{ border-radius: 50%; width:0.2rem; height:0.2rem; text-align: center; margin-top:0.2rem; background: #e8f0ff; }
// #calendar_index .fc-right span{ margin-left:-0.09rem!important; color:#5d93ff; line-height: 0.1rem; }
// #calendar_index .fc-right>div{ width:100%; display:flex; }
// #calendar_index .fc-grid .fc-day-number { float: left;padding: 0 0.02rem;text-align: center;background: red !important; width:100%; height:0.55rem;line-height: 0.55rem; }
// #calendar_index .fc-body{ height:2.88rem; }
// #calendar_index .fc-day-grid-container{ overflow-x: hidden!important; height: 2.7rem!important; overflow-y: hidden!important; border:none!important; }
//    /* table星期标题 */
// #calendar_index .fc-widget-header { margin:0!important; text-align: center; height:0.38rem; line-height: 0.38rem; font-size: 0.18rem; font-weight: normal; color:#333333; }
 
// #calendar_index .fc-basic-view .fc-body .fc-row{ height:0.42rem!important; }
// #calendar_index .fc-day-number{ float:left!important; }
// #calendar_index .fc .fc-row .fc-content-skeleton table, .fc .fc-row .fc-content-skeleton td, .fc .fc-row .fc-helper-skeleton td{ line-height: 0.4rem; border-color:#ffffff!important; }
// #calendar_index .fc-today{ background: #ffffff!important; }
// /*  */
// #calendar_index .fc-past a,#calendar_index .fc-future a{ display:inline-block; background: #ffffff!important; border-radius: 50%; width:0.35rem; height:0.35rem; text-align: center; margin-left:0.1rem; }
// #calendar_index .fc-today a{ display:inline-block; background: chartreuse!important; border-radius: 50%; width:0.35rem; height:0.35rem; text-align: center; margin-left:0.1rem;}
// #calendar_index .fc-unthemed .fc-content, .fc-unthemed .fc-divider, .fc-unthemed .fc-list-heading td, .fc-unthemed .fc-list-view, .fc-unthemed .fc-popover, .fc-unthemed .fc-row, .fc-unthemed tbody, .fc-unthemed td, .fc-unthemed th, .fc-unthemed thead{ border:none!important; }

 </style>
