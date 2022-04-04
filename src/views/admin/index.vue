<template>
  <el-container style="height: 750px; border: 2px solid #ffffff">

    <el-header class="_header">
<!--      <div>-->
<!--&lt;!&ndash;        <el-row>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-col :span="20"> <strong style="font-size: 20px">论坛管理端</strong></el-col>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-col :span="4"><strong>欢迎管理员,{{user.username}}！</strong>&ndash;&gt;-->
<!--&lt;!&ndash;            <a @click="logout">退出登录</a></el-col>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-row>&ndash;&gt;-->
<!--      </div>-->
    </el-header>
    <el-container>
<!--      rgb(238, 241, 246)-->
      <el-aside width="250px" style="background-color: #ffffff">
        <el-menu :default-openeds="['1', '6']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-pie-chart"></i>统计</template>
            <router-link :to="{path:'/admin/echar'}"><el-menu-item >热门标签文章数及比例</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message-solid"></i>公告栏管理</template>
            <router-link :to="{path:'/admin/billboard'}"><el-menu-item >公告栏列表</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message-solid"></i>轮播图管理</template>
            <router-link :to="{path:'/admin/carousel'}"><el-menu-item >轮播图列表</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-link"></i>广告管理</template>
              <router-link :to="{path:'/admin/promotion'}"><el-menu-item>广告商列表</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-custom"></i>用户管理</template>
            <router-link :to="{path:'/admin/user'}"><el-menu-item >用户列表</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-menu"></i>帖子管理</template>
            <router-link :to="{path:'/admin/post'}"><el-menu-item >帖子列表</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-attract"></i>标签管理</template>
            <router-link :to="{path:'/admin/tag'}"><el-menu-item >标签列表</el-menu-item></router-link>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title"><i class="el-icon-attract"></i>敏感词管理</template>
            <router-link :to="{path:'/admin/word'}"><el-menu-item >敏感词列表</el-menu-item></router-link>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="_main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  methods:{
    // async logout() {
    //   this.$store.dispatch('user/logout').then(() => {
    //     this.$message.info('退出登录成功')
    //     setTimeout(() => {
    //       this.$router.push({ path: this.redirect || '/' })
    //     }, 500)
    //   })
    // },
  }
}
</script>
<style scoped>
._header {
  background-color: #ffffff;
  color: #ffffff;
  line-height: 60px;
}
._main{
  background-color: white;
  border: #eee 1px solid;
  height: 720px;
}
.el-aside {
  color: #eee;
}
</style>

