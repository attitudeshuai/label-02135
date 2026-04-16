import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import logger from '../utils/logger'

const MODULE = 'FavoriteStore'

export const useFavoriteStore = defineStore('favorite', () => {
  const items = ref([])
  
  function initFavorites() {
    try {
      const saved = localStorage.getItem('favorites')
      if (saved) {
        items.value = JSON.parse(saved)
        logger.info(MODULE, '收藏列表初始化成功', { count: items.value.length })
      }
    } catch (error) {
      logger.error(MODULE, '收藏列表初始化失败', error)
      items.value = []
    }
  }

  const totalCount = computed(() => items.value.length)

  function saveFavorites() {
    try {
      localStorage.setItem('favorites', JSON.stringify(items.value))
      logger.debug(MODULE, '收藏列表已保存')
    } catch (error) {
      logger.error(MODULE, '收藏列表保存失败', error)
    }
  }

  function isFavorite(productId) {
    return items.value.some(item => item.id === productId)
  }

  function addFavorite(product) {
    try {
      if (!product || !product.id) {
        logger.warn(MODULE, '添加收藏失败：商品信息无效', product)
        return { success: false, message: '商品信息无效' }
      }

      if (isFavorite(product.id)) {
        logger.warn(MODULE, '添加收藏失败：商品已在收藏列表中', { id: product.id })
        return { success: false, message: '该商品已收藏' }
      }

      items.value.push({ ...product, favoriteAt: Date.now() })
      saveFavorites()
      logger.info(MODULE, '商品已添加到收藏', { id: product.id, name: product.name })
      return { success: true }
    } catch (error) {
      logger.error(MODULE, '添加收藏异常', error)
      return { success: false, message: '添加失败，请重试' }
    }
  }

  function removeFavorite(productId) {
    try {
      const index = items.value.findIndex(item => item.id === productId)
      if (index > -1) {
        const removed = items.value.splice(index, 1)[0]
        saveFavorites()
        logger.info(MODULE, '商品已从收藏移除', { id: productId, name: removed.name })
        return { success: true }
      }
      logger.warn(MODULE, '移除收藏失败：商品不存在', { id: productId })
      return { success: false, message: '商品不存在' }
    } catch (error) {
      logger.error(MODULE, '移除收藏异常', error)
      return { success: false, message: '移除失败，请重试' }
    }
  }

  function toggleFavorite(product) {
    if (isFavorite(product.id)) {
      return removeFavorite(product.id)
    } else {
      return addFavorite(product)
    }
  }

  function clearFavorites() {
    try {
      items.value = []
      saveFavorites()
      logger.info(MODULE, '收藏列表已清空')
    } catch (error) {
      logger.error(MODULE, '清空收藏列表异常', error)
    }
  }

  initFavorites()

  return { 
    items, 
    totalCount,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites
  }
})
