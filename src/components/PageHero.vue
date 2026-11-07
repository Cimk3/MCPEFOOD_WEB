<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    highlight?: string
    lead: string
    icon?: string
  }>(),
  { highlight: '', icon: '' },
)
</script>

<template>
  <section class="page-hero">
    <div class="container page-hero-inner">
      <div class="ph-copy">
        <div class="eyebrow">{{ eyebrow }}</div>
        <h1>{{ title }}<span v-if="highlight" class="mark">{{ highlight }}</span></h1>
        <p class="lead">{{ lead }}</p>
        <div v-if="$slots.meta" class="hero-meta">
          <slot name="meta" />
        </div>
      </div>
      <div v-if="$slots.side" class="ph-side">
        <slot name="side" />
      </div>
    </div>
  </section>
</template>
