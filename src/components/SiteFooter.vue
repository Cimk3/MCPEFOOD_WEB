<script setup lang="ts">
import { REPO, REPO_DOCS, REPO_ISSUES, REPO_LICENSE, REPO_RELEASES, SITE } from '@/data/site'
import PixelIcon from '@/components/PixelIcon.vue'
import GrassEdge from '@/components/GrassEdge.vue'
</script>

<template>
  <footer class="site-footer">
    <GrassEdge />
    <div class="footer-body">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="brand">
              <span class="brand-mark"><PixelIcon name="bowl" :size="30" /></span>
              <span class="brand-text">
                <strong>方寸食光</strong>
                <small class="pixel">FOOD&amp;TABLE</small>
              </span>
            </div>
            <p>{{ SITE.tagline }}<br />Minecraft 基岩版创造模式装饰附加包，免费、开源。</p>
            <div class="footer-chips">
              <span class="chip"><span class="dot"></span>当前版本 v{{ SITE.version }}</span>
              <span class="chip">{{ SITE.license }} 开源</span>
            </div>
          </div>

          <div class="footer-col">
            <h4>本站</h4>
            <RouterLink to="/">首页</RouterLink>
            <RouterLink to="/download">下载</RouterLink>
            <RouterLink to="/docs">新手指南</RouterLink>
            <RouterLink to="/docs#faq">常见问题</RouterLink>
          </div>

          <div class="footer-col">
            <h4>项目</h4>
            <a :href="REPO" target="_blank" rel="noopener noreferrer">GitHub 仓库 ↗</a>
            <a :href="REPO_RELEASES" target="_blank" rel="noopener noreferrer">所有版本 ↗</a>
            <a :href="`${REPO_DOCS}/CATALOG.md`" target="_blank" rel="noopener noreferrer">完整物品清单 ↗</a>
            <a :href="REPO_ISSUES" target="_blank" rel="noopener noreferrer">反馈问题 ↗</a>
          </div>

          <div class="footer-col">
            <h4>说明</h4>
            <p class="footer-note">
              网站中的图片是作者生成的物品预览图，并非游戏内截图，实际效果以游戏中为准。
            </p>
            <a :href="REPO_LICENSE" target="_blank" rel="noopener noreferrer">许可协议 ↗</a>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© 2026 Food &amp; Table contributors</span>
          <span>非 Mojang / Microsoft 官方产品 · Minecraft 是 Mojang Synergies AB 的商标</span>
        </div>
      </div>
    </div>
  </footer>
</template>
