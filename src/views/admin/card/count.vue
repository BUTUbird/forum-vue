<template>
<div>
  <el-card shadow="hover">
    <div slot="header">
      <span>信息统计</span>
    </div>
    <el-row :gutter="15" class="home-recommend-row">
      <el-col :sm="24" :md="12" :lg="6" :xl="6" v-for="(v, k) in recommendList" :key="k">
        <div class="home-recommend" :style="{ 'background-color': v.bg }">
          <i :class="v.icon" :style="{ color: v.iconColor }"></i>
          <div class="home-recommend-auto">
            <div>{{ v.title }}</div>
            <div class="home-recommend-msg">{{ v.msg }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
import {getCount} from "@/api/billboard";

export default {
  name: "count",
  data() {
    return {
      count:{},
      recommendList:[
        {
          title: '用户统计',
          msg: '0',
          icon: 'el-icon-s-marketing',
          bg: '#48D18D',
          iconColor: '#64d89d',
        },
        {
          title: '在线人数',
          msg: '0',
          icon: 'el-icon-data-line',
          bg: '#F95959',
          iconColor: '#F86C6B',
        },
        {
          title: '帖子数量',
          msg: '0',
          icon: 'el-icon-s-data',
          bg: '#8595F4',
          iconColor: '#92A1F4',
        },
        {
          title: '标签数量',
          msg: '0',
          icon: 'el-icon-cpu',
          bg: '#FEBB50',
          iconColor: '#FDC566',
        },
      ]
    }
  },
  created() {
    this.getCount()
  },
  methods:{
    getCount(){
      getCount().then(res => {
        this.count = res.data
        console.log(this.count)
        this.recommendList[0].msg = this.count.users
        this.recommendList[1].msg = this.count.line
        this.recommendList[2].msg = this.count.posts
        this.recommendList[3].msg = this.count.tags
      })
    }
  }
}
</script>

<style scoped lang = scss>
.home-recommend-row {
.home-recommend {
  position: relative;
  height: 100px;
  color: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
&:hover {
i {
  right: 0px !important;
  bottom: 0px !important;
  transition: all ease 0.3s;
}
}
i {
  position: absolute;
  right: -10px;
  bottom: -10px;
  font-size: 70px;
  transform: rotate(-30deg);
  transition: all ease 0.3s;
}
.home-recommend-auto {
  padding: 15px;
  position: absolute;
  left: 0;
  top: 5%;
.home-recommend-msg {
  font-size: 24px;
  margin-top: 10px;
}
}
}
}
</style>
