<template>
  <div class="user">
    <div class="header">
      <div class="header-bg"></div>
      <div class="user-info" v-if="userStore.isLoggedIn">
        <van-image round width="70" height="70" :src="userStore.userInfo.avatar" class="avatar" />
        <div class="info">
          <div class="name">{{ userStore.userInfo.nickname }}</div>
          <div class="level">
            <van-icon name="vip-card-o" />
            <span>{{ userStore.userInfo.level }}</span>
          </div>
        </div>
        <van-icon name="setting-o" size="22" color="#fff" class="setting-icon" />
      </div>
      <div class="user-info guest" v-else @click="$router.push('/login')">
        <van-image round width="70" height="70" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" class="avatar" />
        <div class="info">
          <div class="name">点击登录</div>
          <div class="level">登录享受更多权益</div>
        </div>
        <van-icon name="arrow" size="20" color="#fff" />
      </div>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-num">{{ userStore.isLoggedIn ? '128' : '0' }}</div>
          <div class="stat-label">积分</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">{{ userStore.isLoggedIn ? '3' : '0' }}</div>
          <div class="stat-label">优惠券</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">{{ userStore.isLoggedIn ? '12' : '0' }}</div>
          <div class="stat-label">收藏</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">{{ userStore.isLoggedIn ? '5' : '0' }}</div>
          <div class="stat-label">足迹</div>
        </div>
      </div>
    </div>

    <div class="order-section">
      <div class="section-header" @click="goOrderList()">
        <span class="title">我的订单</span>
        <span class="more">查看全部 <van-icon name="arrow" /></span>
      </div>
      <div class="order-tabs">
        <div class="order-tab" v-for="tab in orderTabs" :key="tab.icon" @click="goOrderList(tab.status)">
          <div class="tab-icon">
            <van-icon :name="tab.icon" size="24" />
            <div class="badge" v-if="getOrderBadge(tab.status)">{{ getOrderBadge(tab.status) }}</div>
          </div>
          <span>{{ tab.text }}</span>
        </div>
      </div>
    </div>

    <div class="service-section">
      <div class="section-header">
        <span class="title">我的服务</span>
      </div>
      <van-grid :column-num="4" :border="false" class="service-grid">
        <van-grid-item v-for="service in services" :key="service.icon" :icon="service.icon" :text="service.text" @click="handleService(service)" />
      </van-grid>
    </div>

    <van-cell-group inset class="menu-group">
      <van-cell title="收货地址" is-link icon="location-o" @click="goAddress" />
      <van-cell title="账户安全" is-link icon="shield-o" @click="notify('账户安全功能开发中')" />
      <van-cell title="帮助中心" is-link icon="question-o" @click="notify('帮助中心功能开发中')" />
      <van-cell title="意见反馈" is-link icon="comment-o" @click="notify('意见反馈功能开发中')" />
      <van-cell title="关于我们" is-link icon="info-o" @click="notify('小米商城 v1.0.0')" />
    </van-cell-group>

    <div class="logout-section" v-if="userStore.isLoggedIn">
      <van-button block round plain type="danger" @click="handleLogout">退出登录</van-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { useOrderStore } from '../store/order'
import { notify, notifySuccess, confirm } from '../utils/notify'

const router = useRouter()
const userStore = useUserStore()
const orderStore = useOrderStore()

const orderTabs = [
  { icon: 'pending-payment', text: '待付款', status: 1 },
  { icon: 'logistics', text: '待发货', status: 2 },
  { icon: 'todo-list-o', text: '待收货', status: 3 },
  { icon: 'comment-o', text: '待评价', status: 4 },
  { icon: 'after-sale', text: '退换/售后', status: 0 }
]

const services = [
  { icon: 'coupon-o', text: '优惠券' },
  { icon: 'gift-o', text: '我的礼品' },
  { icon: 'vip-card-o', text: '会员中心' },
  { icon: 'service-o', text: '在线客服' }
]

function getOrderBadge(status) {
  if (!userStore.isLoggedIn) return ''
  const count = orderStore.orders.filter(o => o.status === status).length
  return count || ''
}

function goOrderList(status) {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  router.push({ path: '/order/list', query: status ? { status } : {} })
}

function goAddress() {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  router.push('/address')
}

function handleService(service) {
  notify(service.text + '功能开发中')
}

function handleLogout() {
  confirm({ title: '提示', message: '确定要退出登录吗？' })
    .then(() => {
      userStore.logout()
      notifySuccess('已退出登录')
    })
    .catch(() => {})
}
</script>

<style scoped>
.user { padding-bottom: 70px; background: #f5f5f5; min-height: 100vh; }

.header { position: relative; padding-bottom: 20px; }
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(135deg, #ff6700 0%, #ff9500 100%);
  border-radius: 0 0 30px 30px;
}
.user-info {
  position: relative;
  display: flex;
  align-items: center;
  padding: 40px 20px 20px;
}
.user-info.guest { cursor: pointer; }
.avatar { border: 3px solid rgba(255, 255, 255, 0.3); }
.info { flex: 1; margin-left: 15px; color: #fff; }
.info .name { font-size: 20px; font-weight: 600; }
.info .level {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  margin-top: 8px;
}
.setting-icon { position: absolute; top: 45px; right: 20px; }

.stats {
  position: relative;
  display: flex;
  justify-content: space-around;
  background: #fff;
  margin: 0 15px;
  padding: 20px 0;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}
.stat-item { text-align: center; }
.stat-num { font-size: 20px; font-weight: 600; color: #333; }
.stat-label { font-size: 12px; color: #999; margin-top: 4px; }

.order-section, .service-section {
  background: #fff;
  margin: 15px;
  border-radius: 12px;
  padding: 15px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.section-header .title { font-size: 16px; font-weight: 600; color: #333; }
.section-header .more { font-size: 12px; color: #999; }

.order-tabs { display: flex; justify-content: space-around; }
.order-tab { text-align: center; }
.tab-icon { position: relative; display: inline-block; }
.tab-icon .badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background: #ff6700;
  color: #fff;
  font-size: 10px;
  min-width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 8px;
  text-align: center;
}
.order-tab span { display: block; font-size: 12px; color: #666; margin-top: 8px; }

.service-grid :deep(.van-grid-item__content) { padding: 15px 8px; }
.service-grid :deep(.van-grid-item__icon) { color: #ff6700; }
.service-grid :deep(.van-grid-item__text) { color: #666; }

.menu-group { margin: 15px; }
.menu-group :deep(.van-cell__left-icon) { color: #ff6700; }

.logout-section { padding: 20px 15px; }
.logout-section :deep(.van-button) { border-color: #ff6700; color: #ff6700; }
</style>
