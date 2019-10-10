import * as types from "./../types"


const state = {
  token: window.sessionStorage.getItem('token'),
  userInfo: {},
  loginStatus: false,
  errroStatus: '',
  num:'',
}

const mutations = {
  getNum(state, value) {
    //获取num值
    state.num = value;
    console.log(state.num);
  },
  [types.LOGIN]: (state, value) => {
    state.token = value;
  },
  [types.USERINFO]: (state, value) => {
    state.userInfo = value;
  },
  [types.LOGINSTATUS]: (state, bool) => {
    state.loginStatus = bool;
  },
  [types.ERRORSTATUS]: (state, value) => {
    state.errroStatus = value;
  }
};
  
export default {
    state,
    // getters,
    // actions,
    mutations
}