<template>
  <el-dialog
    :title="'回复'+comment_info.content_parent_user_name"
    :visible.sync="visible"
    :close-on-click-modal="false"
    @close="ChildrenCommentClose">

    <el-input
        type="textarea"
        autosize
        placeholder="请输入回复内容"
        v-model="child_comment.child_comment_content">
    </el-input>
    <span slot="footer" class="dialog-footer">
        <el-button @click="ChildrenCommentClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>

  </el-dialog>

</template>
<script>


import {pushChildComment, pushComment} from "@/api/comment";

export default {
  name: "ChildrenComment",
  props:{
    comment_info:{
      type: Object,
      required: true
    },
    ChildrenCommentFlag:{
      default: false
    }
  },
  data() {
    return {
      ChildrenContentEditor: {},
      ChildrenCommentText:'',
      visible: false,
      child_comment:{
        content_parent_id: '',
        child_comment_content:''
      }
    }
  },
  methods:{
    ChildrenCommentClose(){
      this.$emit("update:ChildrenCommentFlag", false);
    },
    async onSubmit() {
      try {
        let postData ={}
        postData['content_parent_id'] = this.comment_info.content_parent_id;
        postData['child_comment_content'] = this.child_comment.child_comment_content;
        pushChildComment(postData);
        this.$message.success('留言成功')
      } catch (e) {
        this.$buefy.toast.open({
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
        this.ChildrenCommentFlag = false
      }
    }

  },
  watch:{
    ChildrenCommentFlag(){
        this.visible = this.ChildrenCommentFlag;
    }
  },
}
</script>

<style scoped>

</style>
