import Vue from 'vue'
import VueRouter from 'vue-router'
import CardView from '../views/CardView.vue'
import itemDetail from '../views/itemDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cardview',
    component: CardView
  },
  {
    path: '/itemdetail/:id',
    name: 'itemdetail',
    component: itemDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
