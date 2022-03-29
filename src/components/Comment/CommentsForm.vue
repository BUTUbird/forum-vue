<template>
  <article class="media">
    <div class="media-content">
      <form @submit.prevent="onSubmit">
        <b-field>
<!--          <b-input-->
<!--            v-model.lazy="commentText"-->
<!--            type="textarea"-->
<!--            maxlength="400"-->
<!--            placeholder="写一条评论吧"-->
<!--            :disabled="isLoading"-->
<!--          ></b-input>-->
          <!--Markdown-->
          <div id="vditor"></div>
        </b-field>
        <nav class="level">
          <div class="level-left">
            <b-button
              type="is-primary"
              native-type="submit"
              class="level-item"
              :disabled="isLoading"
            >
              评论
            </b-button>
          </div>
        </nav>
      </form>
    </div>
  </article>
</template>

<script>
import { pushComment } from '@/api/comment'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'LvCommentsForm',
  data() {
    return {
      contentEditor: {},
      commentText: '',
      isLoading: false
    }
  },
  props: {
    slug: {
      type: String,
      default: null
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      try {
        let postData = {}
        this.commentText = this.contentEditor.getValue()
        console.log(this.commentText)
        postData['content'] = this.commentText
        postData['topic_id'] = this.slug
        await pushComment(postData)
        this.$emit('loadComments', this.slug)
        this.$message.success('留言成功')
      } catch (e) {
        this.$buefy.toast.open({
          message: `Cannot comment this story. ${e}`,
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
        this.contentEditor.setValue('')
      }
    }
  },
  mounted() {
    this.contentEditor = new Vditor('vditor', {
      height: 200,
      placeholder: '此处为评论内容……',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      mode: 'sv',
      upload:{
        accept:'image/jpg, image/png',//规定上传格式
        url: process.env.VUE_APP_SERVER_URL+'/upload', //接口
        multiple: false,
        fieldName:'file',
        max:1024 * 1024,
        //extraData:{token:'123445'},
        linkToImgUrl:process.env.VUE_APP_SERVER_URL+'/upload',
        filename(name) {
          console.log(name)
          return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').replace(
              /[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').replace('/\\s/g', '')
        },
        format(val,msg){
          let responseData = JSON.parse(msg)
          console.log(responseData)
          return JSON.stringify({
            msg:'',
            code: responseData.code,
            data:{
              errFiles:[],
              succMap:{
                [responseData.data]:responseData.data
              }
            }
          })
        }
      },
    })
  },
}
</script>
