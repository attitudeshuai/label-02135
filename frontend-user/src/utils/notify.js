import { ref } from 'vue'

// 全局状态
const notifyState = ref({
  visible: false,
  message: '',
  type: 'info'
})

const dialogState = ref({
  visible: false,
  title: '',
  message: '',
  confirmText: '确定',
  showCancel: true,
  resolve: null,
  reject: null
})

let notifyTimer = null

export function notify(message, type = 'info', duration = 2000) {
  if (notifyTimer) clearTimeout(notifyTimer)
  notifyState.value = { visible: true, message, type }
  notifyTimer = setTimeout(() => {
    notifyState.value.visible = false
  }, duration)
}

export function notifySuccess(message) {
  notify(message, 'success')
}

export function notifyError(message) {
  notify(message, 'error')
}

export function confirm(options) {
  return new Promise((resolve, reject) => {
    dialogState.value = {
      visible: true,
      title: options.title || '提示',
      message: options.message || '',
      confirmText: options.confirmText || '确定',
      showCancel: options.showCancel !== false,
      resolve,
      reject
    }
  })
}

export function closeDialog(confirmed = false) {
  const { resolve, reject } = dialogState.value
  dialogState.value.visible = false
  if (confirmed) {
    resolve && resolve()
  } else {
    reject && reject()
  }
}

export { notifyState, dialogState }
