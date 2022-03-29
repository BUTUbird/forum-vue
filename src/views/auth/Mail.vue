<template>
  <div class="columns py-6">
    <div class="column is-half is-offset-one-quarter">
      <el-card shadow="never">
        <div slot="header" class="has-text-centered has-text-weight-bold">
          请输入邮箱
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
            <el-form-item label="邮箱" prop="mail">
              <el-input v-model="ruleForm.mail"></el-input>
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
import {findMail} from "@/api/auth/resetPwd";
export default {
  name: "Mail",
  data() {
    return {
      loading: false,
      ruleForm:{
        mail:''
      },
      rules: {
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            trigger: "blur",
          },
        ],
      },
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          findMail(this.ruleForm.mail).then(res=>{
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
