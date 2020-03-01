import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',component:Index ,children:[
    { path: '/goods',  component: () => import( '../views/Goods.vue')},
    { path: '/evaluate',  component: () => import( '../views/Evaluate.vue')},
    { path: '/merchant',  component: () => import( '../views/Merchant.vue')},
    { path: '/shoppingcart',  component: () => import( '../views/Shoppingcart.vue')}
  ]},
  
]

const router = new VueRouter({
  routes
})

export default router
