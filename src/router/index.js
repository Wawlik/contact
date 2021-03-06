import Vue from 'vue'
import VueRouter from 'vue-router'
import mainPage from '../views/mainPage'
import contact from '../views/contact'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/list/',
      name: 'mainPage',
      component: mainPage
    },
    {
      path: '/list/contact/:id',
      name: 'contact',
      component: contact
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
