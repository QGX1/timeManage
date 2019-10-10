// 头部公共组件
<template>
    <div>
        <header class="header">
            <slot name="left"></slot>
            <span class="header_title">
                <span class="header_title_text ellipsis">{{title}}</span>
            </span>
            <slot  name="right"></slot>
        </header>
    </div>
</template>

<script>
export default {
    props:{
        // 父组件传值给子组件使用props
        title:String
    }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
    .header
        position fixed
        background-color:#85b777;
        height  :40px
        position filed
        z-index 100
        left 0
        top 0
        width 100%
    .header_title
        margin-left 45%
    .header_title_text 
        text-align center
        display block
        width 50%
        margin-left 25%
        margin-top -7px
        vertical-align middle
        font-size 18px
</style>


