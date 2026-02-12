import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/category', component: () => import('../views/Category.vue') },
  { path: '/cart', component: () => import('../views/Cart.vue'), meta: { requiresAuth: true } },
  { path: '/user', component: () => import('../views/User.vue') },
  { path: '/product/:id', component: () => import('../views/Product.vue') },
  { path: '/search', component: () => import('../views/Search.vue') },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/order/confirm', component: () => import('../views/OrderConfirm.vue'), meta: { requiresAuth: true } },
  { path: '/order/list', component: () => import('../views/OrderList.vue'), meta: { requiresAuth: true } },
  { path: '/address', component: () => import('../views/AddressList.vue'), meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 需要登录的页面
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const userInfo = localStorage.getItem('userInfo')
    if (!userInfo) {
      next({ path: '/login', query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})

export default router
