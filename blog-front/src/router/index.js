import Vue from 'vue'
import $store from '@/store'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView'
import CategoryView from '@/views/CategoryView'
import ArticleView from '@/views/ArticleView'
import ArticleListView from '@/views/ArticleListView'
import AboutView from '@/views/AboutView'
import PrivateView from '@/views/PrivateView'
import ChatroomView from '@/views/ChatroomView'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// mobile
import MHomeView from '@/mviews/MHomeView'


// 防止警告在console中报出，不必要，单纯是不想看到error
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (local) {
  return originalReplace.call(this, local).catch(err => err)
}
VueRouter.prototype.push = function (local) {
  return originalPush.call(this, local).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'articleList',
        component: ArticleListView
      },
      {
        path: '/category',
        name: 'category',
        component: CategoryView
      },
      {
        path: '/article/:id',
        name: 'article',
        component: ArticleView
      },
      {
        path: '/about',
        name: 'about',
        component: AboutView
      },
      {
        path: '/private',
        name: 'private',
        component: PrivateView,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/chatroom',
        name: 'chatroom',
        component: ChatroomView,
        meta: {
          requireAuth: false
        }
      }
    ]
  },
  {
    path: '/m',
    name: 'mhome',
    component: MHomeView,
    children: [
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  let useAuth = to.meta.requireAuth
  if (useAuth && !$store.state.token) {
    Vue.prototype.$notify.warning({
      title: '通知',
      message: `请先登录`
    })
    NProgress.done()
    router.push('/index')
  }
  NProgress.done()
})

export default router
