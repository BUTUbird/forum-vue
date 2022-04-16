<template>
<div class="home">
  <!-- 用户信息 -->
  <el-row :gutter="15">
    <el-col :md="24" :lg="24" :xl="16" class="mb15">
      <el-card shadow="hover">
        <div slot="header">
          <span>用户信息</span>
        </div>
        <div class="user-item">
          <div class="user-item-left">
            <img :src="user.avatar" />
          </div>
          <div class="user-item-right overflow">
            <el-row>
              <el-col :span="24" class="right-title mb15 one-text-overflow"
              >{{ currentTime }}，{{ user.username }}，{{ dailyMessage }}
              </el-col>
              <el-col :span="24">
                <el-col :xs="12" :sm="12" :md="8" class="right-l-v">
                  <div class="right-label">昵称：</div>
                  <div class="right-value">{{user.username}}</div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="8" class="right-l-v">
                  <div class="right-label">身份：</div>
                  <div class="right-value">{{ user.username === 'admin' ? '超级管理' : '普通用户' }}</div>
                </el-col>
              </el-col>
              <el-col :span="24" class="mt5">
                <el-col :xs="12" :sm="12" :md="8" class="right-l-v">
                  <div class="right-label one-text-overflow">IP：</div>
                  <div class="right-value one-text-overflow">192.168.1.1</div>
                </el-col>
                <el-col :xs="12" :sm="12" :md="8" class="right-l-v">
                  <div class="right-label one-text-overflow">时间：</div>
                  <div class="right-value one-text-overflow">{{ dayjs(new Date()).format('YYYY/MM/DD HH:mm:ss') }}</div>
                </el-col>
              </el-col>
<!--              <el-col :span="24" class="mt15">-->
<!--                <el-button size="small" icon="el-icon-edit-outline">修改信息 </el-button>-->
<!--                <el-button size="small" icon="el-icon-position" type="primary">发布活动</el-button>-->
<!--              </el-col>-->
            </el-row>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import {mapGetters} from "vuex";
import {formatAxis} from "@/utils/formatTime";

export default {
  name: "userInfo",
  created() {
    this.initDailyMessage();
  },
  computed: {
    ...mapGetters(['token', 'user']),
    currentTime() {
      return formatAxis(new Date());
    },
  },
  data(){
    return{
      dailyMessage: {}
    }
  },
  methods:{
    // 随机语录
    initDailyMessage() {
      let dailyMessage = [
        '祝你开心每一天！',
        '忙碌了一周，停一停脚步！',
        '世间美好，与你环环相扣！',
        '永远相信美好的事情即将发生！',
        '每一天，遇见更好的自己！',
        '保持热爱，奔赴山海！',
        '生活明朗，万物可爱！',
        '愿每一天醒来都是美好的开始！',
        '没有希望的地方，就没有奋斗！',
        '我最珍贵的时光都行走在路上！',
        '成功，往往住在失败的隔壁！',
        '人只要不失去方向，就不会失去自己！',
        '每条堵住的路，都有一个出口！',
        '没有谁能击垮你，除非你自甘堕落！',
        '微笑着的人并非没有痛苦！',
        '生活变的再糟糕，也不妨碍我变得更好！',
        '你要悄悄努力，然后惊艳众人！',
      ]
      this.dailyMessage = dailyMessage[Math.floor(Math.random() * dailyMessage.length)];
    },
  }
}
</script>

<style scoped lang = scss>
.home {
  width: 100%;
  overflow: hidden;
.home-card-more {
  float: right;
  padding: 3px 0;
  font-size: 13px;
}
.home-card-time {
  float: right;
  font-size: 13px;
  width: 130px;
  margin-top: -4px;
}
.user-item {
  height: 198px;
  display: flex;
  align-items: center;

  .user-item-left {
    width: 100px;
    height: 130px;
    border-radius: 4px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .user-item-right {
    flex: 1;
    padding: 15px;

    .right-title {
      font-size: 20px;
    }

    .right-l-v {
      font-size: 13px;
      display: flex;

      .right-label {
        color: gray;
        width: 40px;
      }

      .right-value {
        flex: 1;
      }
    }
  }
}
}
</style>
