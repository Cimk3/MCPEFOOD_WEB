<script setup lang="ts">
import { computed } from 'vue'
import { PIXEL_ICONS, PIXEL_PALETTE } from '@/data/pixels'

const props = withDefaults(defineProps<{ name: string; size?: number }>(), { size: 32 })

/** 把同一行中相邻同色像素合并成一个矩形，减少 SVG 节点 */
const rects = computed(() => {
  const rows = PIXEL_ICONS[props.name] ?? []
  const out: { x: number; y: number; w: number; fill: string }[] = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const ch = row[x]
      if (ch === '.' || !PIXEL_PALETTE[ch]) {
        x++
        continue
      }
      let w = 1
      while (row[x + w] === ch) w++
      out.push({ x, y, w, fill: PIXEL_PALETTE[ch] })
      x += w
    }
  })
  return out
})
</script>

<template>
  <svg
    class="pixel-icon"
    viewBox="0 0 12 12"
    :width="size"
    :height="size"
    shape-rendering="crispEdges"
    aria-hidden="true"
  >
    <rect v-for="(r, i) in rects" :key="i" :x="r.x" :y="r.y" :width="r.w" height="1" :fill="r.fill" />
  </svg>
</template>
