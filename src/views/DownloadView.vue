<script setup lang="ts">
import { ASSETS, HISTORY, INSTALL_STEPS, REPO_LATEST, REPO_RELEASES, SITE } from '@/data/site'
import PageHero from '@/components/PageHero.vue'
import CopyButton from '@/components/CopyButton.vue'
import PixelIcon from '@/components/PixelIcon.vue'

const primary = ASSETS.find((a) => a.primary) ?? ASSETS[0]
const packs = ASSETS.filter((a) => a.kind === 'MCPACK')
const extras = ASSETS.filter((a) => !a.primary && a.kind !== 'MCPACK')
const winCmd = `certutil -hashfile ${primary.name} SHA256`
const unixCmd = `shasum -a 256 ${primary.name}`

const releaseNotes = [
  'ICU 病床变窄为 1×2 格，旁边终于能摆设备了',
  '空手点床头或床尾，就能把整张床收回',
  '监护仪、注射泵、ECMO、呼吸机等外观重做',
  '新增 22 件医院摆件，一条命令就能领齐',
]
</script>

<template>
  <PageHero
    eyebrow="下载"
    title="下载"
    highlight="方寸食光"
    lead="完全免费。不知道该下哪个？直接点下面的绿色大按钮就对了。"
  >
    <template #meta>
      <span class="chip chip-green"><span class="dot"></span>最新版 v{{ SITE.version }}</span>
      <span class="chip">{{ SITE.releaseDate }} 发布</span>
      <span class="chip">适用于 {{ SITE.target }}</span>
    </template>
  </PageHero>

  <!-- ============ 主下载卡 ============ -->
  <section class="section-tight dl-top">
    <div class="container">
      <div class="dl-card reveal">
        <div class="dl-main">
          <div class="dl-head">
            <span class="slot dl-slot"><PixelIcon name="grass" :size="44" /></span>
            <div>
              <span class="dl-kicker">推荐 · 一键安装包</span>
              <h2>方寸食光 <span class="pixel">v{{ SITE.version }}</span></h2>
            </div>
          </div>

          <ul class="dl-checks">
            <li><span class="tick">✓</span>行为包 + 资源包都在里面，一次装好</li>
            <li><span class="tick">✓</span>支持 Windows 和安卓版</li>
            <li><span class="tick">✓</span>不用开实验性玩法</li>
            <li><span class="tick">✓</span>适用于 {{ SITE.targetFull }}</li>
          </ul>

          <div class="btn-row">
            <a :href="primary.url" class="btn btn-primary btn-lg dl-btn" rel="noopener noreferrer">
              <PixelIcon name="download" :size="24" /> 立即下载
              <span class="dl-size">{{ primary.size }}</span>
            </a>
          </div>
          <p class="dl-tip">文件从 GitHub 直接下载。下载慢的话，可以多试几次或换个网络。</p>
        </div>

        <aside class="dl-notes">
          <div class="dl-notes-head">
            <b>这个版本更新了什么</b>
            <a :href="REPO_LATEST" target="_blank" rel="noopener noreferrer">完整说明 ↗</a>
          </div>
          <ul>
            <li v-for="(n, i) in releaseNotes" :key="i">
              <span class="pixel">{{ i + 1 }}</span>{{ n }}
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </section>

  <!-- ============ 安装步骤 ============ -->
  <section class="section-tight" id="install">
    <div class="container">
      <div class="section-head reveal">
        <div>
          <div class="eyebrow has-num"><span class="px-num">01</span>下载之后</div>
          <h2 class="section-title">四步装好</h2>
          <p class="section-sub">第一次装附加包也不用怕，照着做就行。</p>
        </div>
      </div>

      <ol class="steps-row">
        <li v-for="(s, i) in INSTALL_STEPS" :key="s.title" class="step-card card reveal">
          <div class="step-top">
            <span class="slot"><PixelIcon :name="s.icon" :size="34" /></span>
            <span class="step-no pixel">{{ i + 1 }}</span>
          </div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.body }}</p>
          <span class="step-tip">{{ s.tip }}</span>
        </li>
      </ol>

      <div class="callout reveal">
        <span class="callout-icon"><PixelIcon name="book" :size="36" /></span>
        <div>
          <b>装好了却找不到东西？</b>
          <p>最常见的原因是只打开了一个包，或者同时开着旧版本。去新手指南看看排查方法。</p>
        </div>
        <RouterLink to="/docs#faq" class="btn btn-sm">常见问题 <span class="arrow">▶</span></RouterLink>
      </div>
    </div>
  </section>

  <!-- ============ 其他文件 ============ -->
  <section class="section-tight" id="files">
    <div class="container">
      <div class="section-head reveal">
        <div>
          <div class="eyebrow has-num"><span class="px-num">02</span>其他文件</div>
          <h2 class="section-title">我该下载哪个？</h2>
          <p class="section-sub">绝大多数玩家只需要上面的“一键安装包”。下面这些是给特殊情况准备的。</p>
        </div>
      </div>

      <div class="which-grid">
        <div class="which-card card reveal">
          <span class="which-who">需要分开导入的玩家</span>
          <h3>行为包 + 资源包</h3>
          <p>和一键安装包内容一样，只是拆成了两个文件。<b>两个都要下载、都要启用</b>，版本也必须一致。</p>
          <div class="file-list">
            <div v-for="a in packs" :key="a.name" class="file-row">
              <div class="file-info">
                <b>{{ a.label }}</b>
                <small>{{ a.desc }}</small>
              </div>
              <span class="file-size">{{ a.size }}</span>
              <a :href="a.url" class="btn btn-sm" rel="noopener noreferrer">下载</a>
            </div>
          </div>
        </div>

        <div class="which-card card reveal">
          <span class="which-who">开发者 / 进阶玩家</span>
          <h3>源代码与校验清单</h3>
          <p>想研究制作方法、二次创作，或者确认下载的文件完整无损时使用。</p>
          <div class="file-list">
            <div v-for="a in extras" :key="a.name" class="file-row">
              <div class="file-info">
                <b>{{ a.label }}</b>
                <small>{{ a.desc }}</small>
              </div>
              <span class="file-size">{{ a.size }}</span>
              <a :href="a.url" class="btn btn-sm" rel="noopener noreferrer">下载</a>
            </div>
          </div>
        </div>
      </div>

      <details class="advanced reveal">
        <summary>
          <span>进阶：核对文件是否完整（SHA-256 校验）</span>
          <span class="adv-plus pixel">+</span>
        </summary>
        <div class="adv-body">
          <p>
            如果担心文件下载损坏，可以计算文件的 SHA-256 值，和下面的官方值对比，一致就说明没问题。普通玩家可以跳过这一步。
          </p>
          <div class="hash-list">
            <div v-for="a in ASSETS" :key="a.name" class="hash-row">
              <span class="hash-name">{{ a.name }}</span>
              <code>{{ a.sha256 }}</code>
              <CopyButton :text="a.sha256" toast="校验值已复制" />
            </div>
          </div>
          <div class="hash-cmds">
            <div>
              <span>Windows（命令提示符）</span>
              <div class="cmd-line light">
                <code>{{ winCmd }}</code>
                <CopyButton :text="winCmd" toast="命令已复制" />
              </div>
            </div>
            <div>
              <span>macOS / Linux（终端）</span>
              <div class="cmd-line light">
                <code>{{ unixCmd }}</code>
                <CopyButton :text="unixCmd" toast="命令已复制" />
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  </section>

  <!-- ============ 历史版本 ============ -->
  <section class="section-tight" id="history">
    <div class="container">
      <div class="section-head reveal">
        <div>
          <div class="eyebrow has-num"><span class="px-num">03</span>历史版本</div>
          <h2 class="section-title">以前的版本</h2>
          <p class="section-sub">旧版本仍然可以下载，但建议一直用最新版。升级前记得备份世界。</p>
        </div>
        <a :href="REPO_RELEASES" target="_blank" rel="noopener noreferrer" class="btn btn-sm">全部版本 ↗</a>
      </div>

      <div class="history-list reveal">
        <a
          v-for="h in HISTORY"
          :key="h.version"
          :href="h.url"
          target="_blank"
          rel="noopener noreferrer"
          class="history-row"
        >
          <span class="hr-v pixel">v{{ h.version }}</span>
          <span class="hr-title">{{ h.title }}</span>
          <span class="hr-date">{{ h.date }}</span>
          <span class="hr-arrow">↗</span>
        </a>
      </div>
    </div>
  </section>
</template>
