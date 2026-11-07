<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { CMD_PREFIX, FEATURES, GALLERY, REPO, REPO_LATEST, SITE, STATS, preview } from '@/data/site'
import { openLightbox } from '@/composables/useUi'
import CopyButton from '@/components/CopyButton.vue'
import PixelIcon from '@/components/PixelIcon.vue'

/* ---------- 首屏快捷栏：像游戏里一样切换物品 ---------- */
const HOTBAR = [
  { icon: 'bowl', name: '全部菜品', sub: '102 道，都能吃', file: 'menu.png' },
  { icon: 'cake', name: '甜品', sub: '13 道甜点', file: 'category_dessert.png' },
  { icon: 'cup', name: '碗盘餐具', sub: '15 种，随意混搭', file: 'tableware.png' },
  { icon: 'house', name: '居家装饰', sub: '让房间有生活感', file: 'home_decor.png' },
  { icon: 'screen', name: '电子设备', sub: '41 款，纯装饰', file: 'electronics.png' },
  { icon: 'medkit', name: '医院设备', sub: '0.8.6 新内容', file: 'patch_086_medical_front.png' },
  { icon: 'frame', name: '美食海报', sub: '挂满一整面墙', file: 'poster_wall.png' },
]

const slot = ref(0)
const current = computed(() => HOTBAR[slot.value])
const paused = ref(false)
let timer: number | undefined

function select(i: number) {
  slot.value = (i + HOTBAR.length) % HOTBAR.length
}

function startAuto() {
  window.clearInterval(timer)
  timer = window.setInterval(() => {
    if (!paused.value) select(slot.value + 1)
  }, 3200)
}

function onKey(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null
  if (t && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return
  const n = Number(e.key)
  if (n >= 1 && n <= HOTBAR.length) {
    select(n - 1)
    startAuto()
  }
}

onMounted(() => {
  startAuto()
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.clearInterval(timer)
  window.removeEventListener('keydown', onKey)
})

function openHero() {
  openLightbox(
    HOTBAR.map((h) => ({ file: h.file, label: h.name, en: h.sub })),
    slot.value,
  )
}

/* ---------- 图鉴 ---------- */
const activeGroup = ref(GALLERY[0].key)
const group = computed(() => GALLERY.find((g) => g.key === activeGroup.value) ?? GALLERY[0])

function openAt(index: number) {
  openLightbox(group.value.images, index)
}

const NEW_IN_086 = [
  { t: '病床变窄了', d: 'ICU 病床现在只占 1×2 格，两边终于能放下监护仪等设备。' },
  { t: '收床更方便', d: '空着手点一下床头或床尾，整张床就会一起收回。' },
  { t: '设备重新做了一遍', d: '监护仪、注射泵、ECMO、呼吸机等外观更精致，背面细节也补齐了。' },
  { t: '一条命令全部领走', d: '22 件医院摆件正式加入，输入下面的命令一次领齐。' },
]
</script>

<template>
  <!-- ============ 首屏 ============ -->
  <section class="home-hero">
    <div class="hero-sky" aria-hidden="true">
      <svg class="cloud c1" viewBox="0 0 16 6" shape-rendering="crispEdges">
        <path d="M3 1h7v1h3v1h3v3H0V3h3z" fill="#fff" />
      </svg>
      <svg class="cloud c2" viewBox="0 0 16 6" shape-rendering="crispEdges">
        <path d="M5 0h5v2h4v2h2v2H0V3h2V2h3z" fill="#fff" />
      </svg>
      <svg class="cloud c3" viewBox="0 0 16 6" shape-rendering="crispEdges">
        <path d="M2 2h4V1h6v2h4v3H0V4h2z" fill="#fff" />
      </svg>
    </div>

    <div class="container hero-inner">
      <div class="hero-copy">
        <span class="chip chip-green hero-chip">
          <span class="dot"></span> Minecraft 基岩版附加包 · v{{ SITE.version }} 已发布
        </span>
        <h1 class="hero-title">
          方寸<span class="hero-title-accent">食光</span>
        </h1>
        <p class="hero-tagline">{{ SITE.tagline }}</p>
        <p class="hero-desc">{{ SITE.description }}</p>

        <div class="btn-row hero-btns">
          <RouterLink to="/download" class="btn btn-primary btn-lg">
            <PixelIcon name="download" :size="22" /> 免费下载
          </RouterLink>
          <RouterLink to="/docs" class="btn btn-lg">怎么安装？ <span class="arrow">▶</span></RouterLink>
        </div>

        <ul class="hero-facts">
          <li><span class="tick">✓</span>Windows / 安卓都能用</li>
          <li><span class="tick">✓</span>不用开实验性玩法</li>
          <li><span class="tick">✓</span>完全免费、开源</li>
        </ul>
      </div>

      <div class="hero-visual" @mouseenter="paused = true" @mouseleave="paused = false">
        <button class="hv-screen" type="button" aria-label="放大查看当前预览图" @click="openHero">
          <Transition name="swap" mode="out-in">
            <img :key="current.file" :src="preview(current.file)" :alt="current.name" />
          </Transition>
          <span class="hv-zoom pixel">+</span>
        </button>

        <div class="hv-tip-wrap">
          <Transition name="swap" mode="out-in">
            <div :key="current.name" class="mc-tip hv-tip">
              <b>{{ current.name }}</b>
              <small>{{ current.sub }}</small>
              <i>方寸食光</i>
            </div>
          </Transition>
        </div>

        <div class="hotbar" role="tablist" aria-label="切换预览内容">
          <button
            v-for="(h, i) in HOTBAR"
            :key="h.name"
            class="hotbar-slot"
            :class="{ active: slot === i }"
            type="button"
            role="tab"
            :aria-selected="slot === i"
            :aria-label="h.name"
            @click="select(i); startAuto()"
          >
            <PixelIcon :name="h.icon" :size="34" />
            <span class="hs-key pixel">{{ i + 1 }}</span>
          </button>
        </div>
        <p class="hv-hint">点格子切换 · 键盘按 1–7 也可以 · 点大图放大</p>
      </div>
    </div>
  </section>

  <!-- ============ 数字 ============ -->
  <section class="stats-wrap">
    <div class="container">
      <div class="stats-grid reveal">
        <div v-for="s in STATS" :key="s.label" class="stat">
          <div class="stat-num">
            <b class="pixel">{{ s.value }}</b><span>{{ s.unit }}</span>
          </div>
          <div class="stat-label">{{ s.label }}</div>
          <div class="stat-note">{{ s.note }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ 特色 ============ -->
  <section class="section" id="features">
    <div class="container">
      <div class="section-head reveal">
        <div>
          <div class="eyebrow has-num"><span class="px-num">01</span>它能做什么</div>
          <h2 class="section-title">装上它，你的世界会<span class="mark">更有烟火气</span></h2>
          <p class="section-sub">
            不改变原版玩法，只是让你在创造模式里，多了几百件好看又有生活感的东西可以摆。
          </p>
        </div>
      </div>

      <div class="feature-grid">
        <article v-for="f in FEATURES" :key="f.title" class="feature-card card card-hover reveal">
          <span class="slot"><PixelIcon :name="f.icon" :size="36" /></span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.body }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ============ 图鉴 ============ -->
  <section class="section gallery-section" id="gallery">
    <div class="container">
      <div class="section-head reveal">
        <div>
          <div class="eyebrow has-num"><span class="px-num">02</span>物品图鉴</div>
          <h2 class="section-title">先看看都长什么样</h2>
          <p class="section-sub">点任意一张图可以放大。这些是作者生成的预览图，游戏里的实际效果会受光线和画质影响。</p>
        </div>
      </div>

      <div class="gallery-tabs reveal" role="tablist" aria-label="图鉴分类">
        <button
          v-for="g in GALLERY"
          :key="g.key"
          class="tab-btn"
          :class="{ active: activeGroup === g.key }"
          type="button"
          role="tab"
          :aria-selected="activeGroup === g.key"
          @click="activeGroup = g.key"
        >
          {{ g.label }}
        </button>
        <span class="gallery-note">{{ group.note }}</span>
      </div>

      <div class="gallery-grid">
        <button
          v-for="(img, i) in group.images"
          :key="img.file"
          class="shot gallery-item reveal"
          :class="{ 'is-wide': img.wide }"
          type="button"
          @click="openAt(i)"
        >
          <img :src="preview(img.file)" :alt="img.label" loading="lazy" />
          <span class="mc-tip shot-tip">
            <b>{{ img.label }}</b>
            <small>点击放大</small>
          </span>
        </button>
      </div>
    </div>
  </section>

  <!-- ============ 本次更新 ============ -->
  <section class="section night-section" id="whats-new">
    <div class="container">
      <div class="whats-new">
        <div class="wn-copy reveal">
          <div class="eyebrow has-num"><span class="px-num">NEW</span>v{{ SITE.version }} 更新了什么</div>
          <h2 class="section-title">医院场景，<br />重新打磨了一遍</h2>
          <p class="section-sub">这次更新主要照顾想搭医院的玩家：病床更好摆，设备更好看。</p>

          <ul class="wn-list">
            <li v-for="(n, i) in NEW_IN_086" :key="n.t">
              <span class="wn-no pixel">{{ i + 1 }}</span>
              <div>
                <b>{{ n.t }}</b>
                <p>{{ n.d }}</p>
              </div>
            </li>
          </ul>

          <div class="cmd-line">
            <code>{{ CMD_PREFIX }}tasting_new</code>
            <CopyButton :text="`${CMD_PREFIX}tasting_new`" toast="命令已复制，去游戏聊天栏粘贴吧" />
          </div>

          <div class="btn-row">
            <RouterLink to="/download" class="btn btn-primary">下载新版本 <span class="arrow">▶</span></RouterLink>
            <a :href="REPO_LATEST" target="_blank" rel="noopener noreferrer" class="btn btn-dark">完整更新说明 ↗</a>
          </div>
        </div>

        <div class="wn-visual reveal">
          <button
            class="shot wn-main"
            type="button"
            @click="
              openLightbox(
                [
                  { file: 'patch_086_medical_front.png', label: '医院设备 · 正面', en: '' },
                  { file: 'patch_086_medical_rear.png', label: '医院设备 · 背面', en: '' },
                ],
                0,
              )
            "
          >
            <img :src="preview('patch_086_medical_front.png')" alt="0.8.6 医院设备正面预览" loading="lazy" />
            <span class="mc-tip shot-tip"><b>医院设备 · 正面</b><small>点击放大</small></span>
          </button>
          <div class="wn-side">
            <button
              class="shot"
              type="button"
              @click="
                openLightbox(
                  [
                    { file: 'patch_086_medical_front.png', label: '医院设备 · 正面', en: '' },
                    { file: 'patch_086_medical_rear.png', label: '医院设备 · 背面', en: '' },
                  ],
                  1,
                )
              "
            >
              <img :src="preview('patch_086_medical_rear.png')" alt="0.8.6 医院设备背面预览" loading="lazy" />
              <span class="mc-tip shot-tip"><b>背面也有细节</b></span>
            </button>
            <div class="wn-badge">
              <span class="pixel">+22</span>
              <b>件医院摆件</b>
              <small>CT、B 超、ICU 病床、ECMO、呼吸机…</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ 三步上手 ============ -->
  <section class="section" id="how">
    <div class="container">
      <div class="section-head reveal">
        <div>
          <div class="eyebrow has-num"><span class="px-num">03</span>怎么开始</div>
          <h2 class="section-title">三步装好，马上开摆</h2>
        </div>
        <RouterLink to="/docs" class="btn btn-sm">看详细图文指南 <span class="arrow">▶</span></RouterLink>
      </div>

      <ol class="how-steps">
        <li class="reveal">
          <span class="slot"><PixelIcon name="download" :size="34" /></span>
          <span class="how-no pixel">1</span>
          <b>下载</b>
          <p>点“免费下载”，拿到一个 <code>.mcaddon</code> 文件。</p>
        </li>
        <li class="reveal">
          <span class="slot"><PixelIcon name="chest" :size="34" /></span>
          <span class="how-no pixel">2</span>
          <b>双击导入</b>
          <p>双击这个文件，游戏会自动打开并完成导入。</p>
        </li>
        <li class="reveal">
          <span class="slot"><PixelIcon name="grass" :size="34" /></span>
          <span class="how-no pixel">3</span>
          <b>在世界里启用</b>
          <p>编辑世界，把“方寸食光”的两个包都打开，进创造模式就能找到。</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- ============ 行动号召 ============ -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-card reveal">
        <div class="cta-icon"><PixelIcon name="cake" :size="72" /></div>
        <div class="cta-copy">
          <h2>今天，给你的世界加一桌菜。</h2>
          <p>免费下载 · 约 35 MB · 适用于 {{ SITE.targetFull }}</p>
        </div>
        <div class="btn-row">
          <RouterLink to="/download" class="btn btn-primary btn-lg">免费下载 <span class="arrow">▶</span></RouterLink>
          <a :href="REPO" target="_blank" rel="noopener noreferrer" class="btn btn-lg">GitHub ↗</a>
        </div>
      </div>
    </div>
  </section>
</template>
