import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'client_register',
      component: () => import('@/views/client/ClientRegister.vue')
    },
    {
      path: '/home',
      name: 'client_home',
      component: () => import('@/views/client/ClientHome.vue')
    },
    {
      path: '/admin',
      name: 'admin_login',
      component: () => import('@/views/admin/AdminLogin.vue')
    },
    {
      path: '/admin/home',
      name: 'admin_home',
      component: () => import('@/views/admin/AdminHome.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
