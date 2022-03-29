<template>
  <el-card class="" shadow="never">
    <div slot="header">
      <span class="has-text-weight-bold">热度排行</span>
      <span class="has-text-weight-bold" style="float: right">浏览量</span>
    </div>
    <div>
      <p v-if="index<6" v-for="(item,index) in hot" :key="index" :title="item.title" class="block ellipsis is-ellipsis-1" style="width: 100%">
        <router-link :to="{name:'post-detail',params: { id: item.id }}">
          <span v-if="index<5" class="tag">
            0{{ parseInt(index) + 1 }}
          </span>
          <span v-else class="tag" style="text-align: right">
            {{ parseInt(index) + 1 }}
          </span>
          {{ item.title }}

          <el-tag size="small" style="float: right">
            {{item.views}}
          </el-tag>
        </router-link>
      </p>
    </div>
  </el-card>
</template>

<script>
import {getHot} from '@/api/post'

export default {
  name: 'Recommend',
  props: {
    topicId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      hot:[]
    }
  },
  created() {
    // this.fetchRecommendTopics()
    this.fetchHot()
  },
  methods: {
    // fetchRecommendTopics() {
    //   getRecommendTopics(this.topicId).then(value => {
    //     const { data } = value
    //     this.recommend = data
    //   })
    // }
    fetchHot() {
      getHot().then(value => {
        console.log(value)
        this.hot = value.data

      })
    }
  }
}
</script>

<style scoped>

</style>
