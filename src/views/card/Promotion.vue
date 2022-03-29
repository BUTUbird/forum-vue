<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>推广</span>
    </div>
    <div>
      <el-button type="primary" v-for="(item,index) in list" :key="index" class="block" plain>
        <a :href="item.link" target="_blank">{{item.title}}</a>
      </el-button>
    </div>
  </el-card>
</template>

<script>

import {getList} from "@/api/promote";

export default {
  name: "Promotion",
  data() {
    return{
      list:[]
    }
  },
  created() {
    this.fetchList();
  },
  methods:{
    fetchList(){
      getList().then((response)=>{
        const {data} = response
        this.list = data
      })
    }
  }
}
</script>
