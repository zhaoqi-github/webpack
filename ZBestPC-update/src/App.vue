<template>
  <div id="app">{{ message }}</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      message: 'hello test'
    }
  }
})
</script>
<style>
</style>
