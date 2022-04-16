<template>
  <div>
    <section>
      <LoginWelcome></LoginWelcome>

      <Sections></Sections>

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
import Sections from "@/views/card/Sections";

export default {
  name: "CarBar",
  components: {Sections, Promotion, LoginWelcome,Tip,Count},
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
