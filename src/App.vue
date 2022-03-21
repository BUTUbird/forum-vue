<template>
  <div>
    <div class="mb-5">
      <Header></Header>
    </div>

    <div class="container context">
      <router-view :key="this.$route.fullPath" v-if="isRouterAlive"></router-view>
    </div>

    <div>
      <Footer></Footer>
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
    }
  },
}
</script>

<style scoped>
.container {
  min-height: 500px;
}
</style>
