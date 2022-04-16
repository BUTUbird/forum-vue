<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>板块推荐</span>
    </div>
    <div>
      <div>
        <el-button type="primary" v-for="(item,index) in sections" :key="index" v-if="index < 4" class="block" plain style="width: 90px">
          <router-link :to="{ name: 'tag', params: { name: item.name } }">
            <a target="_blank">{{item.name}}</a>
          </router-link>
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import {getRecommendTags} from "@/api/tag";

export default {
  name: "Sections",
  data(){
    return{
      sections:[]
    }
  },
  created() {
    this.getSections()
  },
  methods:{
    getSections(){
      getRecommendTags().then(res=>{
        this.sections = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
