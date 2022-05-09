<template>
  <section>
    <el-card shadow="never">
      <div slot="header">
        个人设置
      </div>
      <div class="columns">
        <div class="column is-full">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基础信息" name="first">
              <el-form :label-position="labelPosition" label-width="100px" :model="user">
                <el-form-item label="账号">
                  <el-input v-model="user.username" disabled />
                </el-form-item>
                <el-form-item label="昵称">
                  <el-input v-model="user.alias" />
                </el-form-item>
                <el-form-item label="简介">
                  <el-input v-model="user.bio" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="头像" name="second">
<!--              <figure class="image is-48x48">-->
<!--                <img :src="user.avatar">-->
<!--              </figure>-->
              <el-upload
                  class="avatar-uploader"
                  :action="uploadURL"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                <img v-if="user.avatar" :src="user.avatar" class="avatar"></img>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">点击上传头像，只能上传jpg/png文件，且不超过1mb</div>
              </el-upload>

            </el-tab-pane>
            <el-tab-pane label="电子邮箱" name="third">
              <el-form ref="dynamicValidateForm" :model="user" label-width="100px" class="demo-dynamic">
                <el-form-item
                  prop="email"
                  label="邮箱"
                  :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]"
                >
                  <el-input v-model="user.email" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                  <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="手机号" name="fourth">
              <el-form ref="dynamicValidateForm" :model="user" label-width="100px" class="demo-dynamic">
                <el-form-item>
                  <el-input v-model="user.mobile" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                  <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import {getInfo, update} from '@/api/user'
import {upload} from "@/api/file";
import {getToken} from "@/utils/auth";

export default {
  name: 'Setting',
  data() {
    return {
      headers:{},
      uploadURL:'',
      activeName: 'first',
      labelPosition: 'right',
      user: {
        id: '',
        username: '',
        alias: '',
        bio: '',
        email: '',
        mobile: '',
        avatar: ''
      }
    }
  },
  created() {

    this.fetchInfo()
    this.uploadURL = process.env.VUE_APP_SERVER_URL+'/user/uploadImg/'
    this.headers={Authorization :  'Bearer ' + getToken()}

  },
  methods: {
    fetchInfo() {
      getInfo(this.$route.params.username).then(res => {
        console.log(res)
        const { data } = res
        this.user = data
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm(formName) {
      console.log(this.user)
      update(this.user).then(res => {
        this.$message.success('信息修改成功')
        this.fetchInfo()
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    //事件处理器
    handleAvatarSuccess(res, file) {//上传头像
      if(res.code == 200){
        this.user.avatar = res.data;
        this.user.head_start = 1;
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
    upload(file){
      upload(file).then(res=>{
        this.user.avatar = res.data;
      })
    }
  }
}
</script>

<style scoped>

</style>
