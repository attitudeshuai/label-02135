<template>
  <router-view />
  <van-tabbar v-model="active" route v-if="showTabbar" class="app-tabbar">
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o" :badge="cartBadge">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
  
  <!-- 全局通知 -->
  <Teleport to="body">
    <Transition name="notify-fade">
      <div v-if="notifyState.visible" class="app-notify" :class="notifyState.type">
        <van-icon v-if="notifyState.type === 'success'" name="checked" />
        <van-icon v-else-if="notifyState.type === 'error'" name="cross" />
        <van-icon v-else name="info-o" />
        <span>{{ notifyState.message }}</span>
      </div>
    </Transition>
    
    <Transition name="dialog-fade">
      <div v-if="dialogState.visible" class="app-dialog-overlay" @click.self="closeDialog(false)">
        <div class="app-dialog">
          <div class="dialog-title">{{ dialogState.title }}</div>
          <div class="dialog-message">{{ dialogState.message }}</div>
          <div class="dialog-actions">
            <button v-if="dialogState.showCancel" class="dialog-btn cancel" @click="closeDialog(false)">取消</button>
            <button class="dialog-btn confirm" @click="closeDialog(true)">{{ dialogState.confirmText }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from './store/cart'
import { useUserStore } from './store/user'
import { notifyState, dialogState, closeDialog } from './utils/notify'

const route = useRoute()
const cartStore = useCartStore()
const userStore = useUserStore()
const active = ref(0)

const showTabbar = computed(() => {
  return ['/', '/category', '/cart', '/user'].includes(route.path)
})

// 只有登录后才显示购物车数量
const cartBadge = computed(() => {
  if (!userStore.isLoggedIn) return ''
  return cartStore.totalCount || ''
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
  background: #f5f5f5;
  -webkit-font-smoothing: antialiased;
}

.app-tabbar {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.app-tabbar .van-tabbar-item--active {
  color: #ff6700;
}

:root {
  --van-primary-color: #ff6700;
  --van-button-primary-background: #ff6700;
  --van-button-primary-border-color: #ff6700;
  --van-toast-background: rgba(0, 0, 0, 0.7);
  --van-dialog-background: #fff;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* 修复 Toast 和 Dialog 样式 */
.van-toast {
  background: rgba(0, 0, 0, 0.7) !important;
}

.van-dialog {
  background: #fff !important;
  border-radius: 16px !important;
}

.van-dialog__confirm {
  color: #ff6700 !important;
}

/* 全局通知样式 */
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
