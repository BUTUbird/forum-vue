<template>
  <div>
    <section>
      <LoginWelcome></LoginWelcome>

      <Tip></Tip>

      <Promotion></Promotion>
    </section>

  </div>
</template>

<script>
import LoginWelcome from "@/views/card/LoginWelcome";
import Promotion from "@/views/card/Promotion";
import Tip from "@/views/card/Tip";

export default {
  name: "CarBar",
  components: {Promotion, LoginWelcome,Tip},
  data: {
    return: {}
  },
  created() {
  },
  methods: {}
}
</script>
