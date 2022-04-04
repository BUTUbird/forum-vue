<template>
  <div>
    <el-button type="primary" @click="insert = true">新增</el-button>
    <el-table
        :data="carouselList"
        style="width: 100%">
      <el-table-column width="50" type="index"></el-table-column>
      <el-table-column
          label="创建时间"
          width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">
            {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
          label="图片"
          width="150">
        <template slot-scope="scope">
<!--          <span >{{ scope.row.url }}</span>-->
          <img :src="scope.row.url" style="width: 80px;height: 40px">
        </template>
      </el-table-column>
      <el-table-column
          label="名称"
          width="100">
        <template slot-scope="scope">
                    <span >{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              v-show="scope.row.shows === false"
              size="mini"
              type="success"
              @click="handleable(scope.row.id)">启用</el-button>
          <el-button
              v-show="scope.row.shows === true"
              size="mini"
              type="warning"
              @click="handledisable(scope.row.id)">禁用</el-button>
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
    <el-dialog title="新增轮播图" :visible.sync="insert" @close="resetForm">
      <el-form ref="ruleForm" >
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
              :action="uploadURL"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
              list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
import { getCarouselList,deleteOne,disableOne, ableOne,insertOne} from '@/api/carousel'
import pagination from '@/components/Pagination'
import {getToken} from "@/utils/auth";




export default {
  name: 'carousel',
  components: { pagination },
  data() {
    return {
      insert: false,
      formLabelWidth: '120px',
      carouselList: [],
      ruleForm: {
        name:"",
        url:""
      },
      headers:{},
      uploadURL:'',
      fileList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
      }
    }
  },
  created() {
    this.init()
    this.headers={Authorization :  'Bearer ' + getToken()}
    this.uploadURL = process.env.VUE_APP_SERVER_URL+'/user/uploadImg/'
  },
  inject: ["reload"],
  methods: {
    init() {
      getCarouselList(this.page.current, this.page.size).then((response) => {
        const { data } = response
        console.log(data.records)
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.carouselList = data.records
      })
    },
    handleDelete(id){
      deleteOne(id).then((response)=>{
        const { code, message } = response
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/admin/carousel' })
          }, 500)
        }
        this.reload()
      })
    },
    handledisable(id){
      disableOne(id).then((response)=>{
        const { code, message } = response
        console.log(code)
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/admin/carousel'})
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
            this.$router.push({ path: '/admin/carousel' })
          }, 500)
        }
        this.reload()
      })
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //事件处理器
    handleAvatarSuccess(res, file) {//上传头像
      console.log(res.code)
      if(res.code === 200){
        this.ruleForm.url = res.data;
      }else{
        this.$message.error('上传图片失败');
      }
    },
    beforeAvatarUpload(file) {//判断头像大小
      if (file == null){
        console.log("文件为空")
      }
      console.log("文件不为空"+file.size)
      const isJPG = file.type === 'image/png'||file.type==='image/jpg'||file.type==='image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 1;
      // console.log(file);
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      console.log("文件校验通过")
      return isJPG && isLt2M;
    },
    async onSubmit() {
      this.insert = false
      this.isLoading = true
      //console.log(this.ruleForm.url)
      if (this.ruleForm.url === null){
        alert("图片上传失败了");
      }
      insertOne(this.ruleForm).then(() => {
        //console.log(this.ruleForm)
        this.$message({
          message: "添加成功",
          type: "success",
          duration: 2000,
        });
        setTimeout(() => {
          this.loading = false;
          this.$router.push({ path: this.redirect || "/admin/carousel" });
        }, 0.1 * 1000);
      })
      this.reload()
    }
  }
}
</script>

<style scoped>

</style>
