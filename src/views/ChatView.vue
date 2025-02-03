<template>
    <section class="p-4 max-w-xl mx-auto">
      <!-- Индикатор соединения -->
      <ConnectionStatus :isConnected="isConnected" />
  
      <!-- Список сообщений -->
      <div
        ref="messagesContainer"
        class="border rounded h-80 overflow-auto my-4 p-2"
      >
        <ChatMessage
          v-for="(msg, index) in chatStore.messages"
          :key="index"
          :message="msg"
        />
      </div>
  
      <!-- Форма отправки -->
      <ChatForm @send-message="handleSendMessage" />
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useChatStore } from '@/store/chatStore'
  import ConnectionStatus from '@/components/ConnectionStatus.vue'
  import ChatMessage from '@/components/ChatMessage.vue'
  import ChatForm from '@/components/ChatForm.vue'
  
  // Подключаем наш composable
  import useWebSocket from '@/composables/useWebSocket'
  
  const { isConnected, sendMessage, wsInstance } = useWebSocket()
  
  // Pinia Store
  const chatStore = useChatStore()
  
  // Ссылка на контейнер сообщений (для авто-прокрутки)
  const messagesContainer = ref(null)
  
  // Подгружаем старые сообщения
  onMounted(() => {
    chatStore.loadMessages()
  
    // Подписка на входящие сообщения от WS
    if (wsInstance) {
      wsInstance.onmessage = (event) => {
        // echo-сервер возвращает то же, что отправили
        // Распарсим
        try {
          const data = JSON.parse(event.data)
          if (data.text) {
            // Предположим, формат совпадает с нашим сообщением
            chatStore.addMessage({
              sender: data.sender ?? 'Echo',
              text: data.text,
              time: data.time ?? new Date().toLocaleTimeString()
            })
            scrollToBottom()
          }
        } catch (err) {
          console.error('Ошибка при парсинге сообщения:', err)
        }
      }
    }
  })
  
  // Наблюдаем за изменениями списка сообщений, чтобы скроллить вниз
  watch(
    () => chatStore.messages,
    () => {
      scrollToBottom()
    },
    { deep: true }
  )
  
  // Функция для авто-прокрутки вниз
  function scrollToBottom() {
    if (messagesContainer.value) {
      // Ставим небольшой nextTick/timeout, чтобы подождать отрисовку
      setTimeout(() => {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }, 100)
    }
  }
  
  // Обработчик отправки сообщения из ChatForm
  function handleSendMessage(message) {
    // Сохраняем в нашем локальном store
    chatStore.addMessage(message)
    
    // Отправляем на WebSocket (echo)
    sendMessage(message)
  
    // Прокручиваем чат
    scrollToBottom()
  }
  
  </script>
  
  <style scoped>
  section {
    font-family: sans-serif;
  }
  </style>
  