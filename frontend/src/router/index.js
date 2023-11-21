import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import Users from '../views/Users.vue'
import Welcome from '../views/Welcome.vue'
import {userProtected, adminProtected} from '../utils/authenticated'
import { useUserStore } from '../stores/user'; 


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      component: Home,
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/signin',
      component: Signin
    },
    {
      path: '/wlcm',
      component: Welcome, 
      beforeEnter: userProtected, 
    },
    {
      path: '/users',
      component: Users, 
      beforeEnter: adminProtected, 
    },
   
  ]
})


router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); 
  if (userStore.user) {
   
    if (to.path === '/signin' || to.path === '/signup' || to.path === '/') {
      next('/users'); 
    } else {
      next(); 
    }
  } else {
    next();
  }
});

export default router
