<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ImageLightbox from '@/components/ImageLightbox.vue'
import ToastHost from '@/components/ToastHost.vue'
import { initReveal, scrollToTop } from '@/utils/dom'

const showTop = ref(false)
let disposeReveal: () => void = () => {}

function onScroll() {
  showTop.value = window.scrollY > 520
}

onMounted(() => {
  disposeReveal = initReveal()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  disposeReveal()
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <SiteHeader />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter />
  <ImageLightbox />
  <ToastHost />
  <Transition name="fade">
    <button v-if="showTop" class="back-top" type="button" aria-label="回到顶部" @click="scrollToTop">↑</button>
  </Transition>
</template>
