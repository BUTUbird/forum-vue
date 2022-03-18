<template>
  <article class="media">
    <div class="media-content">
      <form @submit.prevent="onSubmit">
        <b-field>
          <b-input
            v-model.lazy="ruleForm.content"
            type="textarea"
            maxlength="200"
            placeholder="Add a content......"
            :disabled="isLoading"
          ></b-input>
        </b-field>
        <b-field>
        <b-input
            v-model.lazy="ruleForm.author"
            type="text"
            maxlength="20"
            placeholder="Add a author......"
            :disabled="isLoading"
            size="20"
          ></b-input></b-field>
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
import { insertOne } from '@/api/tip'

export default {
  name: 'addTip',
  data() {
    return {
        ruleForm: {
            content: "",
            author:"",
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
                this.$router.push({ path: this.redirect || "/first/tip" });
              }, 0.1 * 1000);
            })
  }
}
}
</script>
