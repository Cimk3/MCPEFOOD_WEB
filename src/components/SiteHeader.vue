<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { REPO, SITE } from '@/data/site'
import PixelIcon from '@/components/PixelIcon.vue'

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)

const navs = [
  { to: '/', label: '首页' },
  { to: '/download', label: '下载' },
  { to: '/docs', label: '新手指南' },
]

function onScroll() {
  scrolled.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled, 'menu-open': open }">
    <div class="container header-inner">
      <RouterLink to="/" class="brand" aria-label="方寸食光 首页">
        <span class="brand-mark"><PixelIcon name="bowl" :size="30" /></span>
        <span class="brand-text">
          <strong>方寸食光</strong>
          <small class="pixel">FOOD&amp;TABLE</small>
        </span>
      </RouterLink>

      <nav class="nav-links" aria-label="主导航">
        <RouterLink v-for="n in navs" :key="n.to" :to="n.to" class="nav-link">{{ n.label }}</RouterLink>
      </nav>

      <div class="header-right">
        <a :href="REPO" target="_blank" rel="noopener noreferrer" class="nav-gh" aria-label="GitHub 仓库">
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </a>
        <RouterLink to="/download" class="btn btn-primary btn-sm nav-cta">
          免费下载 <span class="pixel ver">v{{ SITE.version }}</span>
        </RouterLink>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="open"
          aria-label="展开导航菜单"
          @click="open = !open"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="open" class="mobile-menu">
        <RouterLink v-for="n in navs" :key="n.to" :to="n.to">
          {{ n.label }} <span class="pixel">›</span>
        </RouterLink>
        <a :href="REPO" target="_blank" rel="noopener noreferrer" @click="open = false">
          GitHub 仓库 <span class="pixel">↗</span>
        </a>
      </div>
    </Transition>
  </header>
</template>
