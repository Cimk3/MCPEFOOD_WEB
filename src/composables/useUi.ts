import { readonly, ref } from 'vue'
import type { GalleryImage } from '@/data/site'

export interface ToastItem {
  id: number
  text: string
}

const toasts = ref<ToastItem[]>([])
let toastId = 0

export function notify(text: string, duration = 2200): void {
  const id = ++toastId
  toasts.value.push({ id, text })
  window.setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }, duration)
}

const lightboxImages = ref<GalleryImage[]>([])
const lightboxIndex = ref(-1)

export function openLightbox(images: GalleryImage[], index: number): void {
  lightboxImages.value = images
  lightboxIndex.value = index
  document.body.style.overflow = 'hidden'
}

export function closeLightbox(): void {
  lightboxIndex.value = -1
  document.body.style.overflow = ''
}

export function stepLightbox(delta: number): void {
  const total = lightboxImages.value.length
  if (!total) return
  lightboxIndex.value = (lightboxIndex.value + delta + total) % total
}

export function useUi() {
  return {
    toasts: readonly(toasts),
    notify,
    lightboxImages: readonly(lightboxImages),
    lightboxIndex: readonly(lightboxIndex),
    openLightbox,
    closeLightbox,
    stepLightbox,
  }
}
