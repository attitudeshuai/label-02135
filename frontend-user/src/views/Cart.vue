<template>
  <div class="cart">
    <van-nav-bar title="购物车" left-arrow @click-left="$router.push('/')" fixed placeholder>
      <template #right>
        <span class="edit-btn" @click="editing = !editing">{{ editing ? '完成' : '编辑' }}</span>
      </template>
    </van-nav-bar>

    <van-empty v-if="!cartStore.items.length" description="购物车是空的">
      <van-button round type="primary" class="empty-btn" @click="$router.push('/')">去逛逛</van-button>
    </van-empty>

    <template v-else>
      <div class="cart-list">
        <van-swipe-cell v-for="item in cartStore.items" :key="item.specKey" :disabled="editing">
          <div class="cart-item">
            <van-checkbox :model-value="item.checked" @click="cartStore.toggleCheck(item.specKey)" icon-size="20" checked-color="#ff6700" />
            <div class="item-img" @click="$router.push(`/product/${item.id}`)">
              <ProductImage :icon="item.icon" :image="item.image" :alt="item.name" :size="80" />
            </div>
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-spec">{{ item.selectedColor || '黑色' }} / {{ item.selectedVersion || '12GB+256GB' }}</div>
              <div class="item-bottom">
                <div class="item-price">
                  <span class="symbol">¥</span>
                  <span class="amount">{{ item.price }}</span>
                </div>
                <van-stepper v-model="item.count" min="1" max="99" theme="round" button-size="22" @change="onCountChange(item)" />
              </div>
            </div>
          </div>
          <template #right>
            <van-button square type="danger" text="删除" class="delete-btn" @click="cartStore.removeItem(item.specKey)" />
          </template>
        </van-swipe-cell>
      </div>

      <div class="recommend-section">
        <SectionHeader title="为你推荐" />
        <div class="recommend-list">
          <div class="recommend-item" v-for="item in recommendProducts" :key="item.id" @click="$router.push(`/product/${item.id}`)">
            <ProductImage :icon="item.icon" :image="item.image" :alt="item.name" :size="80" />
            <div class="recommend-name">{{ item.name }}</div>
            <div class="recommend-price">¥{{ item.price }}</div>
          </div>
        </div>
      </div>
    </template>

    <van-submit-bar v-if="cartStore.items.length" :price="cartStore.checkedPrice * 100" button-text="去结算" :disabled="cartStore.checkedItems.length === 0" @submit="onSubmit" class="submit-bar">
      <van-checkbox v-model="allChecked" @click="cartStore.toggleAll(!allChecked)" checked-color="#ff6700">全选</van-checkbox>
      <template #tip v-if="cartStore.checkedItems.length">
        <span>已选 {{ cartStore.checkedItems.length }} 件</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'
import { recommendProducts } from '../api/mock'
import { ProductImage, SectionHeader } from '../components'
import { notify } from '../utils/notify'
import logger from '../utils/logger'

const MODULE = 'CartPage'
const router = useRouter()
const cartStore = useCartStore()
const editing = ref(false)

const allChecked = computed({
  get: () => cartStore.items.length > 0 && cartStore.items.every(item => item.checked),
  set: () => {}
})

function onCountChange(item) {
  const result = cartStore.updateCount(item.specKey, item.count)
  if (result.message) {
    notify(result.message)
  }
}

function onSubmit() {
  if (cartStore.checkedItems.length === 0) {
    notify('请选择商品')
    return
  }
  logger.info(MODULE, '去结算', { count: cartStore.checkedItems.length, total: cartStore.checkedPrice })
  router.push('/order/confirm')
}
</script>

<style scoped>
.cart { padding-bottom: 120px; background: #f5f5f5; min-height: 100vh; }
.edit-btn { color: #ff6700; font-size: 14px; }
.empty-btn { width: 120px; background: #ff6700; border-color: #ff6700; }

.cart-list { padding: 10px; }
.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.item-img { margin: 0 12px; }
.item-info { flex: 1; }
.item-name { font-size: 14px; font-weight: 500; color: #333; line-height: 1.4; }
.item-spec { font-size: 12px; color: #999; margin: 6px 0; }
.item-bottom { display: flex; justify-content: space-between; align-items: center; }
.item-price { color: #ff6700; }
.item-price .symbol { font-size: 12px; }
.item-price .amount { font-size: 18px; font-weight: 600; }
.delete-btn { height: 100%; }

.recommend-section { padding: 15px; background: #fff; margin: 10px; border-radius: 12px; }
.recommend-list { display: flex; gap: 15px; overflow-x: auto; }
.recommend-list::-webkit-scrollbar { display: none; }
.recommend-item { flex-shrink: 0; width: 100px; text-align: center; cursor: pointer; transition: transform 0.2s; }
.recommend-item:active { transform: scale(0.95); }
.recommend-name { font-size: 12px; color: #333; margin-top: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.recommend-price { font-size: 14px; color: #ff6700; font-weight: 500; margin-top: 4px; }

.submit-bar { box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05); }
.submit-bar :deep(.van-submit-bar__button) { background: linear-gradient(135deg, #ff6700, #ff9500); border: none; }
</style>
