<template>
<div>
  <el-button type="primary" @click="insert = true">新增</el-button>
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
  <el-dialog title="新增广告" :visible.sync="insert" @close="resetForm">
    <el-form ref="ruleForm" >
      <el-form-item label="广告名" :label-width="formLabelWidth">
        <el-input
            placeholder="请输入广告名"
            v-model="ruleForm.title">
        </el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input
            placeholder="请输入广告地址"
            v-model="ruleForm.link">
        </el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="ruleForm.description">
        </el-input>
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
import {getPromotion, deleteOne, insertOne} from '@/api/promote'
import pagination from '@/components/Pagination'

export default {
  name: 'PromotionList',
  components: { pagination },
  data() {
    return {
      insert: false,
      formLabelWidth: '120px',
      ruleForm: {
        title: "",
        link:"",
        description:"",
      },
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
            this.$router.push({ path: '/admin/promotion' })
          }, 500)
        }
        this.reload()
       })
   },
    async onSubmit() {
      this.insert = false
      this.isLoading = true
      insertOne(this.ruleForm).then(() => {
        this.$message({
          message: "添加成功",
          type: "success",
          duration: 2000,
        });
        setTimeout(() => {
          this.loading = false;
          this.$router.push({ path: this.redirect || "/admin/promotion" });
        }, 0.1 * 1000);
      })
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
    },
  }
}
</script>

<style scoped>

</style>
