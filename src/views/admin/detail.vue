<template>
  <div class="columns">
    <!--文章详情-->
    <div class="column is-three-quarters">
      <!--主题-->
      <el-card
        class="box-card"
        shadow="never"
      >
        <div
          slot="header"
          class="has-text-centered"
        >
          <p class="is-size-5 has-text-weight-bold">{{ topic.title }}</p>
          <div class="has-text-grey is-size-7 mt-3">
            <span>{{ dayjs(topic.createTime).format('YYYY/MM/DD HH:mm:ss') }}</span>
            <el-divider direction="vertical" />
            <span>发布者：{{ topicUser.alias }}</span>
            <el-divider direction="vertical" />
            <span>查看：{{ topic.view }}</span>
          </div>
        </div>

        <div id="preview" />

        <nav class="level has-text-grey is-size-7 mt-6">
          <div class="level-left">
            <p class="level-item">
              <b-taglist>
                <router-link
                  v-for="(tag, index) in tags"
                  :key="index"
                  :to="{ name: 'tag', params: { name: tag.name } }"
                >
                  <b-tag type="is-info is-light mr-1">
                    {{ "#" + tag.name }}
                  </b-tag>
                </router-link>
              </b-taglist>
            </p>
          </div>
        </nav>
      </el-card>
    </div><back-top></back-top>
  </div>

</template>

<script>
import {detailOne } from '@/api/post'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import BackTop from "@/components/BackTop/BackTop";

export default {
  name: 'Detail',
  data() {
    return {
      flag: false,
      topic: {
        content: '',
        id: this.$route.params.id
      },
      tags: [],
      topicUser: {}
    }
  },
  components: {
    BackTop
  },
  mounted() {
    this.fetchTopic()
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById('preview'), md, {
        hljs: { style: 'github' }
      })
    },
    // 初始化
    async fetchTopic() {
      detailOne(this.$route.params.id).then(response => {
        const { data } = response
        document.title = data.topic.title
        this.topic = data.topic
        this.tags = data.tags
        this.topicUser = data.user
        this.renderMarkdown(this.topic.content)
        this.flag = true
      })
    },
  }
}
</script>

<style>
#preview {
  min-height: 300px;
}
</style>
