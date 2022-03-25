<template>
  <div>
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
  </div>
</template>

<script>
import { getCarouselList,deleteOne,disableOne, ableOne } from '@/api/carousel'
import pagination from '@/components/Pagination'



export default {
  name: 'carousel',
  components: { pagination },
  data() {
    return {
      carouselList: [],
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
  }
}
</script>

<style scoped>

</style>
