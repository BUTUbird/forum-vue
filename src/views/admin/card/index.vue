<template>
<div>
  <section>
    <count></count>
    <userInfo></userInfo>
     <eCharts></eCharts>
     <Post></Post>
  </section>
</div>
</template>

<script>
import eCharts from "@/views/admin/card/echar/echar"
import Post from "@/views/admin/card/echar/post"
import userInfo from "@/views/admin/card/userInfo";
import count from  "@/views/admin/card/count";
export default {
  name: "index",
  components:{
    eCharts,userInfo,count,Post
  }
  }

</script>

<style scoped lang="scss">
@import './index.scss';
</style>
