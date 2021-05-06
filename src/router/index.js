import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/recommend',
    alias:'/',
    component: () => import('@/views/Recommend'),
    meta: { title: '', showNav: true }
  },
  {
    path: '/hot',
    component: () => import('@/views/Hot'),
    meta: { title: '', showNav: true }
  },
  {
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { title: '', showNav: true }
  },
  {
    path: '/playlist/:id',
    component: () => import('@/views/PlayList'),
  },
  {
    path: '/hots/:listsongid',
    component: () => import('@/components/HotSong'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
