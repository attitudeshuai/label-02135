<template>
  <Teleport to="body">
    <!-- 提示消息 -->
    <Transition name="notify-fade">
      <div v-if="notifyVisible" class="app-notify" :class="notifyType">
        <van-icon v-if="notifyType === 'success'" name="checked" />
        <van-icon v-else-if="notifyType === 'error'" name="cross" />
        <van-icon v-else name="info-o" />
        <span>{{ notifyMessage }}</span>
      </div>
    </Transition>
    
    <!-- 确认弹窗 -->
    <Transition name="dialog-fade">
      <div v-if="dialogVisible" class="app-dialog-overlay" @click.self="onDialogCancel">
        <div class="app-dialog">
          <div class="dialog-title">{{ dialogTitle }}</div>
          <div class="dialog-message">{{ dialogMessage }}</div>
          <div class="dialog-actions">
            <button v-if="dialogShowCancel" class="dialog-btn cancel" @click="onDialogCancel">取消</button>
            <button class="dialog-btn confirm" @click="onDialogConfirm">{{ dialogConfirmText }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const notifyVisible = ref(false)
const notifyMessage = ref('')
const notifyType = ref('info')

const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogMessage = ref('')
const dialogConfirmText = ref('确定')
const dialogShowCancel = ref(true)
let dialogResolve = null
let dialogReject = null

function showNotify(message, type = 'info', duration = 2000) {
  notifyMessage.value = message
  notifyType.value = type
  notifyVisible.value = true
  setTimeout(() => {
    notifyVisible.value = false
  }, duration)
}

function showDialog(options) {
  return new Promise((resolve, reject) => {
    dialogTitle.value = options.title || '提示'
    dialogMessage.value = options.message || ''
    dialogConfirmText.value = options.confirmText || '确定'
    dialogShowCancel.value = options.showCancel !== false
    dialogVisible.value = true
    dialogResolve = resolve
    dialogReject = reject
  })
}

function onDialogConfirm() {
  dialogVisible.value = false
  dialogResolve && dialogResolve()
}

function onDialogCancel() {
  dialogVisible.value = false
  dialogReject && dialogReject()
}

defineExpose({ showNotify, showDialog })
</script>

<style scoped>
.app-notify {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.app-notify.info {
  background: #333;
  color: #fff;
}

.app-notify.success {
  background: #07c160;
  color: #fff;
}

.app-notify.error {
  background: #ee0a24;
  color: #fff;
}

.notify-fade-enter-active,
.notify-fade-leave-active {
  transition: all 0.3s ease;
}

.notify-fade-enter-from,
.notify-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.app-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
}

.app-dialog {
  width: 280px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
}

.dialog-title {
  padding: 20px 20px 10px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #333;
}

.dialog-message {
  padding: 10px 20px 20px;
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 1.5;
  white-space: pre-wrap;
}

.dialog-actions {
  display: flex;
  border-top: 1px solid #eee;
}

.dialog-btn {
  flex: 1;
  height: 48px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
}

.dialog-btn.cancel {
  color: #666;
  border-right: 1px solid #eee;
}

.dialog-btn.confirm {
  color: #ff6700;
  font-weight: 500;
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
