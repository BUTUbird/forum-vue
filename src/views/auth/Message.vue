<template>
<div>
  <el-card shadow="never">
  <article v-for="(msg, index) in MsgList" :key="index" class="media">
    <div class="media-content">
      <div class="">
      </div>
      <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
        <div class="level-left">
          <div class="level-left">
            <router-link class="level-item" :to="{ path: `/member/${msg.fromUserName}/home` }">
              <el-tag size="small">{{ msg.fromUserName}}</el-tag>
            </router-link>
            <span style="font-size: 15px">
                        于{{ dayjs(msg.createTime).format("YYYY/MM/DD") }}
                      </span>
            <span style="font-size: 15px"> &nbsp;    {{msg.content}}</span>
          </div>

        </div>
        <div>
          <el-button type="primary" size="mini" round @click="handleDisable(msg.id)"> 确定</el-button>
        </div>

      </nav>
    </div>
  </article>
  <!--分页-->
  <pagination
      v-show="page.total > 0"
      :total="page.total"
      :page.sync="page.current"
      :limit.sync="page.size"
  />
  </el-card>
</div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {disableOne} from "@/api/auth/auth";
export default {
  name: "Message",
  components:{
    Pagination
  },
  inject: ["reload"],
  data(){
    return{
      MsgList:[],
      page: {
        current: 1,
        size: 10,
        total: 0,
      }
    }
  },
  mounted() {
    this.MsgList = JSON.parse(localStorage.getItem('Msg'))

  },
  methods:{
    handleDisable(id){
      disableOne(id).then((response)=>{
        this.reload()
      })
    },
  }
}
</script>

<style scoped>

</style>
