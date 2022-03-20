<template>
<div>
  <el-table
    :data=" tipList"
    style="width: 100%">
    <el-table-column width="100" type="index"></el-table-column>
    <el-table-column
      label="名言"
      width="700">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.content }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="作者"
      width="300">
      <template slot-scope="scope">
       <span >{{ scope.row.author }}</span>
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
import { getTip,deleteOne } from '@/api/tip'
import pagination from '@/components/Pagination'

export default {
  name: 'TipList',
  components: { pagination },
  data() {
    return {
      tipList: [],
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
      getTip(this.page.current, this.page.size).then((response) => {
        const { data } = response
        console.log(data)
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.tipList = data.records
      })
    },
   handleDelete(id){
       deleteOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/admin/tip' })
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
