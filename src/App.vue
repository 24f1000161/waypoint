<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route=useRoute()
const reduceMotion=computed(()=>route.query.motion==='reduce')
</script>
<template><div :class="['vue-app',{'reduce-motion':reduceMotion}]"><RouterView/></div></template>
