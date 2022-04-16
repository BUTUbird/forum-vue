<template>
  <div>
    <div class="mb-5">
      <Header></Header>
    </div>

    <div class="container context">
      <router-view :key="this.$route.fullPath" v-if="isRouterAlive"></router-view>
    </div>

    <div>
<!--      <Footer></Footer>-->
    </div>
  </div>
</template>

<script>
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  provide() {
    return {
      reload: this.reload
    };
  },
  data(){
    return{
      isRouterAlive: true
    };
  },
  methods: {
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive=true;
      })
    },
    init_WebSocket(){
      //允许连接的数组
      let path = this.$route.path;
      let path_list = ["/"]
      if(path_list.includes(path)){
        let user = JSON.parse(localStorage.getItem('user'))
        if (user){
          this.webSocket.initWebSocket(user.id)
        }
      }
    }
  },
  watch:{
    $route:{
      handler(){
        let token = localStorage.getItem('token');
        if (token){
          this.init_WebSocket();
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 500px;
}
</style>
