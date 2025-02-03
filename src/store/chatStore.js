import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: []
  }),
  actions: {
    // Загружаем сохранённые сообщения при старте
    loadMessages() {
      const stored = localStorage.getItem('chat_messages')
      if (stored) {
        this.messages = JSON.parse(stored)
      }
    },
    // Добавляем новое сообщение + сохраняем в LocalStorage
    addMessage(msg) {
      this.messages.push(msg)
      localStorage.setItem('chat_messages', JSON.stringify(this.messages))
    }
  }
})
