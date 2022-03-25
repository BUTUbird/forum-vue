<template>
  <article class="media">
    <div class="media-content">
      <form @submit.prevent="onSubmit">
        <b-field>
          <b-input
              v-model.lazy="ruleForm.name"
              type="text"
              maxlength="30"
              placeholder="名称......"
              :disabled="isLoading"
              size="30"
          ></b-input></b-field>

        <el-upload
            :action="uploadURL"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <nav class="level" style="margin-top: 50px">
          <div class="level-left">
            <b-button
                type="is-primary"
                native-type="submit"
                class="level-item"
                :disabled="isLoading"
            >
              提交
            </b-button>
          </div>
        </nav>
      </form>
    </div>
  </article>
</template>

<script>
import { insertOne } from '@/api/carousel'
import {getToken} from "@/utils/auth";

export default {
  name: 'addCarousel',
  data() {
    return {
      headers:{},
      uploadURL:'',
      fileList: [],
      ruleForm: {
        name:"",
        url:""
      },
      isLoading: false
    }
  },
  created() {
    this.headers={Authorization :  'Bearer ' + getToken()},
        this.uploadURL = process.env.VUE_APP_SERVER_URL+'/user/uploadImg/'
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //事件处理器
    handleAvatarSuccess(res, file) {//上传头像
      console.log(res.code)
      if(res.code == 200){
        this.ruleForm.url = res.data;
      }else{
        this.$message.error('上传图片失败');
      }

    },
    beforeAvatarUpload(file) {//判断头像大小
      if (file == null){
        console.log("文件为空")
      }
      console.log("文件不为空"+file.size)
      const isJPG = file.type == 'image/png'||file.type=='image/jpg'||file.type=='image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 1;
      // console.log(file);
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      console.log("文件校验通过")
      return isJPG && isLt2M;
    },

    async onSubmit() {
      this.isLoading = true
      //console.log(this.ruleForm.url)
      if (this.ruleForm.url === null){
        alert("图片上传失败了");
      }
      insertOne(this.ruleForm).then(() => {
        //console.log(this.ruleForm)
        this.$message({
          message: "添加成功",
          type: "success",
          duration: 2000,
        });
        setTimeout(() => {
          this.loading = false;
          this.$router.push({ path: this.redirect || "/admin/carousel" });
        }, 0.1 * 1000);
      })
    }
  }
}
</script>
