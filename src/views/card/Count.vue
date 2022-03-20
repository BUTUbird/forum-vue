<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header">
      <span>☕ 统计</span>
    </div>
    <div>
      <ul>
        <li class="mb-3">社区会员: {{ count.users }} 人</li>
        <li class="mb-3">在线人数: {{ count.line }} 人</li>
        <li class="mb-3">主题数: {{ count.posts }} 个</li>
        <li class="mb-3">标签数: {{ count.tags }} 个</li>
        <li class="mb-3">回帖数: {{ count.comments }} 条</li>
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
