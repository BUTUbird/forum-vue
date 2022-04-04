import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView'),

  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register"),
    meta: { title: "注册" },
  },
  // 登录
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/auth/Login"),
    meta: { title: "登录" },
  },
  // 发送邮件
  {
    name: "mail",
    path: "/mail",
    component: () => import("@/views/auth/Mail"),
    meta: { title: "发送邮件" },
  },
  // 发布
  {
    name: "post-create",
    path: "/post/create",
    component: () => import("@/views/post/Create"),
    meta: { title: "信息发布", requireAuth: true },
  },
  // 编辑
  {
    name: 'topic-edit',
    path: '/topic/edit/:id',
    component: () => import('@/views/post/Edit'),
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  // 详情
  {
    name: "post-detail",
    path: "/post/:id",
    component: () => import("@/views/post/Detail"),
    meta: { title: "详情" },
  },
  {
    name: 'tag',
    path: '/tag/:name',
    component: () => import('@/views/tag/Tag'),
    meta: { title: '主题列表' }
  },
  // 检索
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { title: '检索' }
  },
  // 用户主页
  {
    name: 'user',
    path: '/member/:username/home',
    component: () => import('@/views/user/Profile'),
    meta: { title: '用户主页' }
  },
  // 用户设置
  {
    name: 'user-setting',
    path: '/member/:username/setting',
    component: () => import('@/views/user/Setting'),
    meta: { title: '设置' }
  },
  // 重置密码
  {
    name: 'resetPwd',
    path: '/resetPwd/:token',
    component: () => import('@/views/auth/ResetPwd'),
    meta: { title: '重置密码', requireAuth: true }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: { title: "404-NotFound" },
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
    //后台管理主页
  {
    path: "/admin",
    name: "index",
    component: () => import ('@/views/admin/index'),
    children:[
      {
        path:"echar",
        component: () => import ('@/views/admin/echar'),
        meta: {title: '热门标签文章数'}
      },
      {
        path:"billboard",
        component: () => import ('@/views/admin/billboard'),
        meta: {title: '公告管理'}
      },
      {
        path:"carousel",
        component: () => import ('@/views/admin/carousel'),
        meta: {title: '轮播图管理'}
      },
      {
        path:"tip",
        component: () => import ('@/views/admin/tip'),
        meta: {title: '每日一句管理'}
      },
      {
        path:"promotion",
        component: () => import ('@/views/admin/promotion'),
        meta: {title: '广告商管理'}
      },
      {
        path:"user",
        component: () => import ('@/views/admin/user'),
        meta: {title: '用户列表'}
      },
      {
        path:"tag",
        component: () => import ('@/views/admin/tag'),
        meta: {title: '标签列表'}
      },
      {
        path:"comment",
        component: () => import ('@/views/admin/comment'),
        meta: {title: '评论列表'}
      },
      {
        path:"post",
        component: () => import ('@/views/admin/post'),
        meta: {title: '帖子列表'}
      },
      {
        path:"detail/:id",
        component: () => import ('@/views/admin/detail'),
        meta: {title: '帖子详情'}
      },
      {
        path:"word",
        component: () => import ('@/views/admin/word'),
        meta: {title: '敏感词'}
      },
    ],
    meta: {title: '首页'}
  },
];
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes
})

export default router
