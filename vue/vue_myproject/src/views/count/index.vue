<template>
  <div class="accountList"> 
    <HeaderTop title="清单" >
        <span slot="right" class="add_habit" @click="addAccount">
          <i class="iconfont icon-21"></i>
        </span>
    </HeaderTop>
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
      showAccount:false
    }
  },
  methods: {
    // 显示添加组件
    addAccount(){
      this.showAccount=true
    }
  },
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
</style>

