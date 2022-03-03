<template>
  <div>
    <div class="mb-5">
      <Header></Header>
    </div>

    <div class="container context">
      <router-view :key="this.$route.fullPath"></router-view>
    </div>

    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<style>

</style>
<script>
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
export default {
  components: {Header,Footer}
}
</script>
