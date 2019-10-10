<template>
    <div class="error">
        <mu-button fab large color="red" @click="logout" >
      <mu-icon value="android"></mu-icon>
    </mu-button>
    <p>重新登录</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            infotip:''
        }
    },
    computed:{
        errorinfo:function(){
                let info = this.$store.state.users.errroStatus;
                switch(info){
                    case 401:
                        this.infotip = '验证失败';
                        break; 
                    case 404:
                        this.infotip = '请求资源失败';
                        break;
                    default:
                        this.infotip = '未知错误';
                }
                return info;
        }
    },
    methods:{
        logout(){
                console.log("logout");
                this.$store.dispatch('logOut');
                this.$router.push({
                                path: '/'
                })
        }
    }
}
</script>
<style lang="scss" scoped>
    .error{
        margin: 0 auto;
        text-align: center;
        margin-top: 60%;
        height: 300px;
    }
</style>