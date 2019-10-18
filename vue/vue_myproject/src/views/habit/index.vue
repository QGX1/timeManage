<template>
  <div id="habit_index">
    <HeaderTop title="习惯养成" >
        <span slot="right" class="add_habit" @click="addhabit">
          <i class="iconfont icon-21"></i>
        </span>
    </HeaderTop>
    <section>
      <div>
        <el-row :gutter="12" >
          <el-col :span="8"  >
            <el-card shadow="always" v-for="(item,index) in habitList"
            data-type="0" 
            v-bind:style="{ 
              'background-image': 'url(' + item.habit_img + ')',
              'background-repeat':'no-repeat',
              'background-size':'cover' }"           
              >
              <div class="list-box"  :data-index="item.habit_id"  @click="habitDetail">
                <span class="habit_content">{{item.habit_title}}</span>
                <span class="habit_time">{{item.habit_time}}分钟</span>
              </div>
              <div class="delete" @click="deleteItem" :data-index="item.habit_id">
                <i class="iconfont icon-shanchu"></i>
              </div>
            </el-card>
            
          </el-col>
        </el-row>
      </div>
    </section>
    <addHabit v-show="showAddHabit"
    @listenAddHabitEvent="showAdd"
    ></addHabit>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop'
import addHabit from '../../components/habit/addHabit'
import {getHabit,deleHabit} from '../../api/index.js'
export default {
  components: {
    HeaderTop,
    addHabit
  },
  inject:['reload'],//注入reload方法
  name:'habit_index',
  data() {
    return {
      showAddHabit:false,
      user_id:this.$store.state.users.userInfo.user_id,
      habitList:[
        {
          habit_id:1,
          habit_title:"点击头部右上角+号添加习惯",
          habit_time:'20',
          habit_img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570628096328&di=f31064dcdebb9f3ea8bedefa9e201e7e&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3803113224%2C475803562%26fm%3D214%26gp%3D0.jpg'
        },
        {
          habit_id:2,
          habit_title:"点击X删除当条记录",
          habit_time:'30',
          habit_img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571222634&di=3dd9f4642640bad9d330e86464d03288&imgtype=jpg&er=1&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201407%2F10%2F092251yjc3igpaozadcgj6.jpg'
        },
        {
          habit_id:3,
          habit_title:"学习英语",
          habit_time:'10',
          habit_img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571222899&di=2b17551ef6b0b9d020e9e60998494686&imgtype=jpg&er=1&src=http%3A%2F%2Ft-1.tuzhan.com%2Fa56da66ed445%2Fc-2%2Fl%2F2014%2F01%2F27%2F02%2F456dc5bfa57d4bd89944a9bce17351db.jpg'
        },
        {
          habit_id:4,
          habit_title:"期待您的开发",
          habit_time:'1',
          habit_img:'http://img4.imgtn.bdimg.com/it/u=1764553209,2062397641&fm=26&gp=0.jpg'
        }
      ]
    }
  },
  methods: {
    // 显示添加日程组件
    addhabit(){
      console.log(this.showAddHabit)
      this.showAddHabit=true
    },
    showAdd(obj){
      console.log(obj)
      this.showAddHabit=!obj
    },
    habitDetail(e){
      // 当前索引
      let index = e.currentTarget.dataset.index
      this.$router.push({
        path:'/timeHabit',
        query:{
          index
        }
      })
    },
    // 删除习惯数据
    deleteItem(e){
      // 当前索引
      let index = e.currentTarget.dataset.index;
      deleHabit(index).then(res=>{
        console.log(res)
        if(res.data.code===0){
          this.reload()
        }
      })
      
    },
    // 获取用户数据
    getHabitList(){
      console.log('重新加载数据')
      getHabit(this.user_id).then(res=>{
      if(res.data.SelectHabit.length!=0){
        this.habitList=[...res.data.SelectHabit];
      }
    })
    }
  },
  // 页面加载时，获取数据
  mounted(){
    console.log("获取用户数据")
    console.log(this.user_id)
    getHabit(this.user_id).then(res=>{
      if(res.data.SelectHabit.length!=0){
        this.habitList=[...res.data.SelectHabit]
      }
    })
  },
  // 页面初始化加载数据
  created(){
     
  }
}

</script>

<style lang="stylus" scoped>
.add_habit
  margin-left 330px
  top 0px
  display block
  position absolute
  .icon-21
    color black 
    font-size 30px !important 
.el-row
  width 100%
  .el-col-8 {
    width: 98%;
    margin-left: 10px;
    margin-top: 50px;
    height: 550px;
    overflow: auto;
  }  
  .el-card 
    display: flex
    margin-top: 4px
    height: 100px;
  .list-box
    width 300px
    .habit_content 
      color: #fafafa;
      margin-top 10px
      color: #fafafa;
      margin-top: 10px;
      font-weight: bolder;
      line-height: 1.5rem;
      letter-spacing: 2px;
      display: block;
      text-align: left;
    .habit_time
      color: #fafafa;
      display block
      margin-top 10px
      color: #fafafa;
      margin-top: 10px;
      font-weight: bolder;
      line-height: 1.5rem;
      letter-spacing: 2px;
      margin-left: -240px;
  .delete
    width: 30px;
    height: 1.6rem;
    background: #85b777e8;
    font-size: 17px;
    color: #fff;
    text-align: center;
    line-height: 1.6rem;
    position: relative;
    top: -76px;
    right: -304px;
</style>


