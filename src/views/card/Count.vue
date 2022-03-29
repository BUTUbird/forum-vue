<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header">
      <span>☕ 统计</span>
    </div>
    <div>
      <ul>
        <li class="mb-3">社区会员:<el-tag size="small">{{ count.users }}</el-tag>人</li>
        <li class="mb-3">在线人数: <el-tag size="small">{{ count.line }}</el-tag> 人</li>
        <li class="mb-3">主题数: <el-tag size="small">{{ count.posts }} </el-tag>个</li>
        <li class="mb-3">标签数: <el-tag size="small">{{ count.tags }} </el-tag>个</li>
        <li class="mb-3">回帖数: <el-tag size="small">{{ count.comments }} </el-tag>条</li>
      </ul>
    </div>
  </el-card>
</template>

<script>

import {getCount} from "@/api/billboard";

export default {
  name: 'Count',
  data() {
    return {
      count: {},
    }
  },
  created() {
    this.getCount()
  },
  mounted() {
    // 初始化
    // this.init()
  },
  destroyed() {
    // 销毁监听
    // this.socket.onclose = this.onclose
  },
  methods: {

getCount(){
  getCount().then(res => {
    this.count = res.data
  })
}

      }
    }

</script>

<style scoped>

</style>
