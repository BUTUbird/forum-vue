<template>
  <article class="media">
    <figure class="media-left image is-48x48">
      <img :src="comment.avatar">
    </figure>
    <div class="media-content">
      <div class="content">
          <strong>{{ comment.username }}</strong>
          <small class="ml-2">{{ comment.createTime | date }}</small>
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
export default {
  name: 'LvCommentsItem',
  components:{
    VueMarkdown
  },
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
    getContent() {

      console.log()
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

