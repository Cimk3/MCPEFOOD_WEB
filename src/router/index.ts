import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '方寸食光 · Food & Table' },
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/DownloadView.vue'),
    meta: { title: '下载 · 方寸食光' },
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import('@/views/DocsView.vue'),
    meta: { title: '新手指南 · 方寸食光' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  // Hash 模式：纯静态托管（含 GitHub Pages 子路径）无需服务端 rewrite
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) || '方寸食光 · Food & Table'
})

export default router
