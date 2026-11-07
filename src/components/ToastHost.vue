<script setup lang="ts">
import { useUi } from '@/composables/useUi'

const { toasts } = useUi()
</script>

<template>
  <div class="toast-stack" aria-live="polite">
    <TransitionGroup name="toast">
      <div v-for="t in toasts" :key="t.id" class="toast">{{ t.text }}</div>
    </TransitionGroup>
  </div>
</template>
