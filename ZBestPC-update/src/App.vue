<template>
  <!-- <div id="app">{{ message }}</div> -->
  <!-- <Home></Home> -->
  <router-view />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const message = ref('hello world')
    return {
      message
    }
  }
})
</script>
<style>
</style>
