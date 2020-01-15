import Vue from 'vue'
import Router from 'vue-router'
const ratings = () => import('@/components/ratings/ratings')
const seller = () => import('@/components/seller/seller')
const goods = () => import('@/components/goods/goods')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
