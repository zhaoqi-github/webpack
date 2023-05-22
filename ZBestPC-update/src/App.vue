<template>
  <div id="app">{{ message }}</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup(){
    const message = ref('hello world')
    return {
      message
    }
  }
})
</script>
<style>
</style>
