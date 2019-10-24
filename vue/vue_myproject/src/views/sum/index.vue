<template>
  <div id="sum">
    <div class="header">
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          value-format='yyyy-MM-dd'
          >
        </el-date-picker>
      </div>
      <div class="topright" @click = "dialogTableVisible = true">  
        <span v-bind:class="[fontIcon1,color1]"></span>   
        <span v-bind:class="[fontIcon2,color1]"></span> 
      </div>
    <div>
      
      
      </div>
    </div>
    <el-dialog
      title="选择今天的天气" :visible.sync="dialogTableVisible" width="95%" center>
      <span :class="[item,fontColor1]" v-for="(item,a) in icon" @click="weather(item,a)" style="align:center">
      
      </span>
      </br>
      <span class="titleclass">选择今天的心情</span>
      </br>
      <span :class="[item,fontColor2]" v-for="(item,b) in icon1" @click="mooth(item,b)" style="align:center">
      
      </span>


      <span slot="footer" class="dialog-footer" @click="confirm()">确定</span>
    </el-dialog>

   <div class="content">
     <div v-for="(item,index) in sumdata" :key="index" class="text item">
        <el-card class="box-card">
          <textarea class="sumConton" @blur.prevent="changeCount(item)" :data-index="item" v-model="item.sum_content">

          </textarea >
          <span class="sumDelete" @click="sumDelete" :data-index="item.sum_id">
            <i class="iconfont icon-shanchu1"></i>
          </span>
        </el-card>
      </br>
     </div>
  </div>
  

  <span class="footclass">
    <mu-button fab color="teal" @click="addSum">
      <mu-icon value="add"></mu-icon>
    </mu-button>
  </span>
  
  </div>
</template>

<script>
import {getSum,addSum,deleteSum,uploadSum} from '../../api/index.js'
import moment from "moment"
import { showLoading, hideLoading } from '../../api/loading';
export default {
  name: 'sum',
  inject:['reload'],//注入reload方法
  data () {
    return {
     user_id:this.$store.state.users.userInfo.user_id,
      fontColor1:'fontColor1',
      fontColor2:'fontColor2',
      name1:'',
      name2:'',
      color1:'color1',
      fontIcon1:'iconfont icontaiyang-copy',
      fontIcon2:'iconfont iconxiaolian',
      value1:'',//时间
      sum_content:"点击编辑你今天的总结",
      sumdata:[],
      dialogTableVisible: false,
      icon:['iconfont icontaiyang-copy','iconfont iconduoyun','iconfont iconicon--',
      'iconfont iconweather_rain_light_big','iconfont icondayu','iconfont iconleiyu',
      'iconfont iconxue','iconfont iconwu'],
      icon1:['iconfont iconbiaoqing','iconfont iconxiaolian','iconfont iconbiaoqing1',
      'iconfont iconbqxiao','iconfont iconxiaolian','iconfont iconshangxinbiaoqing',
      'iconfont iconshengqibiaoqing','iconfont iconxiaolian']
    }
  },

  methods:{
    // 修改数据
    changeCount(item){
      console.log(item)
      let sumInfo={
        sum_id:item.sum_id,
        sum_content:item.sum_content
      }
      uploadSum(sumInfo).then(res=>{
        console.log(res)
      })
    },
    // 删除
    sumDelete(e){
      let sum_id=e.currentTarget.dataset.index;
      let sum_time=this.value1;
      deleteSum(sum_id).then(res=>{
        console.log(res);
        this.getSumData();
        this.value1=sum_time
      })
    },
    // 增加
    addSum(){
      let sumInfo={
        user_id:this.user_id,
        sum_content:this.sum_content,
        sum_time:moment(this.value1).format("YYYY-MM-DD 00:00:00")
      }
      addSum(sumInfo).then(res=>{
        console.log(res);
        this.value1=sumInfo.sum_time;
        this.getSumData();
        // this.reload()       
      })
    },
    openNew:function(){
      console.log("6666")
    },
    weather(name,a){
      this.name1 = name
      this.index1 = a
      console.log(a)
      for(var i=0;i<this.icon.length;i++){
        document.getElementsByClassName('fontColor1')[i].style.color = '#ddd'
      }
      document.getElementsByClassName('fontColor1')[a].style.color = '#000'
    },
    mooth(name,a){
      this.name2 = name
      this.index2 = a
      console.log(a)
      for(var i=0;i<this.icon1.length;i++){
        document.getElementsByClassName('fontColor2')[i].style.color = '#ddd'
      }
      document.getElementsByClassName('fontColor2')[a].style.color = '#000'
    },
    confirm(){
      this.fontIcon1 = this.name1
      this.fontIcon2 = this.name2
      this.dialogTableVisible = false
    },
    getSumData(){
      let sumInfo={
        user_id:this.user_id,
        sum_time:moment(this.value1).format("YYYY-MM-DD")
      }
      showLoading();
      getSum(sumInfo).then((res)=>{
        console.log(res)
        this.sumdata=res.data.sumdata
        hideLoading();
      })
    }
  },
  // 页面初始化时请求数据
  mounted() {
    this.value1=new Date()
    this.getSumData();
  },
  // 监听数据变化,发送新的请求
  watch: {
    value1(newValue1,oldValue1){
      console.log(this.value1)
      this.getSumData();
    }
  },
}
</script>

<style scoped>
.content{
  width: 100%;
    height: 600px;
    overflow: auto;
}
.sumConton{
  border:none;
  width:100%;
  height:100px;
  overflow-y: auto;
  margin-top: 30px;

}
.icon-shanchu1{
  color:coral}
.titleclass{
  display: block;
  text-align: center;
  margin: 15px 0;
  font-size: 16px;
}

.color1{
  color:#DDDDDD;
  font-size:18px;
}
.fontColor1,.fontColor2{
  color:#DDDDDD;
  font-size:30px;
  width: 25%;
  display: inline-block;
  text-align: center;
  margin-bottom: 15px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.el-date-editor{
  float:left;
}
/*elementsUI卡片有无边框边框*/
.el-card.is-always-shadow{
  box-shadow: 0px 12px 12px -15px rgba(0,0,0,.1);
  border-width:0px;
}



</style>

<style scoped>
.iconfont{
  font-size:30px;
}
.topright{
    float: right;
    background-color: #009688;
    width: 41.3%;
    height: 40px;
}
.icontaiyang-copy.color1 {
    font-size: 30px;
    padding: 20px;
}
.iconxiaolian.color1{
   font-size: 30px;
    padding: 20px;
}
.icon-shanchu1 {
    font-size: 24px;
}
.header{
  width: 100%;
  position: fixed;
  overflow:hidden;
  border-bottom: 1px solid #EBEEF5;
}
>>>.el-input__inner{
  border-width:0px;
}
.content{
  
}
>>>.el-dialog{
  border-radius:12px;
  width: 85%!important;
}
>>>.el-dialog__title{
    font-size: 16px;
    color: #AAAAAA;
}

>>>.el-dialog__body{
  font-size: 14px;
  color: #AAAAAA;
}

>>>.el-button{
  padding: 5px 15px;
}

>>>.el-button--primary{
  color:#444444;
  background-color:#AAAAAA;
  border-color:#AAAAAA;
  width: 100%;
}

>>>.el-dialog__footer{
  height: 35px;
  background: #f2f2f2;
  line-height: 35px;
  padding:0px;
}
 .active{
   background:#000;
 } 

 .footclass{
     bottom: 150px;
    position: fixed;
    float: right;
    right: 20px;
 }
 span.sumDelete {
    float: right;
}
</style>
