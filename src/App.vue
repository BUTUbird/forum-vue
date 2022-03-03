<template>
  <div class="container ">
    <div class="mb-5">
      <Header></Header>
    </div>
    <router-view/>
  </div>
</template>

<style>

</style>
<script>
import Header from "@/components/Layout/Header";
export default {
  components: {Header}
}
</script>
