<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { preview } from '@/data/site'
import { useUi } from '@/composables/useUi'

const { lightboxImages, lightboxIndex, closeLightbox, stepLightbox } = useUi()

const active = computed(() =>
  lightboxIndex.value >= 0 ? lightboxImages.value[lightboxIndex.value] ?? null : null,
)

function onKey(e: KeyboardEvent) {
  if (lightboxIndex.value < 0) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') stepLightbox(1)
  else if (e.key === 'ArrowLeft') stepLightbox(-1)
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="active"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="预览图查看器"
      @click.self="closeLightbox"
    >
      <img :src="preview(active.file)" :alt="active.label" />
      <div class="lightbox-bar">
        <div class="lb-title">
          {{ active.label }}
          <small>预览图，非游戏截图 · 可用 ← → 键切换</small>
        </div>
        <span class="lb-hint">{{ lightboxIndex + 1 }} / {{ lightboxImages.length }}</span>
        <button class="lb-btn" type="button" aria-label="上一张" @click="stepLightbox(-1)">←</button>
        <button class="lb-btn" type="button" aria-label="下一张" @click="stepLightbox(1)">→</button>
        <button class="lb-btn" type="button" aria-label="关闭" @click="closeLightbox">ESC ✕</button>
      </div>
    </div>
  </Transition>
</template>
