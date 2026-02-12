<template>
  <div class="order-confirm">
    <van-nav-bar title="确认订单" left-arrow @click-left="$router.back()" />
    
    <!-- 收货地址 -->
    <div class="address-section" @click="goSelectAddress">
      <van-icon name="location-o" size="20" color="#ff6700" />
      <div class="address-info" v-if="currentAddress">
        <div class="address-user">
          <span class="name">{{ currentAddress.name }}</span>
          <span class="phone">{{ currentAddress.phone }}</span>
        </div>
        <div class="address-detail">{{ currentAddress.province }} {{ currentAddress.city }} {{ currentAddress.district }} {{ currentAddress.detail }}</div>
      </div>
      <div class="address-info" v-else>
        <div class="address-empty">请添加收货地址</div>
      </div>
      <van-icon name="arrow" color="#999" />
    </div>

    <!-- 商品列表 -->
    <div class="goods-section">
      <div class="goods-item" v-for="item in cartStore.checkedItems" :key="item.id">
        <ProductImage :icon="item.icon" :size="80" />
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

    <!-- 订单信息 -->
    <van-cell-group inset class="order-info">
      <van-cell title="商品金额" :value="'¥' + cartStore.checkedPrice" />
      <van-cell title="运费" value="免运费" />
      <van-cell title="优惠" value="-¥0" />
    </van-cell-group>

    <!-- 支付方式 -->
    <van-cell-group inset class="pay-section">
      <van-cell title="支付方式" is-link :value="payMethod" @click="showPayPicker = true" />
    </van-cell-group>

    <!-- 底部结算栏 -->
    <van-submit-bar
      :price="cartStore.checkedPrice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <template #tip>
        共 {{ cartStore.checkedItems.reduce((sum, item) => sum + item.count, 0) }} 件
      </template>
    </van-submit-bar>
    
    <!-- 支付方式选择 -->
    <van-action-sheet v-model:show="showPayPicker" title="选择支付方式">
      <div class="pay-options">
        <div class="pay-option" :class="{ active: payMethod === '微信支付' }" @click="selectPay('微信支付')">
          <van-icon name="wechat" size="24" color="#07c160" />
          <span>微信支付</span>
          <van-icon v-if="payMethod === '微信支付'" name="success" color="#ff6700" />
        </div>
        <div class="pay-option" :class="{ active: payMethod === '支付宝' }" @click="selectPay('支付宝')">
          <van-icon name="alipay" size="24" color="#1677ff" />
          <span>支付宝</span>
          <van-icon v-if="payMethod === '支付宝'" name="success" color="#ff6700" />
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'
import { useAddressStore } from '../store/address'
import { useOrderStore } from '../store/order'
import { ProductImage } from '../components'
import { notify, notifySuccess, confirm } from '../utils/notify'

const router = useRouter()
const cartStore = useCartStore()
const addressStore = useAddressStore()
const orderStore = useOrderStore()

const showPayPicker = ref(false)
const payMethod = ref('微信支付')
const selectedAddressId = ref(null)

const currentAddress = computed(() => {
  if (selectedAddressId.value) {
    return addressStore.addresses.find(a => a.id === selectedAddressId.value)
  }
  return addressStore.defaultAddress
})

function goSelectAddress() {
  router.push({ path: '/address', query: { select: '1' } })
}

function selectPay(method) {
  payMethod.value = method
  showPayPicker.value = false
}

function checkSelectedAddress() {
  const saved = localStorage.getItem('selectedAddress')
  if (saved) {
    const addr = JSON.parse(saved)
    selectedAddressId.value = addr.id
    localStorage.removeItem('selectedAddress')
  }
}

onMounted(checkSelectedAddress)
onActivated(checkSelectedAddress)

function onSubmit() {
  if (!currentAddress.value) {
    notify('请添加收货地址')
    return
  }
  
  if (cartStore.checkedItems.length === 0) {
    notify('请选择商品')
    return
  }
  
  // 创建订单
  const result = orderStore.createOrder(
    cartStore.checkedItems,
    currentAddress.value,
    cartStore.checkedPrice
  )
  
  if (result.success) {
    // 清空已选商品
    cartStore.checkedItems.forEach(item => {
      cartStore.removeItem(item.id)
    })
    
    confirm({
      title: '订单提交成功',
      message: `订单号：${result.order.orderNo}\n支付方式：${payMethod.value}（模拟支付成功）`,
      confirmText: '查看订单',
      showCancel: false
    }).then(() => {
      router.push('/order/list')
    })
  } else {
    notify(result.message)
  }
}
</script>

<style scoped>
.order-confirm {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
}

.address-section {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #fff;
  margin: 10px;
  border-radius: 12px;
  gap: 12px;
}

.address-info { flex: 1; }

.address-user {
  display: flex;
  gap: 15px;
  margin-bottom: 6px;
}

.address-user .name { font-size: 16px; font-weight: 500; color: #333; }
.address-user .phone { font-size: 14px; color: #666; }

.address-detail { font-size: 13px; color: #666; line-height: 1.4; }

.address-empty { font-size: 14px; color: #999; }

.goods-section {
  background: #fff;
  margin: 10px;
  border-radius: 12px;
  padding: 15px;
}

.goods-item {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.goods-item:last-child { border-bottom: none; }

.goods-info { flex: 1; display: flex; flex-direction: column; }

.goods-name { font-size: 14px; font-weight: 500; color: #333; }
.goods-spec { font-size: 12px; color: #999; margin: 6px 0; }

.goods-bottom { display: flex; justify-content: space-between; margin-top: auto; }

.goods-price { color: #ff6700; font-size: 16px; font-weight: 500; }
.goods-count { color: #999; font-size: 14px; }

.order-info, .pay-section { margin: 10px; }

:deep(.van-submit-bar__button) {
  background: linear-gradient(135deg, #ff6700, #ff9500);
  border: none;
}

.pay-options { padding: 15px; }

.pay-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: #f5f5f5;
}

.pay-option.active { background: #fff5f0; border: 1px solid #ff6700; }

.pay-option span { flex: 1; font-size: 15px; color: #333; }
</style>
