<template>
   <!-- 底部路由 -->
  <footer class="footer_guide border-1px"> 
    <!-- :class="{on:isCurrent("/miste")}"监听路径, 修改样式-->

      <div class="guide_item" @click="goto('/calendar')" :class="{on: isCurrent('/calendar')}">
      <span class="item_icon">
        <i class="iconfont icon-anquan"></i>
      </span>
      <span>日程</span>
    </div>

    <div class="guide_item" @click="goto('/habit')" :class="{on:isCurrent('/habit')}">
      <span class="item_icon">
        <i class="iconfont icon-5"></i>
      </span>
      <span>习惯</span>
    </div>

    <div class="guide_item" @click="goto('/count')" :class="{on:isCurrent('/count')}">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>清单</span>
    </div>

    <div class="guide_item" @click="goto('/sum')" :class="{on:isCurrent('/sum')}">
      <span class="item_icon">
        <i class="iconfont icon-xingming"></i>
      </span>
      <span>总结</span>
    </div>
  </footer>
</template>

<script>
  export default {
    methods: {
      goto(path) {
        this.$router.replace(path)
      },
      isCurrent(path) {
        // console.log(this.$route.path)
        return this.$route.path === path

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixins.styl"
  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0px
    background-color #fff
    width 100%
    height 60px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
          .iconfont
            font-size 22px
</style>