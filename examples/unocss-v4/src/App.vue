<script setup lang="ts">
import { App } from "antdv-next"
</script>

<template>
  <App>
    <div class="bg-ant-primary text-ant-sm rounded-ant-lg p-ant-lg shadow-ant-card">
      namespace-safe
    </div>
    <div class="a-bg-primary a-text-sm a-rounded a-p-lg a-shadow-card">
      prefixed
    </div>
  </App>
</template>
