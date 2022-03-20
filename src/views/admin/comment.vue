<template>
<div>
  <el-table
    :data=" commentList"
    style="width: 100%">
    <el-table-column width="50" type="index"></el-table-column>
    <el-table-column
      label="评论用户"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="帖子标题"
      width="300">
      <template slot-scope="scope">
       <span >{{ scope.row.topicname }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="评论内容"
      width="600">
      <template slot-scope="scope">
       <span >{{ scope.row.content }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="评论时间"
      width="200">
      <template slot-scope="scope">
       <span >{{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
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
import { getComment,deleteOne } from '@/api/comment'
import pagination from '@/components/Pagination'

export default {
  name: 'CommentList',
  components: { pagination },
  data() {
    return {
      commentList: [],
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
      getComment(this.page.current, this.page.size).then((response) => {
        const { data } = response
        console.log(data)
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.commentList = data.records
      })
    },
   handleDelete(id){
       deleteOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/admin/comment' })
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
