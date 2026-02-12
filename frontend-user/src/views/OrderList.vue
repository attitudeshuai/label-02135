<template>
  <div class="order-list">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.back()" />
    
    <van-tabs v-model:active="activeTab" sticky swipeable color="#ff6700">
      <van-tab title="全部" name="all" />
      <van-tab title="待付款" name="1" :badge="orderStore.pendingPayment.length || ''" />
      <van-tab title="待发货" name="2" :badge="orderStore.pendingShip.length || ''" />
      <van-tab title="待收货" name="3" :badge="orderStore.pendingReceive.length || ''" />
      <van-tab title="待评价" name="4" :badge="orderStore.pendingReview.length || ''" />
    </van-tabs>
    
    <div class="order-content">
      <div class="order-item" v-for="order in filteredOrders" :key="order.id">
        <div class="order-header">
          <span class="order-no">订单号：{{ order.orderNo }}</span>
          <span class="order-status" :class="'status-' + order.status">{{ orderStore.getStatusText(order.status) }}</span>
        </div>
        
        <div class="order-goods">
          <div class="goods-item" v-for="item in order.items" :key="item.id" @click="$router.push(`/product/${item.id}`)">
            <ProductImage :icon="item.icon" :size="70" />
            <div class="goods-info">
              <div class="goods-name">{{ item.name }}</div>
              <div class="goods-spec">黑色 / 12GB+256GB</div>
              <div class="goods-bottom">
                <span class="goods-price">¥{{ item.price }}</span>
                <span class="goods-count">x{{ item.count }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="order-footer">
          <div class="order-total">
            共{{ order.items.reduce((sum, i) => sum + i.count, 0) }}件商品，合计：
            <span class="total-price">¥{{ order.totalPrice }}</span>
          </div>
          <div class="order-actions">
            <van-button v-if="order.status === 3" size="small" type="primary" @click="confirmReceive(order)">确认收货</van-button>
            <van-button v-if="order.status === 4" size="small" type="primary" @click="goReview(order)">去评价</van-button>
            <van-button v-if="order.status === 2" size="small" plain @click="viewLogistics(order)">查看物流</van-button>
          </div>
        </div>
      </div>
      
      <van-empty v-if="!filteredOrders.length" description="暂无订单" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '../store/order'
import { ProductImage } from '../components'
import { notify, notifySuccess, confirm } from '../utils/notify'

const route = useRoute()
const orderStore = useOrderStore()

const activeTab = ref(route.query.status || 'all')

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orderStore.orders
  return orderStore.orders.filter(o => o.status === parseInt(activeTab.value))
})

function confirmReceive(order) {
  confirm({ title: '确认收货', message: '确认已收到商品？' })
    .then(() => {
      orderStore.updateStatus(order.id, 4)
      notifySuccess('收货成功')
    })
    .catch(() => {})
}

function goReview(order) {
  confirm({ title: '评价', message: '感谢您的购买！评价功能开发中' })
    .then(() => {
      orderStore.updateStatus(order.id, 5)
    })
    .catch(() => {})
}

function viewLogistics(order) {
  notify('物流信息：已发货，预计3天内送达')
}
</script>

<style scoped>
.order-list { min-height: 100vh; background: #f5f5f5; }

.order-content { padding: 10px; }

.order-item {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 10px;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  border-bottom: 1px solid #f5f5f5;
}

.order-no { font-size: 12px; color: #999; }

.order-status { font-size: 13px; font-weight: 500; }
.order-status.status-1 { color: #ff6700; }
.order-status.status-2 { color: #1989fa; }
.order-status.status-3 { color: #07c160; }
.order-status.status-4 { color: #ff976a; }
.order-status.status-5 { color: #999; }

.order-goods { padding: 10px 15px; }

.goods-item {
  display: flex;
  gap: 10px;
  padding: 8px 0;
}

.goods-info { flex: 1; }

.goods-name { font-size: 14px; color: #333; font-weight: 500; }
.goods-spec { font-size: 12px; color: #999; margin: 4px 0; }

.goods-bottom {
  display: flex;
  justify-content: space-between;
}

.goods-price { color: #ff6700; font-size: 14px; }
.goods-count { color: #999; font-size: 12px; }

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-top: 1px solid #f5f5f5;
}

.order-total { font-size: 13px; color: #666; }
.total-price { color: #ff6700; font-size: 16px; font-weight: 600; }

.order-actions {
  display: flex;
  gap: 8px;
}

.order-actions :deep(.van-button--primary) {
  background: #ff6700;
  border-color: #ff6700;
}

.order-actions :deep(.van-button--plain) {
  color: #666;
  border-color: #ddd;
}
</style>
