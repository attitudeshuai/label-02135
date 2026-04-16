<template>
  <div class="favorites">
    <van-nav-bar title="我的收藏" left-arrow @click-left="$router.back()" fixed placeholder />
    
    <div v-if="favoriteStore.favorites.length > 0" class="favorites-list">
      <div v-for="item in favoriteStore.favorites" :key="item.id" class="favorite-item">
        <div class="item-content" @click="goProduct(item.id)">
          <ProductCard :product="item" :show-sales="false" :img-size="100" />
        </div>
        <van-button class="remove-btn" type="default" size="small" icon="star" @click.stop="removeFavorite(item.id)">
          取消收藏
        </van-button>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <van-empty description="暂无收藏商品" image="star">
        <template #image>
          <van-icon name="star-o" size="80" color="#ddd" />
        </template>
        <van-button type="primary" size="small" @click="$router.push('/')">去逛逛</van-button>
      </van-empty>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFavoriteStore } from '../store/favorite'
import { ProductCard } from '../components'
import { notifySuccess, confirm } from '../utils/notify'

const router = useRouter()
const favoriteStore = useFavoriteStore()

function goProduct(id) {
  router.push(`/product/${id}`)
}

function removeFavorite(id) {
  confirm({ title: '提示', message: '确定要取消收藏该商品吗？' })
    .then(() => {
      const result = favoriteStore.removeFavorite(id)
      if (result.success) {
        notifySuccess(result.message)
      }
    })
    .catch(() => {})
}
</script>

<style scoped>
.favorites {
  min-height: 100vh;
  background: #f5f5f5;
}

.favorites-list {
  padding: 10px 15px;
}

.favorite-item {
  position: relative;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}

.item-content {
  padding: 10px;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 12px;
  font-size: 12px;
  border-color: #ff6700;
  color: #ff6700;
  background: #fff;
}

.remove-btn:active {
  background: #fff5f0;
}

.empty-state {
  padding: 80px 20px;
}
</style>
