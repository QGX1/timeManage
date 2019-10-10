<template>
    <div class="loginContainer">
        <div class="loginInner">
            <div class="login_hearder">
                <h2 class="login_logo">NEED</h2>
                <div class="login_hearder_title">
                    <a href="javascript:;" @click="setLoginWay(true)" :class="{on:loginWay}" >登录</a>
                    <a href="javascript:;" @click="setLoginWay(false)" :class="{on:!loginWay}">注册</a>
                </div>
            </div>
            <comlogin v-if="loginWay"></comlogin>
            <comregister v-else class="comregister" @listenRegisterEvent="showLogin"></comregister>
        </div>
    </div>
</template>

<script>
import comlogin from "../../components/admin/comlogin.vue"
import comregister from "../../components/admin/comregister.vue"
export default {
    data(){
        return{
            loginWay:true,
        }
    },
    components:{
        comlogin,
        comregister
    },
    methods: {
        setLoginWay(loginWay){
            this.loginWay=loginWay
        },
        showLogin(data){
            // console.log(data)
            this.loginWay=data
        }
    },

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .loginContainer
        width 100%
        height 100%
        overflow hidden
        background-color #ffffff
        .loginInner
            padding-top 20%
            width 80%
            text-align center
            margin 0 auto
            .login_hearder
                .login_logo
                    font-size 40px
                    font-weight bold 
                    color #02a774   
                    text-align center
                .login_hearder_title
                    padding-top 10%
                    text-align center      
                    >a
                        color #333
                        font-size 16px
                        margin-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #02a774
                            font-weight 700
                            padding-bottom 5rpx
                            border-bottom 2px solid #02a774



</style>


