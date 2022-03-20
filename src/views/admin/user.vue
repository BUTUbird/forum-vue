<template>
<div>
    <el-input  style="width:300px" placeholder="请输入想要查找的用户名" v-model="searchKey">
    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button></el-input>
  <el-table
    :data=" userList"
    style="width: 100%">
    <el-table-column width="40" type="index"></el-table-column>
    <el-table-column
      label="用户名"
      width="80">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
<!--    <el-table-column-->
<!--      label="用户别名"-->
<!--      width="100">-->
<!--      <template slot-scope="scope">-->
<!--       <span >{{ scope.row.alias }}</span>-->
<!--      </template>-->
<!--    </el-table-column>-->
    <el-table-column
      label="用户邮箱"
      width="120">
      <template slot-scope="scope">
       <span >{{ scope.row.email }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户积分"
      width="80">
      <template slot-scope="scope">
       <span >{{ scope.row.score }}</span>
      </template>
    </el-table-column><el-table-column
      label="文章数"
      width="65">
      <template slot-scope="scope">
       <span >{{ scope.row.topiccount }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="粉丝数"
      width="65">
      <template slot-scope="scope">
       <span >{{ scope.row.followercount }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户简介"
      width="80">
      <template slot-scope="scope">
       <span >{{ scope.row.job }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="用户电话"
      width="80">
      <template slot-scope="scope">
       <span >{{ scope.row.mobile }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="90">
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
import { getUser,deleteOne,searchOne } from '@/api/user'
import pagination from '@/components/Pagination'

export default {
  name: 'UserList',
  components: { pagination },
  data() {
    return {
      userList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      searchKey: '',
    }
  },
  created() {
    this.init()
  },
  inject: ["reload"],
  methods: {
    init() {
      getUser(this.page.current, this.page.size).then((response) => {
        const { data } = response
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.userList = data.records
      })
    },
    getUserList()
    {
      searchOne(this.page.current, this.page.size,this.searchKey).then((response)=>{
        const { data } = response
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.userList = data.records
      })
    },
   handleDelete(id){
       deleteOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/admin/user' })
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
