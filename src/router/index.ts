import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home = () => import(/* webpackChunkName: "home" */ '@/components/Home.vue')
const Login = () => import(/* webpackChunkName: "login" */ '@/components/Login.vue')
const Base = () => import(/* webpackChunkName: "base" */ '@/components/Base.vue')
const List = () => import(/* webpackChunkName: "list" */ '@/components/List.vue')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ '@/components/NotFound.vue')
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'noFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'index',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      component: Base,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        }
      ]
    },
    {
      path: '/report',
      component: Base,
      children: [
        {
          path: 'list',
          name: 'list',
          component: List
        }
      ]
    }
  ]
})
