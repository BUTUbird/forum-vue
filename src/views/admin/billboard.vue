<template>
<div>
  <el-button type="primary" @click="insert = true">新增</el-button>
  <el-table
    :data=" billboardList"
    style="width: 100%">
    <el-table-column width="50" type="index"></el-table-column>
    <el-table-column
      label="创建时间"
      width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="内容"
      width="300">
      <template slot-scope="scope">
       <span >{{ scope.row.content }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            v-show="scope.row.shows === true"
          size="mini"
          type="warning"
          @click="handledisable(scope.row.id)">禁用</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button
          size="mini"
          type="success"
          v-show="scope.row.shows === false"
          @click="handleable(scope.row.id)">启用</el-button>
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
  <el-dialog title="新增公告" :visible.sync="insert" @close="resetForm">
    <el-form ref="ruleForm" >
      <el-form-item label="公告" :label-width="formLabelWidth">
        <el-input v-model="NoticeText" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="insert = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {getBillboard, deleteOne, disableOne, ableOne, insertOne} from '@/api/billboard'
import pagination from '@/components/Pagination'

export default {
  name: 'BillboardList',
  components: { pagination },
  data() {
    return {
      formLabelWidth: '120px',
      NoticeText: '',
      insert: false,
      billboardList: [],
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
      getBillboard(this.page.current, this.page.size).then((response) => {
        const { data } = response
        console.log(data.records)
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.billboardList = data.records
      })
    },
   handleDelete(id){
       deleteOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/admin/billboard' })
          }, 500)
        }
        this.reload()
       })
   },
   handledisable(id){
       disableOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/admin/billboard' })
          }, 500)
        }
        this.reload()
       })
   },
   handleable(id){
       ableOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/admin/billboard' })
          }, 500)
        }
         this.reload()
       })
   },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
    },
    async onSubmit() {
      this.insert = false
      this.isLoading = true
      insertOne(this.NoticeText).then(() => {
        this.$message({
          message: "添加成功",
          type: "success",
          duration: 2000,
        });
        setTimeout(() => {
          this.loading = false;
          this.$router.push({ path: this.redirect || "/admin/billboard" });
        }, 0.1 * 1000);
      })
      this.reload()
    }
  }
}
</script>

<style scoped>

</style>
