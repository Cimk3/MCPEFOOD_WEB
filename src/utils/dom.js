/**
 * 纯 JavaScript 工具层：DOM 动效观察、剪贴板、滚动定位。
 * 这一层不依赖 Vue，便于在任何页面中复用。
 */

let revealObserver = null
let mutationObserver = null
let scanQueued = false

/** 扫描页面中的 .reveal 元素，进入视口时加上 .is-visible */
function scanReveals() {
  if (!revealObserver) return
  const nodes = document.querySelectorAll('.reveal:not(.is-visible)')
  nodes.forEach((el) => revealObserver.observe(el))
}

/** 初始化一次即可；MutationObserver 会自动覆盖路由切换 / -tab 切换产生的新节点 */
export function initReveal() {
  if (revealObserver) return () => {}

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.06, rootMargin: '0px 0px -40px 0px' },
  )

  scanReveals()

  const root = document.getElementById('app')
  if (root) {
    mutationObserver = new MutationObserver(() => {
      if (scanQueued) return
      scanQueued = true
      requestAnimationFrame(() => {
        scanQueued = false
        scanReveals()
      })
    })
    mutationObserver.observe(root, { childList: true, subtree: true })
  }

  return () => {
    revealObserver?.disconnect()
    mutationObserver?.disconnect()
    revealObserver = null
    mutationObserver = null
  }
}

/** 复制文本，兼容非安全上下文（file:// 或 http 局域网预览） */
export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // 继续走兜底方案
  }

  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

/** 平滑滚动到页面内锚点，自动避开吸顶导航 */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 96
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** 当前激活的章节：用于说明页侧边目录高亮 */
export function observeSections(ids, onActive) {
  const targets = ids
    .map((id) => document.getElementById(id))
    .filter((el) => el instanceof HTMLElement)

  const io = new IntersectionObserver(
    () => {
      let active = ids[0]
      targets.forEach((el) => {
        if (el.getBoundingClientRect().top <= 160) active = el.id
      })
      onActive(active)
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
  )

  targets.forEach((el) => io.observe(el))
  return () => io.disconnect()
}
