<template>
<div>
  <el-button type="primary" @click="insertTXT = true">上传文本</el-button>
  <el-button type="primary" @click="insert = true">新增</el-button>
  <el-table
    :data=" wordList"
    style="width: 100%">
    <el-table-column width="200" type="index"></el-table-column>
    <el-table-column
      label="敏感词"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.word }}</span>
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

  <el-dialog title="新增敏感词" :visible.sync="insert" @close="resetForm">
    <el-form ref="ruleForm" :model="ruleForm">
      <el-form-item label="敏感词" :label-width="formLabelWidth">
        <el-input v-model="ruleForm.word" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="insert = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="上传敏感词文本" :visible.sync="insertTXT" @close="resetForm" >
    <el-form ref="ruleForm" :model="ruleForm">
      <el-form-item label="敏感词" :label-width="formLabelWidth">
        <el-upload
            class="upload"
            drag
            :headers="headers"
            :action= "uploadURL"
            accept=".txt"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传txt文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="insert = false">取 消</el-button>
      <el-button type="primary" @click="insertTXT = false">确 定</el-button>
    </div>
  </el-dialog>
</div>

</template>

<script>
import { deleteOne,getWord,insertOne} from '@/api/word'
import pagination from '@/components/Pagination'
import {getToken} from "@/utils/auth";

export default {
  name: 'TagList',
  components: { pagination },
  data() {
    return {
      uploadURL:'',
      headers:{},
      wordList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      insert: false,
      insertTXT:false,
      formLabelWidth: '120px',
      ruleForm:{
        word:'',
        file:''
      }
    }
  },
  created() {
        this.init()
        this.headers={Authorization :  'Bearer ' + getToken()}
        this.uploadURL = process.env.VUE_APP_SERVER_URL+'/word/insertTxT/'
  },

  inject: ["reload"],
  methods: {
    init() {
      getWord(this.page.current, this.page.size).then((response) => {
        const { data } = response
        console.log(data)
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.wordList = data.records
      })
    },
   handleDelete(id){
       deleteOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/admin/word' })
          }, 500)
        }
        this.reload()
       })
   },
    async onSubmit() {
      this.insert = false
      console.log("submit")
      insertOne(this.ruleForm).then(() => {
        this.$message({
          message: "添加成功",
          type: "success",
          duration: 2000,
        });
        setTimeout(() => {
          this.$router.push({ path: this.redirect || "/admin/word" });
        }, 0.1 * 1000);
      })
      this.reload()
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
    }
  }
}
</script>

<style scoped>

</style>
