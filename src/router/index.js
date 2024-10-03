import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth } from './authGuard'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import HomePage from '@/views/HomePage.vue'
import Dashboard from '@/views/Dashboard.vue'
import profile from '@/views/profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
      path: '/',
      name: 'HomePage',
      component: HomePage,
       },
{

  path:'/Login',
  name:'Login',
  component:Login,
  props:true
},
{

  path:'/Signup',
  name:'Signup',
  component:Signup,
  props:true
},
{
  path: '/Dashboard',
  name: 'Dashboard',
  component: Dashboard,
  beforeEnter:requireAuth

},

{
  path: '/profile',
  name: 'profile',
  component: profile
}



  ]
})

export default router
