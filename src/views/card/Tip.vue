<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>每日一言</span>
    </div>
    <div>
      <div class="has-text-left block">
        {{tip.content}}
      </div>
      <div class="has-text-right mt-5 block">
        {{tip.author}}
      </div>
    </div>
  </el-card>
</template>

<script>

import {getTodayTip} from "@/api/tip";
import {getVerify} from "@/api/auth/auth";

export default {
  name: "Tip",
  data() {
    return{
      tip:{
        // content: "",
        // author:""
      }
    }
  },
  created() {
    this.fetchTodayTip();
  },
  methods:{
    fetchTodayTip(){
      getTodayTip().then(response =>{
        const {data} = response
        this.tip = data
      })
    },
  }
}
</script>
