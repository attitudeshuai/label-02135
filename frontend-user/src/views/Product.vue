<template>
  <div class="product" v-if="product">
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.back()" fixed placeholder>
      <template #right>
        <van-icon name="share-o" size="20" @click="onShare" />
      </template>
    </van-nav-bar>
    
    <van-swipe :autoplay="3000" indicator-color="#ff6700" class="product-swipe">
      <van-swipe-item v-for="i in 3" :key="i">
        <div class="product-img">
          <ProductImage :icon="product.icon" :image="product.image" :alt="product.name" :size="200" />
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="price-section">
      <div class="price-row">
        <div class="current-price">
          <span class="symbol">¥</span>
          <span class="amount">{{ product.price }}</span>
        </div>
        <div class="origin-price">¥{{ product.price + 500 }}</div>
      </div>
      <div class="tags">
        <span class="tag">新品</span>
        <span class="tag">24期免息</span>
        <span class="tag">赠品</span>
      </div>
    </div>

    <div class="info-section">
      <div class="product-title">{{ product.name }}</div>
      <div class="product-subtitle">{{ product.desc }}</div>
    </div>

    <van-cell-group inset class="specs-group">
      <van-cell is-link @click="showSpec = true">
        <template #title>
          <span class="cell-label">选择</span>
          <span class="cell-value">{{ selectedColor }} / {{ selectedVersion }}</span>
        </template>
      </van-cell>
      <van-cell is-link @click="goSelectAddress">
        <template #title>
          <span class="cell-label">配送</span>
          <span class="cell-value">{{ selectedAddress || '请选择配送地址' }}</span>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <span class="cell-label">服务</span>
          <div class="service-tags">
            <span @click="notify('正品保证：小米官方直营，品质保障')"><van-icon name="certificate" color="#ff6700" /> 正品保证</span>
            <span @click="notify('7天无理由退货，请放心购买')"><van-icon name="shield-o" color="#ff6700" /> 7天退货</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <div class="detail-section">
      <div class="detail-tabs">
        <span :class="{ active: activeTab === 'detail' }" @click="activeTab = 'detail'">商品详情</span>
        <span :class="{ active: activeTab === 'spec' }" @click="activeTab = 'spec'">规格参数</span>
      </div>
      <div class="detail-content" v-show="activeTab === 'detail'">
        <div class="detail-img" v-for="i in 3" :key="i">
          <ProductImage :icon="product.icon" :image="product.image" :alt="product.name" :size="150" />
          <span>{{ product.name }} 详情展示 {{ i }}</span>
        </div>
      </div>
      <div class="spec-content" v-show="activeTab === 'spec'">
        <div class="spec-item" v-for="spec in specs" :key="spec.label">
          <span class="spec-label">{{ spec.label }}</span>
          <span class="spec-value">{{ spec.value }}</span>
        </div>
      </div>
    </div>

    <van-action-bar class="action-bar">
      <van-action-bar-icon icon="chat-o" text="客服" @click="notify('在线客服功能开发中')" />
      <van-action-bar-icon icon="cart-o" text="购物车" :badge="cartStore.totalCount || ''" @click="$router.push('/cart')" />
      <van-action-bar-icon :icon="collected ? 'star' : 'star-o'" :text="collected ? '已收藏' : '收藏'" :color="collected ? '#ff6700' : ''" :class="{ 'collected-icon': collected }" @click="toggleCollect" />
      <van-action-bar-button type="warning" text="加入购物车" @click="addToCart" />
      <van-action-bar-button type="danger" text="立即购买" @click="buyNow" />
    </van-action-bar>

    <van-action-sheet v-model:show="showSpec" title="选择规格">
      <div class="spec-sheet">
        <div class="spec-header">
          <ProductImage :icon="product.icon" :image="product.image" :alt="product.name" :size="80" />
          <div class="spec-info">
            <div class="spec-price">¥{{ product.price }}</div>
            <div class="spec-selected">已选：{{ selectedColor }} {{ selectedVersion }}</div>
          </div>
        </div>
        <div class="spec-group">
          <div class="spec-title">颜色</div>
          <div class="spec-options">
            <span v-for="color in colors" :key="color" :class="{ active: selectedColor === color }" @click="selectedColor = color">{{ color }}</span>
          </div>
        </div>
        <div class="spec-group">
          <div class="spec-title">版本</div>
          <div class="spec-options">
            <span v-for="ver in versions" :key="ver" :class="{ active: selectedVersion === ver }" @click="selectedVersion = ver">{{ ver }}</span>
          </div>
        </div>
        <van-button type="danger" block round @click="showSpec = false">确定</van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'
import { useUserStore } from '../store/user'
import { useAddressStore } from '../store/address'
import { useFavoritesStore } from '../store/favorites'
import { products } from '../api/mock'
import { ProductImage } from '../components'
import { notify, notifySuccess } from '../utils/notify'
import logger from '../utils/logger'

const MODULE = 'ProductPage'
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const addressStore = useAddressStore()
const favoritesStore = useFavoritesStore()

const product = computed(() => products.find(p => p.id === Number(route.params.id)))
const activeTab = ref('detail')
const showSpec = ref(false)
const collected = ref(false)

onMounted(() => {
  favoritesStore.loadFromStorage()
  if (product.value) {
    collected.value = favoritesStore.isFavorite(product.value.id)
  }
})
const selectedColor = ref('黑色')
const selectedVersion = ref('12GB+256GB')

// 临时选中的地址
const tempSelectedAddress = ref(null)

const selectedAddress = computed(() => {
  // 优先使用临时选中的地址
  if (tempSelectedAddress.value) {
    return `${tempSelectedAddress.value.city} ${tempSelectedAddress.value.district}`
  }
  const addr = addressStore.defaultAddress
  return addr ? `${addr.city} ${addr.district}` : '北京市 朝阳区'
})

const colors = ['黑色', '白色', '绿色', '紫色']
const versions = ['8GB+128GB', '8GB+256GB', '12GB+256GB', '12GB+512GB']

const specs = [
  { label: '屏幕尺寸', value: '6.73英寸' },
  { label: '分辨率', value: '3200×1440' },
  { label: '处理器', value: '第三代骁龙8' },
  { label: '电池容量', value: '5000mAh' },
  { label: '充电功率', value: '90W有线 / 50W无线' },
  { label: '后置相机', value: '5000万像素主摄' }
]

function toggleCollect() {
  if (!userStore.isLoggedIn) {
    notify('请先登录')
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  
  if (product.value) {
    const isAdded = favoritesStore.toggleFavorite(product.value)
    collected.value = isAdded
    notifySuccess(isAdded ? '已收藏' : '已取消收藏')
  }
}

function onShare() {
  notify('分享功能开发中')
}

function goSelectAddress() {
  router.push({ path: '/address', query: { select: 'true', from: 'product', productId: route.params.id } })
}

function addToCart() {
  if (!userStore.isLoggedIn) {
    notify('请先登录')
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  
  if (product.value) {
    const specKey = `${product.value.id}_${selectedColor.value}_${selectedVersion.value}`
    const cartItem = {
      ...product.value,
      specKey,
      selectedColor: selectedColor.value,
      selectedVersion: selectedVersion.value
    }
    const result = cartStore.addItem(cartItem)
    if (result.success) {
      notifySuccess('已加入购物车')
      logger.info(MODULE, '商品已加入购物车', { id: product.value.id, specKey })
    } else {
      notify(result.message, 'error')
    }
  }
}

function buyNow() {
  if (!userStore.isLoggedIn) {
    notify('请先登录')
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  
  addToCart()
  router.push('/cart')
}

// 检查是否有从地址页面返回选中的地址
function checkSelectedAddress() {
  const savedAddr = localStorage.getItem('selectedAddress')
  if (savedAddr) {
    try {
      tempSelectedAddress.value = JSON.parse(savedAddr)
      localStorage.removeItem('selectedAddress')
    } catch (e) {
      // ignore
    }
  }
}

onMounted(checkSelectedAddress)
onActivated(checkSelectedAddress)
</script>

<style scoped>
.product { padding-bottom: 60px; background: #f5f5f5; }

.product-swipe { background: #fff; }
.product-img { 
  width: 100%; 
  height: 350px; 
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}

.price-section {
  background: linear-gradient(135deg, #ff6700 0%, #ff9500 100%);
  padding: 20px 15px;
  color: #fff;
}
.price-row { display: flex; align-items: baseline; gap: 10px; }
.current-price .symbol { font-size: 16px; }
.current-price .amount { font-size: 32px; font-weight: 700; }
.origin-price { font-size: 14px; text-decoration: line-through; opacity: 0.7; }
.tags { display: flex; gap: 8px; margin-top: 10px; }
.tags .tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.info-section { background: #fff; padding: 15px; margin-bottom: 10px; }
.product-title { font-size: 18px; font-weight: 600; color: #333; line-height: 1.4; }
.product-subtitle { font-size: 13px; color: #999; margin-top: 8px; }

.specs-group { margin: 10px 0; }
.cell-label { color: #999; font-size: 13px; margin-right: 15px; }
.cell-value { color: #333; font-size: 13px; }
.service-tags { display: flex; gap: 15px; font-size: 12px; color: #666; flex-wrap: wrap; }
.service-tags span { display: flex; align-items: center; gap: 4px; cursor: pointer; transition: opacity 0.2s; }
.service-tags span:active { opacity: 0.6; }

.detail-section { background: #fff; margin-top: 10px; }
.detail-tabs {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 0 15px;
}
.detail-tabs span {
  padding: 15px 20px;
  font-size: 14px;
  color: #666;
  position: relative;
  cursor: pointer;
  transition: color 0.2s;
}
.detail-tabs span:active { opacity: 0.7; }
.detail-tabs span.active {
  color: #ff6700;
  font-weight: 500;
}
.detail-tabs span.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: #ff6700;
  border-radius: 2px;
}
.detail-content { }
.detail-img { 
  width: 100%; 
  padding: 30px 0;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  border-bottom: 1px solid #eee;
}
.detail-img span { font-size: 12px; color: #999; }
.spec-content { padding: 15px; }
.spec-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}
.spec-label { width: 100px; color: #999; font-size: 13px; }
.spec-value { flex: 1; color: #333; font-size: 13px; }

.action-bar { box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05); }

.collected-icon {
  animation: bounce 0.3s ease;
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.spec-sheet { padding: 20px; }
.spec-header { display: flex; gap: 15px; margin-bottom: 20px; align-items: center; }
.spec-info .spec-price { color: #ff6700; font-size: 20px; font-weight: 600; }
.spec-info .spec-selected { color: #999; font-size: 12px; margin-top: 5px; }
.spec-group { margin-bottom: 20px; }
.spec-title { font-size: 14px; color: #333; margin-bottom: 10px; }
.spec-options { display: flex; flex-wrap: wrap; gap: 10px; }
.spec-options span {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.spec-options span:active { transform: scale(0.95); }
.spec-options span.active {
  border-color: #ff6700;
  color: #ff6700;
  background: #fff5f0;
}
</style>
