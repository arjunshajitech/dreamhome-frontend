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
    },
    {
      path: '/engineer',
      name: 'engineer_login',
      component: () => import('@/views/engineer/EngineerRegister.vue')
    },
    {
      path: '/engineer/home',
      name: 'engineer_home',
      component: () => import('@/views/engineer/EngineerHome.vue')
    }
  ]
})

export default router
