<template>
  <div class="columns py-6">
    <div class="column is-half is-offset-one-quarter">
      <el-card shadow="never">
        <div slot="header" class="has-text-centered has-text-weight-bold">
          用户登录
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
            <el-form-item label="账号" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pass">
              <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="验证码" prop="code">
              <el-col :span="12">
              <el-input v-model="ruleForm.code"
                        autocomplete="off"
              ></el-input>
              </el-col>
              <el-col :span="12">
<!--                Onclick="this.src='http://localhost:8000/user/verify?d='+new Date()*1-->
                <img width="160px" :src="code_url" @click="changeCode"/>
              </el-col>
            </el-form-item>

            <el-form-item label="记住" prop="delivery">
              <el-switch v-model="ruleForm.rememberMe"></el-switch>
              <router-link :to="{name:'mail'}">
                <span class="is-size-6" style="float: right">忘记密码？</span>
              </router-link>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>

import {getVerify} from "@/api/auth/auth";

export default {
  name: "Login",
  data() {
    return {
      code_url:'',
      redirect: undefined,
      loading: false,
      ruleForm: {
        name: "",
        pass: "",
        code: "",
        rememberMe: true,
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.code_url = process.env.VUE_APP_SERVER_URL+'/user/verify'
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
              .dispatch("user/login", this.ruleForm)
              .then(() => {
                this.$message({
                  message: "恭喜你，登录成功",
                  type: "success",
                  duration: 2000,
                });
                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: this.redirect || "/" });
                }, 0.1 * 1000);
              })
              .catch(() => {
                this.loading = false;
              });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeCode(){
        this.code_url = this.code_url+'?d='+new Date()*1
    }

  }
}
</script>

<style scoped>

</style>
