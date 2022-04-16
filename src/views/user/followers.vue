<template>
  <div>
    <el-card shadow="never">
      <article v-for="(follower, index) in followers" :key="index" class="media">
        <div class="media-content">
          <div class="">
          </div>
          <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
            <div class="level-left">
              <div class="level-left">
                <div class="media-left">
                  <figure class="image is-48x48" >
                    <img style="border-radius: 15px" :src="follower.avatar" alt="Placeholder image">
                  </figure>
                </div>
                <router-link class="level-item" :to="{ path: `/member/${follower.username}/home` }">
                  <el-tag >{{ follower.username}}</el-tag>
                </router-link>
              </div>
            </div>

          </nav>
        </div>
      </article>
      <!--分页-->
    </el-card>
  </div>
</template>

<script>
import {getFans} from "@/api/auth/user";

export default {
  name: "followers",
  data(){
    return{
      followers:[]
    }
  },
  created() {
    this.getFans();

  },
  methods:{
    getFans(){
      getFans().then(res=>{
        this.followers = res.data
      })
    }
  },
}
</script>

<style scoped>

</style>
