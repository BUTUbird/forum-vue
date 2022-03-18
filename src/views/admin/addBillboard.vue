<template>
  <article class="media">
    <div class="media-content">
      <form @submit.prevent="onSubmit">
        <b-field>
          <b-input
            v-model.lazy="NoticeText"
            type="textarea"
            maxlength="400"
            placeholder="Add a Notice......"
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
import { insertOne } from '@/api/billboard'

export default {
  name: 'addBillboard',
  data() {
    return {
      NoticeText: '',
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      insertOne(this.NoticeText).then(() => {
              this.$message({
                message: "添加成功",
                type: "success",
                duration: 2000,
              });
              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: this.redirect || "/first/billboard" });
              }, 0.1 * 1000);
            })
  }
}
}
</script>
