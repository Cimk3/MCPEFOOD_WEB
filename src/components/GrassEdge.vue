<script setup lang="ts">
/**
 * 草方块侧面像素带：顶部绿色草皮 + 下方泥土，用作页面“地面”分隔。
 * 使用固定种子的伪随机，保证每次渲染图案一致。
 */
const COLS = 32
const ROWS = 6
const GREENS = ['#6aa84f', '#5c9a43', '#7bb95a', '#4f8a38']
const DIRTS = ['#7a5233', '#6b4529', '#86593a', '#5d3c25']

let seed = 20261106
function rand() {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}

const cells: { x: number; y: number; fill: string }[] = []
for (let x = 0; x < COLS; x++) {
  const depth = 2 + (rand() < 0.55 ? 1 : 0) + (rand() < 0.22 ? 1 : 0)
  for (let y = 0; y < ROWS; y++) {
    const pal = y < depth ? GREENS : DIRTS
    cells.push({ x, y, fill: pal[Math.floor(rand() * pal.length)] })
  }
}
</script>

<template>
  <div class="grass-edge" aria-hidden="true">
    <svg width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <pattern id="grass-tile" :width="COLS * 6" :height="ROWS * 6" patternUnits="userSpaceOnUse">
          <rect
            v-for="(c, i) in cells"
            :key="i"
            :x="c.x * 6"
            :y="c.y * 6"
            width="6"
            height="6"
            :fill="c.fill"
            shape-rendering="crispEdges"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grass-tile)" />
    </svg>
  </div>
</template>
