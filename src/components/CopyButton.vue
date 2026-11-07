<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { copyText } from '@/utils/dom'
import { notify } from '@/composables/useUi'

const props = withDefaults(
  defineProps<{
    text: string
    label?: string
    toast?: string
  }>(),
  { label: '复制', toast: '已复制到剪贴板' },
)

const copied = ref(false)
let timer: number | undefined

async function run() {
  const ok = await copyText(props.text)
  if (!ok) {
    notify('复制失败，请手动选择文本')
    return
  }
  copied.value = true
  notify(props.toast)
  window.clearTimeout(timer)
  timer = window.setTimeout(() => (copied.value = false), 1800)
}

onUnmounted(() => window.clearTimeout(timer))
</script>

<template>
  <button
    class="copy-btn"
    :class="{ 'is-copied': copied }"
    type="button"
    :aria-label="`复制 ${text}`"
    @click="run"
  >
    <svg v-if="!copied" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
      <rect x="5" y="5" width="9" height="9" rx="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
    </svg>
    <svg v-else viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
    <span>{{ copied ? '已复制' : label }}</span>
  </button>
</template>
