<template>
  <div class="accountList"> 
    <HeaderTop title="清单" >
        <span slot="right" class="add_habit" @click="addAccount">
          <i class="iconfont icon-21"></i>
        </span>
    </HeaderTop>
     <div class="dealRecord-wrap">
      <div style="height:42.5px"></div>
      <div class="title-contant" v-for="(item,index) in items " >
  
        <div class="title" >
  
          <div class="count_title .ellipsis" @click="addAccountDetail(index)">{{item.count_title}}</div>
  
          <div class="number" @click="showHide(index)"><i></i></div>
          <!-- <div class="number"><i></i></div> -->
        </div>
  
        <div class="contant">
  
          <ul>
  
            <!-- <li v-for="i in item.allNumber"> -->
            <li v-for="i in lists" >
              {{i.count_title}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Account v-if="showAccount"></Account>
    
  </div>  
</template>

<script>
import HeaderTop from '../../components/HeaderTop'
import Account from '../../components/account/addAccount'
export default {
   components: {
    HeaderTop,
    Account
  },
  data() {
    return {
      showAccount:false,
      items:[
        {id:0,count_title:"去香港"},
 
        {id:1,count_title:"去澳门"},
 
        {id:2,count_title:"去北京"},
 
      ],
      lists:[
        {id:1,count_title:"已恢复后恢复后恢复后恢复后恢复恢复后恢复恢复"},
 
        {id:2,count_title:"暖呼呼而恢复饿啊额发大水"},
 
        {id:3,count_title:"怒放和读书差的可华山珑城加党徽"},
 
      ],
    }
  },
  created(){
    document.body.style.backgroundColor = '#f6f6f6';
  },
  mounted(){
 
    for(var i=0;i<3;i++){  //这里取值自后台返回的长度,设置页面渲染完成后是否展开，此处不展开
 
      document.getElementsByClassName('contant')[i].style.height = '0px';
 
    }
 
  },
  methods: {
    showHide(index){  //点击展开收起
 
      let contant = document.getElementsByClassName('contant')[index];  //这里我们通过参数index来让浏览器判断你点击的是哪一个列表  
 
      let height = contant.getBoundingClientRect().height;  //获取页面元素的当前高度
 
      document.getElementsByTagName('i')[index+1].style.transform = !!height?'rotateX(0deg)':'rotateX(180deg)';
 
      if (!!height) {
 
      contant.style.height = height + 'px';
 
      let f = document.body.offsetHeight; //强制相应dom重绘，使最新的样式得到应用
 
      contant.style.height = '0px';
 
      } else {
 
      contant.style.height = 'auto';
 
      height = contant.getBoundingClientRect().height;
 
      contant.style.height = '0';
 
      let f = document.body.offsetHeight;
 
      contant.style.height = height + 'px';
 
      }
    },
    // 显示添加组件
    addAccount(){
      this.showAccount=true
    },
    addAccountDetail(index){
      console.log(index);
      this.$router.push({
        path:'/detailList',
        query:{
          account_id:index
        }
      })
    },
  },

   beforeDestroy(){
    document.body.style.backgroundColor = '#fff';
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
  .count_title
    width: 300px;
    display: block;
    height: 30px;
    margin-top: 20px;
    line-height: 1.5em;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  .title
    text-align: justify;
    display: flex;
</style>
<style type="text/scss" lang="scss" scoped>
.dealRecord-wrap{margin-bottom: 100px;
 
  .title-contant{overflow: hidden;  /* 这个是重点 */
 
    .title{
      height: 70px;
      padding: 0 24px;
      border-bottom: 1px solid #eaeaea;/*px*/
 
      h3{
        height: 84px;font-size: 28px;color: #333;display: flex;align-items: center;float: left;;margin-left: 10px;}
 
      .number{
        float: right;
        margin-top: 25px;}
 
      .number i{display: inline-block;width: 23px;height: 13px;background: url('../../assets/icon_dropup@2x.png');background-repeat: no-repeat;background-size: 23px 13px;background-position: right 6px center;padding-right: 35px;display: flex;align-items: center; float: right;transform:rotateX(0deg);}
 
    }
 
    .contant{background: #fff;transition: height 1s;  /* 这个也是重点 */
 
      ul li{padding: 0 24px;height: 90px;display: flex;align-items: center;}
 
      ul li:not(:last-child){border-bottom: 1px solid #f6f6f6;/*px*/}
    }
  }
}
</style>
