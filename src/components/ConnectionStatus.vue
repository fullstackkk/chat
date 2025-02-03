<template>
    <div>
      <span
        class="rounded-full w-3 h-3 inline-block mr-2"
        :class="{
          'bg-green-500': props.isConnected,
          'bg-red-500': !props.isConnected
        }"
      ></span>
      <span>{{ props.isConnected ? 'Online' : 'Offline' }}</span>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    isConnected: {
      type: Boolean,
      required: true
    }
  })
  </script>
  
  <style scoped>
  </style>
  