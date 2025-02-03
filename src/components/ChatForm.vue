<template>
    <form @submit.prevent="onSubmit" class="flex gap-2">
      <input
        v-model="text"
        type="text"
        placeholder="Напишите сообщение..."
        class="flex-1 border p-2"
        @keyup.enter="onSubmit"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white p-2 rounded"
      >
        Отправить
      </button>
    </form>
  </template>
  
  <script setup>
  import { ref, defineEmits} from 'vue'
  
  const text = ref('')
  
  function onSubmit() {
    if (!text.value.trim()) return
    // Сгенерируем объект сообщения
    const message = {
      sender: 'Guest',  // Или можно дать возможность выбрать ник в другом месте
      text: text.value,
      time: new Date().toLocaleTimeString()
    }
  
    // Передаём событие родителю
    // (Лучше пробросить через emits)
    emit('send-message', message)
  
    // Очистим поле
    text.value = ''
  }
  
  const emit = defineEmits(['send-message'])
  </script>
  
  <style scoped>
  </style>
  