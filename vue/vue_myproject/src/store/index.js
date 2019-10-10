import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

Vue.use(Vuex);

// import mutations from './mutations.js'
import actions from './actions.js'
import users from './modules/user'


export default new Vuex.Store({
    //mutations,
    actions,
    // 加载对应的vuex模块
    modules:{
        users
    }
});

