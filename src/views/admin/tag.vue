<template>
<div>
  <el-table
    :data=" tagList"
    style="width: 100%">
    <el-table-column width="200" type="index"></el-table-column>
    <el-table-column
      label="标签名"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文章数"
      width="200">
      <template slot-scope="scope">
       <span >{{ scope.row.topicCount }}</span>
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
import { getTag,deleteOne } from '@/api/tag'
import pagination from '@/components/Pagination'

export default {
  name: 'TagList',
  components: { pagination },
  data() {
    return {
      tagList: [],
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
      getTag(this.page.current, this.page.size).then((response) => {
        const { data } = response
        console.log(data)
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.tagList = data.records
      })
    },
   handleDelete(id){
       deleteOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/first/tag' })
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
