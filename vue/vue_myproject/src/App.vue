<template>
  <div id="app"  >
    <router-view v-if="isRouterAlive"/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<style lang="less">
html,body,#app{
      height: 100%;
      background-color: #FAFAFA;
    }

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import FooterGuide from './components/FooterGuide'
export default {
  name:'app',
  provide() {
    return {
      reload: this.reload
    };
  },
  components:{
        FooterGuide
    },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
