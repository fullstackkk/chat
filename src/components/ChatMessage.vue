<template>
    <div class="p-2 border-b">
      <div class="flex justify-between mb-1">
        <strong>{{ props.message.sender }}</strong>
        <small>{{ props.message.time }}</small>
      </div>
      <div>{{ props.message.text }}</div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    message: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  /* Пример простых стилий */
  div {
    font-family: sans-serif;
  }
  </style>
  