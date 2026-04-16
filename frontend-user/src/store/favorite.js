import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import logger from '../utils/logger'

const MODULE = 'FavoriteStore'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref([])

  function initFavorites() {
    try {
      const saved = localStorage.getItem('favorites')
      if (saved) {
        favorites.value = JSON.parse(saved)
      }
      logger.info(MODULE, '收藏列表初始化成功', { count: favorites.value.length })
    } catch (error) {
      logger.error(MODULE, '收藏列表初始化失败', error)
      favorites.value = []
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    } catch (error) {
      logger.error(MODULE, '收藏列表保存失败', error)
    }
  }

  const count = computed(() => favorites.value.length)

  function isFavorite(productId) {
    return favorites.value.some(item => item.id === productId)
  }

  function addFavorite(product) {
    if (!isFavorite(product.id)) {
      favorites.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        icon: product.icon,
        desc: product.desc,
        addTime: Date.now()
      })
      saveFavorites()
      logger.info(MODULE, '添加收藏', { productId: product.id, name: product.name })
      return { success: true, message: '已收藏' }
    }
    return { success: false, message: '该商品已收藏' }
  }

  function removeFavorite(productId) {
    const index = favorites.value.findIndex(item => item.id === productId)
    if (index > -1) {
      const removed = favorites.value.splice(index, 1)
      saveFavorites()
      logger.info(MODULE, '取消收藏', { productId, name: removed[0]?.name })
      return { success: true, message: '已取消收藏' }
    }
    return { success: false, message: '该商品未收藏' }
  }

  function toggleFavorite(product) {
    if (isFavorite(product.id)) {
      return removeFavorite(product.id)
    } else {
      return addFavorite(product)
    }
  }

  function clearFavorites() {
    favorites.value = []
    saveFavorites()
    logger.info(MODULE, '清空收藏列表')
  }

  initFavorites()

  return {
    favorites,
    count,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites
  }
})
