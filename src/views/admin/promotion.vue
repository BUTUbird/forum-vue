<template>
<div>
  <el-table
    :data=" promotionList"
    style="width: 100%">
    <el-table-column width="50" type="index"></el-table-column>
    <el-table-column
      label="广告商"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="链接"
      width="200">
      <template slot-scope="scope">
       <a >{{ scope.row.link }}</a>
      </template>
    </el-table-column>
    <el-table-column
      label="描述"
      width="300">
      <template slot-scope="scope">
       <a >{{ scope.row.description }}</a>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
       </el-table>
       <pagination
            v-show="page.total > 0"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="init"
            />
</div>
</template>

<script>
import { getPromotion,deleteOne } from '@/api/promote'
import pagination from '@/components/Pagination'

export default {
  name: 'PromotionList',
  components: { pagination },
  data() {
    return {
      promotionList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
      }
    }
  },
  created() {
    this.init()
  },
  inject: ["reload"],
  methods: {
    init() {
      getPromotion(this.page.current, this.page.size).then((response) => {
        const { data } = response
        console.log(data)
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.promotionList = data.records
      })
    },
   handleDelete(id){
       deleteOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/first/promotion' })
          }, 500)
        }
        this.reload()
       })
   },
  }
}
</script>

<style scoped>

</style>
