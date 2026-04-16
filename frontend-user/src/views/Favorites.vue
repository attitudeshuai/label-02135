<template>
  <div class="favorites">
    <van-nav-bar title="我的收藏" left-arrow @click-left="$router.back()" fixed placeholder />

    <van-empty v-if="!favoriteStore.items.length" description="暂无收藏商品" image="search">
      <van-button round type="primary" class="empty-btn" @click="$router.push('/')">去逛逛</van-button>
    </van-empty>

    <template v-else>
      <div class="favorites-list">
        <div class="favorite-item" v-for="item in favoriteStore.items" :key="item.id">
          <div class="item-content" @click="$router.push(`/product/${item.id}`)">
            <ProductCard :product="item" :show-sales="false" :img-size="100" />
          </div>
          <van-button type="danger" size="small" plain class="remove-btn" @click.stop="removeFavorite(item.id)">
            <van-icon name="star" /> 取消收藏
          </van-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFavoriteStore } from '../store/favorite'
import { ProductCard } from '../components'
import { notifySuccess } from '../utils/notify'

const router = useRouter()
const favoriteStore = useFavoriteStore()

function removeFavorite(id) {
  const result = favoriteStore.removeFavorite(id)
  if (result.success) {
    notifySuccess('已取消收藏')
  }
}
</script>

<style scoped>
.favorites { padding-bottom: 30px; background: #f5f5f5; min-height: 100vh; }
.empty-btn { width: 120px; background: #ff6700; border-color: #ff6700; }

.favorites-list { padding: 15px; }
.favorite-item {
  position: relative;
  margin-bottom: 12px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.item-content { cursor: pointer; }

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  border-radius: 20px;
  font-size: 12px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.remove-btn:active {
  transform: scale(0.95);
}
</style>
