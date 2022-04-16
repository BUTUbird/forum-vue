<template>
  <div style="margin: 5px">
    <el-timeline>
      <el-timeline-item :timestamp=" comment.createTime | date " placement="top">
        <el-card>
          <div class="media-content">
            <div class="content">
              <el-row>
                <div class="block" style="float: left">
                  <el-avatar shape="square" :size="50" :src="comment.avatar"></el-avatar>
                </div>
                <strong>{{ comment.username }}</strong>&nbsp;
                <el-tag v-show="comment.roleId === 1" size="mini">管理员</el-tag>
                <a v-show="user.id === comment.userId" style="float: right;margin-left: 5px">
                  <span class="tag" @click="delete_comment(comment.id)">删除</span>
                </a>
                <a style="float: right">
                  <span class="tag" @click="sendMsg">回复</span>
                </a>
              </el-row>
              <br/>
              <vue-markdown v-highlight>{{ comment.content }}</vue-markdown>
            </div>
          </div>
          <div v-if="comment.children" style="margin: 5px">
            <div v-for="(child,index) in comment.children" :key="index">
              <div>
                <el-timeline>
                  <el-timeline-item :timestamp=" child.createTime | date " placement="top">
                    <el-card>
                      <div style="float: left">
                        <div style="width:600px;float: left">
                          <el-row>
                            <figure class="media-left image is-48x48" style="float: left">
                              <img :src="child.avatar">
                            </figure>
                            <strong>{{ child.username }}</strong>&nbsp;
                            <el-tag v-show="child.roleId === 1" size="mini">管理员</el-tag>
                            <a v-show="user.id === child.userId" style="float: right;margin-left: 5px">
                              <span class="tag" @click="delete_comment(child.id)">删除</span></a>
                          </el-row>
                          <br/>
                          <vue-markdown v-highlight>{{ child.content }}</vue-markdown>
                        </div>
                      </div>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>


    <div>
      <ChildrenComment :comment_info="comment_info"
                       :ChildrenCommentFlag.sync="ChildrenCommentFlag"/>
    </div>
  </div>

</template>

<script>

import {mapGetters} from "vuex";
import ChildrenComment from "@/components/Comment/ChildrenComment"
import 'vditor/dist/index.css'
import VueMarkdown from 'vue-markdown'
import {delete_comment, pushComment} from "@/api/comment";

export default {
  name: 'LvCommentsItem',
  components: {
    VueMarkdown,ChildrenComment
  },
  inject: ["reload"],
  props: {
    comment: {
      type: Object,
      required: true
    },
    ChildrenCommentFlag:{
      default:false
    }
  },
  data() {
    return {
      ChildrenCommentFlag:false,
      formLabelWidth: '120px',
      ChildrenContentEditor: {},
      ChildrenCommentText:'',
      isLoading: false,
      comment_info:{
        content_parent_id:'',
        content_parent_user_name:'',
      }
    }
  },
  computed: {
    ...mapGetters([
      'token', 'user'
    ]),

  },
  created() {
    this.comment_info.content_parent_id = this.comment.id;
    this.comment_info.content_parent_user_name = this.comment.username;
  },

  methods: {
    sendMsg(){
      this.ChildrenCommentFlag = true;
    },
    delete_comment(id) {
      delete_comment(id).then(res => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.reload()
        }
      })

    },
  }
}
</script>
<style>
#content_p {
  min-height: 150px;
}

.content {
  height: auto;
}
</style>

