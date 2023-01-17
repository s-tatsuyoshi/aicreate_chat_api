<template lang="pug">
div Hello vue 3 !
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

onMounted(() => {
  console.log('Hello Vue 3 !');
})
</script>

<style scoped lang="sass">
  
</style>
