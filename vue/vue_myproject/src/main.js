import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css' 
import Mint from 'mint-ui';
import MuseUI from 'muse-ui';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'qs'
import 'muse-ui/dist/muse-ui.css';
import   "font-awesome.css"
import '../src/assets/iconfont/iconfont.css'
import axios from 'axios'
import Vuex from 'vuex';
import moment from 'moment'
import $ from 'jquery'
Vue.use(Vuex);
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs;
//全局过滤器
Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
  //es5函数参数设置默认值
  //const lastFormatString = formatString || ''

  
   // moment(input) 把时间字符串转成时间对象
   // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
  return moment(input).format(formatString)
})
//import initRichText from '../common/Editor.js'
 
//Vue.use(initRichText)

const ToastOption = {
  position: 'top', // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: 'close', // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: 'check_circle', // 成功信息图标
  infoIcon: 'info', // 信息信息图标
  warningIcon: 'priority_high', // 提醒信息图标
  errorIcon: 'warning' // 错误信息图标
}
import Toast from 'muse-ui-toast';
Vue.use(Toast, ToastOption);

import Message from 'muse-ui-message';
import 'muse-ui-message/dist/muse-ui-message.css';

Vue.use(Message);
Vue.config.productionTip = false
Vue.use(Mint); 
Vue.use(MuseUI);
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$qs = qs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')