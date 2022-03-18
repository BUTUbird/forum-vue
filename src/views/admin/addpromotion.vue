<template>
  <article class="media">
    <div class="media-content">
      <form @submit.prevent="onSubmit">
           <b-field>
        <b-input
            v-model.lazy="ruleForm.title"
            type="text"
            maxlength="30"
            placeholder="广告商名......"
            :disabled="isLoading"
            size="30"
          ></b-input></b-field>
           <b-field>
        <b-input
            v-model.lazy="ruleForm.link"
            type="text"
            maxlength="75"
            placeholder="输入地址链接......"
            :disabled="isLoading"
            size="75"
          ></b-input></b-field>
        <b-field>
          <b-input
            v-model.lazy="ruleForm.description"
            type="textarea"
            maxlength="200"
            placeholder="添加描述......"
            :disabled="isLoading"
          ></b-input>
        </b-field>
        <nav class="level">
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
import { insertOne } from '@/api/promote'

export default {
  name: 'addPromotion',
  data() {
    return {
        ruleForm: {
            title: "",
            link:"",
            description:"",
            },
        isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      insertOne(this.ruleForm).then(() => {
              this.$message({
                message: "添加成功",
                type: "success",
                duration: 2000,
              });
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: this.redirect || "/first/promotion" });
              }, 0.1 * 1000);
            })
  }
}
}
</script>
