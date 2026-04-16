<template>
  <div class="favorites">
    <van-nav-bar title="我的收藏" left-arrow @click-left="$router.back()" fixed placeholder />
    
    <div class="favorites-content" v-if="favoritesStore.items.length > 0">
      <div class="product-list">
        <div class="product-item" v-for="item in favoritesStore.items" :key="item.id">
          <ProductCard :product="item" :show-sales="false" @click="goToDetail(item.id)" />
          <van-button 
            class="remove-btn" 
            icon="delete-o" 
            size="small" 
            type="danger" 
            plain
            @click.stop="removeFavorite(item.id)"
          >
            取消收藏
          </van-button>
        </div>
      </div>
    </div>
    
    <div class="empty-state" v-else>
      <van-empty description="暂无收藏商品" image="search" />
      <van-button type="primary" round @click="$router.push('/')">去逛逛</van-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '../store/favorites'
import { ProductCard } from '../components'
import { notifySuccess } from '../utils/notify'

const router = useRouter()
const favoritesStore = useFavoritesStore()

onMounted(() => {
  favoritesStore.loadFromStorage()
})

function goToDetail(productId) {
  router.push(`/product/${productId}`)
}

function removeFavorite(productId) {
  const result = favoritesStore.removeFavorite(productId)
  if (result) {
    notifySuccess('已取消收藏')
  }
}
</script>

<style scoped>
.favorites {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 20px;
}

.favorites-content {
  padding: 10px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.product-item {
  position: relative;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 15px;
  font-size: 12px;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.9);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px;
}
</style>
