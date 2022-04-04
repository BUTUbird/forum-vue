<template>
  <article class="media">
    <figure class="media-left image is-48x48">
      <img :src="comment.avatar">
    </figure>
    <div class="media-content">
      <div class="content">
        <el-row>
          <strong>{{ comment.username }}</strong>&nbsp;
          <el-tag v-show="comment.roleId === 1" size="mini">管理员</el-tag>
          <small class="ml-2">{{ comment.createTime | date }}</small>
        <a v-show="user.id === comment.userId"  style="float: right">
              <span
                  class="tag"
                  @click="delete_comment(comment.id)"
              >删除</span>
        </a>
        </el-row>
          <br />
        <!--Markdown-->
<!--        <vue-markdown  :source="comment.content"></vue-markdown>-->
        <vue-markdown  v-highlight>{{comment.content}}</vue-markdown>
<!--        {{comment.content}}-->
      </div>
    </div>
  </article>
</template>

<script>

import {mapGetters} from "vuex";
import Vditor from "vditor";
import VueMarkdown from 'vue-markdown'
import {delete_comment} from "@/api/comment";
export default {
  name: 'LvCommentsItem',
  components:{
    VueMarkdown
  },
  inject: ["reload"],
  props: {
    comment: {
      type: Object,
      required: true
    },
  },
  computed: {
    ...mapGetters([
      'token', 'user'
    ]),
  },
  created() {
    this.renderMarkdown(this.comment.content)
    console.log()
  },
  mounted() {

  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById('content_p'), md, {
        hljs: {style: 'github'}
      })
    },

    delete_comment(id){
      delete_comment(id).then(res=>{
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.reload()
        }
      })

    }
  }
}
</script>
<style>
#content_p {
  min-height: 150px;
}
.content{
  height: auto;
}
</style>

