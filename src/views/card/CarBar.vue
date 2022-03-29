<template>
  <div>
    <section>
      <LoginWelcome></LoginWelcome>

      <Tip></Tip>

      <Promotion></Promotion>


      <Count></Count>
    </section>

  </div>
</template>

<script>
import LoginWelcome from "@/views/card/LoginWelcome";
import Promotion from "@/views/card/Promotion";
import Tip from "@/views/card/Tip";
import Count from "@/views/card/Count";

export default {
  name: "CarBar",
  components: {Promotion, LoginWelcome,Tip,Count},
  data() {
    return {
      return: {}
    }
  },
  created() {
  },
  methods: {}
}
</script>
