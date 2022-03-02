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
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404'),
    meta:{title: '404-Not_Found'}
  },
  {
    path: '*',
    redirect:"/404",
    hidden: true,
  }
]

const router = new VueRouter({
  routes
})

export default router
