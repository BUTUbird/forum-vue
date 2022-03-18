<template>
<div>
  <el-input  style="width:400px" placeholder="请输入想要查找的标题关键字或用户名" v-model="searchKey">
    <el-button slot="append" icon="el-icon-search" @click="getPostList"></el-button></el-input>
  <el-table
    :data=" postList"
    style="width: 100%">
    <el-table-column width="50" type="index"></el-table-column>
    <el-table-column
      label="帖子标题"
      width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="发帖用户"
      width="100">
      <template slot-scope="scope">
       <span >{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="评论数"
      width="70">
      <template slot-scope="scope">
       <span >{{ scope.row.comments }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="浏览数"
      width="70">
      <template slot-scope="scope">
       <span >{{ scope.row.view }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="拥有标签"
      width="100">
      <template slot-scope="scope">
       <span  v-for="(tag, index) in scope.row.tags"
                        :key="index">{{tag.name +" | " }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="发帖时间"
      width="120">
      <template slot-scope="scope">
       <span >{{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
<!--         <router-link :to="{ path: `/admin/detail/${scope.row.id}` }">-->
        <router-link :to="{name:'post-detail',params:{id:scope.row.id}}">

           <el-button
          size="mini"
          type="info"
         >详情</el-button></router-link>
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
import { getPost,deleteOne,searchOne } from '@/api/post'
import pagination from '@/components/Pagination'

export default {
  name: 'PostList',
  components: { pagination },
  data() {
    return {
      postList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      searchKey:''
    }
  },
  created() {
    this.init()
  },
  inject: ["reload"],
  methods: {
    init() {
      getPost(this.page.current, this.page.size).then((response) => {
        const { data } = response
        console.log(data)
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.postList = data.records
      })
    },
    getPostList()
    {
      searchOne(this.page.current, this.page.size,this.searchKey).then((response)=>{
        const { data } = response
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.postList = data.records
      })
    },
   handleDelete(id){
       deleteOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/admin/post' })
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
