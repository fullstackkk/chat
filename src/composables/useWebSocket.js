import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Пример простого composable для работы с WebSocket
 * @param {string} url - адрес WS (по умолчанию echo-сервер)
 * @returns {Object} - { isConnected, messages, sendMessage, wsInstance }
 */
export default function useWebSocket(url = 'wss://ws.postman-echo.com/raw') {
  const isConnected = ref(false)
  let ws = null

  const connect = () => {
    ws = new WebSocket(url)

    ws.onopen = () => {
      console.log('WS connected')
      isConnected.value = true
    }

    ws.onclose = () => {
      console.log('WS disconnected')
      isConnected.value = false
      // Попробуем переподключиться через некоторое время, если нужно
      // setTimeout(() => connect(), 5000)
    }

    ws.onerror = (err) => {
      console.error('WS error', err)
    }
  }

  const sendMessage = (data) => {
    if (ws && isConnected.value) {
      ws.send(JSON.stringify(data))
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    if (ws) {
      ws.close()
    }
  })

  return {
    isConnected,
    sendMessage,
    get wsInstance() {
      return ws
    }
  }
}
