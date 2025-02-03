<template>
    <div>
      <!-- Шапка или любой глобальный Layout -->
      <header class="p-4 bg-gray-800 text-white">
        <h1>Vue Chat Example</h1>
      </header>
  
      <!-- Основной контент, где отрисовываются страницы -->
      <router-view />
    </div>
  </template>
  
  <script setup>
  // Никакой логики, только "каркас" приложения
  </script>
  
  <style scoped>
  /* Простые стили для демонстрации */
  header {
    font-size: 1.2rem;
  }
  </style>
  