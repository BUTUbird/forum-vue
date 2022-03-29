<template>
  <div class="columns py-6">
    <div class="column is-half is-offset-one-quarter">
      <el-card shadow="never">
        <div slot="header" class="has-text-centered has-text-weight-bold">
          您正在重置{{userInfo.username}}的密码
        </div>
        <div>
          <el-form
              v-loading="loading"
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
          >
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pass">
              <el-input
                  type="password"
                  v-model="ruleForm.rePassword"
                  autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>

import {getUser, resetPassword} from "@/api/auth/resetPwd";
export default {
  name: "ResetPwd",
  data() {
    return {
      loading: false,
      userInfo:{
        id:'',
        username:''
      },
      token: this.$route.params.token,
      ruleForm:{
        password:'',
        rePassword:'',
        username:''
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        rePassword: [
          { required: true, message: "请重新输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    }
  },
  created() {
    this.getUserInfo()
  },
  methods:{
    // 初始化
    getUserInfo(){
      getUser(this.$route.params.token).then(response => {
        console.log(response.data)
        this.userInfo = response.data
        this.ruleForm.username = this.userInfo.username

      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          resetPassword(this.ruleForm).then(res=>{
            alert(res.message)
            setTimeout(() => {
              this.loading = false;
              this.$router.push({ path: this.redirect || "/" });
            }, 0.1 * 1000);
          }).catch(() => {
            this.loading = false;
          });
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
