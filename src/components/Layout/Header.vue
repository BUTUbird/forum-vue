<template>
  <header class="header has-background-white has-text-black">
    <b-navbar
        class="container is-white"
        :fixed-top="true"
    >
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img :src="doubaoImg" alt="logo">
        </b-navbar-item>

<!--        <b-navbar-item-->
<!--            class="is-hidden-desktop"-->
<!--            tag="router-link"-->
<!--            :to="{ path: '/' }"-->
<!--        >-->
<!--          主页-->
<!--        </b-navbar-item>-->
      </template>
<!--      <template slot="start">-->
<!--        <b-navbar-item-->
<!--            tag="router-link"-->
<!--            :to="{ path: '/' }"-->
<!--        >-->
<!--          🌐 主页-->
<!--        </b-navbar-item>-->
<!--      </template>-->

      <template slot="end">
        <b-navbar-item tag="div">
          <b-field position="is-centered">
            <b-input
                v-model="searchKey"
                class="s_input"
                width="80%"
                placeholder="搜索帖子、标签"
                rounded
                clearable
                @keyup.enter.native="search()"
            />
            <p class="control">
              <b-button
                  class="is-info"
                  @click="search()"
              >搜索
              </b-button>
            </p>
          </b-field>
        </b-navbar-item>
        <b-navbar-item tag="div">
        <el-badge :value="MsgInfo.length" v-show="MsgInfo.length" class="item">
          <el-button icon="el-icon-bell" circle @click="msg = true"></el-button>
        </el-badge>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <b-switch
              v-model="darkMode"
              passive-type="is-warning"
              type="is-dark"
          >
            {{ darkMode ? "夜" : "日" }}
          </b-switch>
        </b-navbar-item>

        <b-navbar-item
            v-if="token == null || token === ''"
            tag="div"
        >
          <div class="buttons">
            <b-button
                class="is-light"
                tag="router-link"
                :to="{ path: '/register' }"
            >
              注册
            </b-button>
            <b-button
                class="is-light"
                tag="router-link"
                :to="{ path: '/login' }"
            >
              登录
            </b-button>
          </div>
        </b-navbar-item>

        <b-navbar-dropdown
            v-else
            :label="user.alias"
        >
          <b-navbar-item
              tag="router-link"
              :to="{ path: `/member/${user.username}/home` }"
          >
            🧘 个人中心
          </b-navbar-item>
          <hr class="dropdown-divider"
              v-show="user.roleId === 1"
          >
          <b-navbar-item
              v-show="user.roleId === 1"
              tag="router-link"
              :to="{ path: `/admin/card` }"
          >
            ⚙ 后台管理
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item
              tag="router-link"
              :to="{ path: `/member/${user.username}/setting` }"
          >
            ⚙ 设置中心
          </b-navbar-item>
          <hr class="dropdown-divider">
          <b-navbar-item
              tag="a"
              @click="logout"
          > 👋 退出登录
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </b-navbar>
    <el-dialog title="通知" :visible.sync="msg" append-to-body>
      <Message></Message>
      <div slot="footer" class="dialog-footer">
        <el-button @click="msg = false">返回</el-button>
      </div>
    </el-dialog>
  </header>

</template>

<script>
import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader'
import { getDarkMode, setDarkMode } from '@/utils/auth'
import { mapGetters } from 'vuex'
import Message from '@/views/auth/Message'
export default {
  name: 'Header',
  components: {
    Message
  },
  data() {
    return {
      logoUrl: require('@/assets/image/BUTUbird.svg'),
      doubaoImg: require('@/assets/image/BUTUbird.svg'),
      searchKey: '',
      darkMode: false,
      userInfo:'',
      userMsg:[],
      msg:false
    }
  },
  computed: {
    ...mapGetters(['token', 'user','MsgInfo']),

  },
  watch: {
    // 监听Theme模式
    darkMode(val) {
      if (val) {
        enableDarkMode({})
      } else {
        disableDarkMode()
      }
      setDarkMode(this.darkMode)
    },
  },

  created() {
    // 获取cookie中的夜间还是白天模式
    this.darkMode = getDarkMode()
    if (this.darkMode) {
      enableDarkMode({})
    } else {
      disableDarkMode()
    }
  },
  methods: {
    async logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$message.info('退出登录成功')
        setTimeout(() => {
          this.$router.push({ path: this.redirect || '/' })
        }, 500)
      })
    },
    search() {
      if (this.searchKey.trim() === null || this.searchKey.trim() === '') {
        this.$message.info({
          showClose: true,
          message: '请输入关键字搜索！',
          type: 'warning'
        })
        return false
      }
      this.$router.push({ path: '/search?key=' + this.searchKey })
    },
  },
  mounted(){
    this.userMsg = JSON.parse(localStorage.getItem("Msg"))
  }
}
</script>

<style scoped>
input {
  width: 80%;
  height: 86%;
}

</style>
