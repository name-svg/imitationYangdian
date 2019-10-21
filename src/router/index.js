import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import commodity from '@/components/commodity/commodity'
import navs from '@/components/index/navs'
import details from '@/components/commodity/details'
import praise from '@/components/commodity/praise'
import login from '@/components/me/login'
import center from '@/components/me/center'
import classify from '@/components/classify/classify.vue'
import shoping from '@/components/shoping/shoping.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/login',
      component:login
    },
    {
      path:'/',
      component:navs,
      children:[
        {
          path: '/',
          redirect:'/index'
        },
        {
          path: 'index',
          component: index
        },
        {
          path: 'classify',
          component: classify
        },
        {
          path:'center',
          component:center,
        },
        {
          path:'shoping',
          component:shoping,
        },
      ]
    },
    {
      path: '/commodity',
      component: commodity,
      children:[
        {
          path:'details',
          component:details
        },
        {
          path:'/',
          redirect:'/commodity/details'
        },
        {
          path:'praise',
          component:praise,
        }
      ]
    },
  ]
})
