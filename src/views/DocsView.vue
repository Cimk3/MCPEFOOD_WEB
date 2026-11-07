<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import {
  CMD_PREFIX,
  COMMANDS,
  DEV_LINKS,
  DOC_LINKS,
  DOC_SECTIONS,
  FAQ,
  INSTALL_STEPS,
  REPO,
  REPO_DOCS,
  REPO_ISSUES,
  SITE,
} from '@/data/site'
import { observeSections, scrollToId } from '@/utils/dom'
import PageHero from '@/components/PageHero.vue'
import CopyButton from '@/components/CopyButton.vue'
import PixelIcon from '@/components/PixelIcon.vue'

const active = ref(DOC_SECTIONS[0].id)
let disposeSections: () => void = () => {}

onMounted(async () => {
  await nextTick()
  disposeSections = observeSections(
    DOC_SECTIONS.map((s) => s.id),
    (id) => (active.value = id),
  )
})

onUnmounted(() => disposeSections())

function go(id: string) {
  active.value = id
  scrollToId(id)
}

const cmdFilters = ['全部', '常用', '场景'] as const
const cmdFilter = ref<(typeof cmdFilters)[number]>('全部')
const filteredCommands = computed(() =>
  cmdFilter.value === '全部' ? COMMANDS : COMMANDS.filter((c) => c.group === cmdFilter.value),
)

/** 摆放示意图：b = 方块，i = 摆件，. = 空气 */
const PLACEMENT = [
  {
    title: '放在桌面 / 地面',
    grid: ['...', '.i.', 'bbb'],
    ok: ['完整方块的顶上', '台阶（半砖）的顶上', '倒过来放的楼梯顶上'],
    note: '正着放的楼梯不行；高一点的设备，头顶要留出空间。',
  },
  {
    title: '挂在墙上',
    grid: ['b..', 'bi.', 'b..'],
    ok: ['一整面完整的墙', '墙前面要空着'],
    note: '大广告屏会以你点的那一格为左下角，往右上方展开，所以墙要够大。',
  },
  {
    title: '吊在天花板',
    grid: ['bbb', '.i.', '...'],
    ok: ['对着天花板的底面点', '下面要留出空间'],
    note: '吊顶屏幕会往右多占一格。',
  },
  {
    title: '大件设备',
    grid: ['....', '.ii.', '.ii.', 'bbbb'],
    ok: ['ICU 病床占 1×2 格', 'CT 等大型设备占 2×3 格'],
    note: '摆之前先把地方空出来，空间不够就放不下。',
  },
]

const CAN = [
  '吃掉 102 道菜（按游戏里弹出的菜单操作）',
  '用碗、盘、杯、托盘自由组合摆盘',
  '把衣服挂到衣架或人台上展示',
  '空手点一下摆件，就能把它收回来',
]

const CANNOT = [
  '电脑、电视、广告屏真的运行或换画面',
  '收银、扫码、交易等功能',
  '把衣服穿到自己身上',
  '在生存模式里合成新加的摆件',
]

const dishGroups = [
  { label: '中餐', count: 42, pct: 100 },
  { label: '西餐', count: 23, pct: 55 },
  { label: '日料', count: 13, pct: 31 },
  { label: '甜品', count: 13, pct: 31 },
  { label: '饮品', count: 11, pct: 26 },
]

const sceneGroups = [
  '医院', '电子设备', '实验室', '教室', '办事大厅', '电力设备', '新闻演播',
  '军警', '服装店', '车站', '家居装饰', '家电', '办公文具', '银行',
  'AI 工作设备', '餐厅服务', '广告画', '电子广告屏',
]
</script>

<template>
  <PageHero
    eyebrow="新手指南"
    title="新手"
    highlight="指南"
    lead="从安装到摆满一整条街，看这一页就够了。遇到问题，可以直接跳到“常见问题”。"
  >
    <template #meta>
      <span class="chip chip-green"><span class="dot"></span>适用于 v{{ SITE.version }}</span>
      <span class="chip">{{ SITE.target }}</span>
      <span class="chip">不用开实验性玩法</span>
    </template>
  </PageHero>

  <div class="container doc-layout">
    <!-- ============ 侧边目录 ============ -->
    <aside class="doc-aside">
      <div class="da-inner">
        <span class="da-title">目录</span>
        <nav aria-label="页面目录">
          <button
            v-for="(s, i) in DOC_SECTIONS"
            :key="s.id"
            class="da-link"
            :class="{ active: active === s.id }"
            type="button"
            @click="go(s.id)"
          >
            <span class="pixel">{{ i + 1 }}</span>{{ s.label }}
          </button>
        </nav>
        <RouterLink to="/download" class="btn btn-primary btn-sm da-cta">去下载 <span class="arrow">▶</span></RouterLink>
      </div>
    </aside>

    <!-- ============ 正文 ============ -->
    <div class="doc-content">
      <!-- 安装 -->
      <section id="install" class="doc-block">
        <div class="db-head">
          <span class="db-no pixel">1</span>
          <div>
            <h2>安装</h2>
            <p>整个过程大概一分钟。</p>
          </div>
        </div>
        <ol class="doc-steps">
          <li v-for="(s, i) in INSTALL_STEPS" :key="s.title">
            <span class="slot"><PixelIcon :name="s.icon" :size="30" /></span>
            <div>
              <b><span class="pixel">{{ i + 1 }}.</span> {{ s.title }}</b>
              <p>{{ s.body }}</p>
              <small>{{ s.tip }}</small>
            </div>
          </li>
        </ol>
        <div class="callout">
          <span class="callout-icon"><PixelIcon name="shield" :size="36" /></span>
          <div>
            <b>行为包和资源包，必须一起打开</b>
            <p>
              可以理解为“身体”和“衣服”：行为包让东西能放、能吃，资源包决定东西长什么样。少开一个，东西就会看不见或用不了。用一键安装包的话，两个都已经在里面了。
            </p>
          </div>
        </div>
      </section>

      <!-- 找到物品 -->
      <section id="find" class="doc-block">
        <div class="db-head">
          <span class="db-no pixel">2</span>
          <div>
            <h2>找到物品</h2>
            <p>两种方法，挑你顺手的。</p>
          </div>
        </div>
        <div class="two-col">
          <div class="way-card card">
            <span class="way-tag">方法一 · 最简单</span>
            <h3>翻创造模式物品栏</h3>
            <p>进入创造模式，打开物品栏，新物品已经按分类放好了，和找原版物品一样。</p>
          </div>
          <div class="way-card card">
            <span class="way-tag">方法二 · 最快</span>
            <h3>用命令一次领一整套</h3>
            <p>在聊天栏输入命令，一下子领到一整个分类的物品，比如：</p>
            <div class="cmd-line light">
              <code>{{ CMD_PREFIX }}tasting_all_chinese</code>
              <CopyButton :text="`${CMD_PREFIX}tasting_all_chinese`" toast="命令已复制" />
            </div>
            <p class="way-note">更多命令见下方“命令速查”。</p>
          </div>
        </div>
        <div class="callout callout-warn">
          <span class="callout-icon"><PixelIcon name="book" :size="36" /></span>
          <div>
            <b>用命令前，要先打开“作弊”</b>
            <p>在世界设置里打开“激活作弊”才能输入命令。注意：打开后这个世界将无法获得成就。</p>
          </div>
        </div>
      </section>

      <!-- 摆放 -->
      <section id="placement" class="doc-block">
        <div class="db-head">
          <span class="db-no pixel">3</span>
          <div>
            <h2>怎么摆放</h2>
            <p>东西放不上去？多半是位置不对。看看下面的示意图（侧面视角）。</p>
          </div>
        </div>
        <div class="place-grid">
          <div v-for="p in PLACEMENT" :key="p.title" class="place-card card">
            <div class="mini" :style="{ gridTemplateColumns: `repeat(${p.grid[0].length}, 1fr)` }" aria-hidden="true">
              <template v-for="(row, y) in p.grid" :key="y">
                <span
                  v-for="(c, x) in row.split('')"
                  :key="`${y}-${x}`"
                  class="mini-cell"
                  :class="{ 'is-block': c === 'b', 'is-item': c === 'i' }"
                ></span>
              </template>
            </div>
            <div class="place-copy">
              <h3>{{ p.title }}</h3>
              <ul>
                <li v-for="o in p.ok" :key="o">{{ o }}</li>
              </ul>
              <p>{{ p.note }}</p>
            </div>
          </div>
        </div>
        <div class="mini-legend">
          <span><i class="mini-cell is-block"></i>方块</span>
          <span><i class="mini-cell is-item"></i>摆件</span>
          <span><i class="mini-cell"></i>需要空着</span>
        </div>
      </section>

      <!-- 能做什么 -->
      <section id="can-do" class="doc-block">
        <div class="db-head">
          <span class="db-no pixel">4</span>
          <div>
            <h2>能做什么，不能做什么</h2>
            <p>这是一个装饰包，大部分东西是“摆着好看”的。</p>
          </div>
        </div>
        <div class="two-col">
          <div class="can-card card is-yes">
            <h3><span class="pixel">✓</span>可以</h3>
            <ul>
              <li v-for="c in CAN" :key="c">{{ c }}</li>
            </ul>
          </div>
          <div class="can-card card is-no">
            <h3><span class="pixel">✕</span>不可以</h3>
            <ul>
              <li v-for="c in CANNOT" :key="c">{{ c }}</li>
            </ul>
          </div>
        </div>
        <p class="doc-note">
          衣架小贴士：单杆衣架能挂 2 件，双层衣架 4 件，人台 1 件。
        </p>
      </section>

      <!-- 命令 -->
      <section id="commands" class="doc-block">
        <div class="db-head">
          <span class="db-no pixel">5</span>
          <div>
            <h2>命令速查</h2>
            <p>点“复制”，然后到游戏聊天栏粘贴、回车即可（需要先打开作弊）。</p>
          </div>
        </div>
        <div class="cmd-toolbar">
          <div class="cmd-filters">
            <button
              v-for="f in cmdFilters"
              :key="f"
              class="tab-btn"
              :class="{ active: cmdFilter === f }"
              type="button"
              @click="cmdFilter = f"
            >
              {{ f }}
            </button>
          </div>
          <span class="cmd-count">共 {{ filteredCommands.length }} 条</span>
        </div>
        <div class="cmd-table">
          <div v-for="c in filteredCommands" :key="c.fn" class="cmd-row">
            <span class="cmd-desc">{{ c.desc }}</span>
            <code>{{ CMD_PREFIX }}{{ c.fn }}</code>
            <CopyButton :text="`${CMD_PREFIX}${c.fn}`" toast="命令已复制" />
          </div>
        </div>
      </section>

      <!-- 内容概览 -->
      <section id="catalog" class="doc-block">
        <div class="db-head">
          <span class="db-no pixel">6</span>
          <div>
            <h2>都有些什么</h2>
            <p>一共 393 件物品，下面是大致分类。</p>
          </div>
        </div>
        <div class="catalog-box card">
          <div class="cb-head">
            <b>102 道能吃的菜</b>
            <span>按菜系分</span>
          </div>
          <div class="dish-bars">
            <div v-for="d in dishGroups" :key="d.label" class="dish-bar">
              <span class="dish-name">{{ d.label }}</span>
              <span class="dish-track"><i :style="{ width: d.pct + '%' }"></i></span>
              <b class="pixel">{{ d.count }}</b>
            </div>
          </div>
          <div class="cb-extra">
            <span><b>15</b> 种餐具</span>
            <span><b>8</b> 种展示用配菜</span>
            <span><b>2</b> 款铜锅</span>
            <span><b>3</b> 款酒瓶</span>
          </div>
        </div>
        <h3 class="sub-head">还有这些场景的摆件</h3>
        <div class="scene-tags">
          <span v-for="g in sceneGroups" :key="g" class="tag">{{ g }}</span>
        </div>
        <p class="doc-note">
          同类的碗盘可以通用，比如白瓷盘、青边瓷碗、玻璃杯、马克杯等。想看每一件物品的名字？查看
          <a :href="`${REPO_DOCS}/CATALOG.md`" target="_blank" rel="noopener noreferrer" class="text-link">完整物品清单 ↗</a>
        </p>
      </section>

      <!-- FAQ -->
      <section id="faq" class="doc-block">
        <div class="db-head">
          <span class="db-no pixel">7</span>
          <div>
            <h2>常见问题</h2>
            <p>点问题展开答案。</p>
          </div>
        </div>
        <div class="faq-list">
          <details v-for="(item, i) in FAQ" :key="item.q" class="faq-item" :open="i === 0">
            <summary>
              <span class="faq-q">{{ item.q }}</span>
              <span class="faq-plus pixel">+</span>
            </summary>
            <p>{{ item.a }}</p>
          </details>
        </div>
      </section>

      <!-- 更多 -->
      <section id="more" class="doc-block">
        <div class="db-head">
          <span class="db-no pixel">8</span>
          <div>
            <h2>更多资料</h2>
            <p>想了解得更细，可以去项目仓库看看。</p>
          </div>
        </div>
        <div class="doc-links">
          <a v-for="d in DOC_LINKS" :key="d.url" :href="d.url" target="_blank" rel="noopener noreferrer" class="doc-link card card-hover">
            <b>{{ d.label }} ↗</b>
            <span>{{ d.desc }}</span>
          </a>
        </div>
        <div class="callout">
          <span class="callout-icon"><PixelIcon name="chest" :size="36" /></span>
          <div>
            <b>遇到 Bug 或有建议？</b>
            <p>手机触屏、联机、性能等方面还在持续实测中，欢迎到 GitHub 反馈你遇到的问题。</p>
          </div>
          <a :href="REPO_ISSUES" target="_blank" rel="noopener noreferrer" class="btn btn-sm">去反馈 ↗</a>
        </div>
        <details class="dev-more">
          <summary>给开发者的资料</summary>
          <div class="dev-links">
            <a v-for="d in DEV_LINKS" :key="d.url" :href="d.url" target="_blank" rel="noopener noreferrer">
              {{ d.label }} <span>{{ d.desc }} ↗</span>
            </a>
          </div>
        </details>
        <p class="doc-note">
          本项目使用 {{ SITE.license }} 协议开源，详见
          <a :href="`${REPO}/blob/main/LICENSE`" target="_blank" rel="noopener noreferrer" class="text-link">LICENSE ↗</a>
          。本网站为非官方的介绍页面。
        </p>
      </section>
    </div>
  </div>
</template>
