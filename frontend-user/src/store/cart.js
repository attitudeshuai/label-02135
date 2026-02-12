import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { validateCartCount } from '../utils/validator'
import logger from '../utils/logger'

const MODULE = 'CartStore'
const MAX_CART_COUNT = 99
const MIN_CART_COUNT = 1

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  
  // 初始化购物车
  function initCart() {
    try {
      const saved = localStorage.getItem('cart')
      if (saved) {
        items.value = JSON.parse(saved)
        logger.info(MODULE, '购物车初始化成功', { count: items.value.length })
      }
    } catch (error) {
      logger.error(MODULE, '购物车初始化失败', error)
      items.value = []
    }
  }

  // 计算属性
  const totalCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.count, 0)
  })
  
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.count, 0)
  })
  
  const checkedItems = computed(() => {
    return items.value.filter(item => item.checked)
  })
  
  const checkedPrice = computed(() => {
    return checkedItems.value.reduce((sum, item) => sum + item.price * item.count, 0)
  })

  // 保存购物车
  function saveCart() {
    try {
      localStorage.setItem('cart', JSON.stringify(items.value))
      logger.debug(MODULE, '购物车已保存')
    } catch (error) {
      logger.error(MODULE, '购物车保存失败', error)
    }
  }

  // 添加商品
  function addItem(product) {
    try {
      if (!product || !product.id) {
        logger.warn(MODULE, '添加商品失败：商品信息无效', product)
        return { success: false, message: '商品信息无效' }
      }

      const existing = items.value.find(item => item.id === product.id)
      if (existing) {
        const validation = validateCartCount(existing.count + 1, MIN_CART_COUNT, MAX_CART_COUNT)
        if (!validation.valid) {
          logger.warn(MODULE, '添加商品失败：超出数量限制', { current: existing.count })
          return { success: false, message: validation.message }
        }
        existing.count = validation.value
        logger.info(MODULE, '商品数量已更新', { id: product.id, count: existing.count })
      } else {
        items.value.push({ ...product, count: 1, checked: true })
        logger.info(MODULE, '商品已添加到购物车', { id: product.id, name: product.name })
      }
      
      saveCart()
      return { success: true }
    } catch (error) {
      logger.error(MODULE, '添加商品异常', error)
      return { success: false, message: '添加失败，请重试' }
    }
  }

  // 删除商品
  function removeItem(id) {
    try {
      const index = items.value.findIndex(item => item.id === id)
      if (index > -1) {
        const removed = items.value.splice(index, 1)[0]
        logger.info(MODULE, '商品已从购物车移除', { id, name: removed.name })
        saveCart()
        return { success: true }
      }
      logger.warn(MODULE, '删除商品失败：商品不存在', { id })
      return { success: false, message: '商品不存在' }
    } catch (error) {
      logger.error(MODULE, '删除商品异常', error)
      return { success: false, message: '删除失败，请重试' }
    }
  }

  // 更新数量
  function updateCount(id, count) {
    try {
      const validation = validateCartCount(count, MIN_CART_COUNT, MAX_CART_COUNT)
      const item = items.value.find(item => item.id === id)
      
      if (!item) {
        logger.warn(MODULE, '更新数量失败：商品不存在', { id })
        return { success: false, message: '商品不存在' }
      }

      if (!validation.valid) {
        item.count = validation.value
        logger.warn(MODULE, '数量已调整到边界值', { id, count: validation.value, message: validation.message })
      } else {
        item.count = validation.value
        logger.debug(MODULE, '商品数量已更新', { id, count: validation.value })
      }
      
      saveCart()
      return { success: true, count: item.count, message: validation.message }
    } catch (error) {
      logger.error(MODULE, '更新数量异常', error)
      return { success: false, message: '更新失败，请重试' }
    }
  }

  // 切换选中状态
  function toggleCheck(id) {
    try {
      const item = items.value.find(item => item.id === id)
      if (item) {
        item.checked = !item.checked
        logger.debug(MODULE, '商品选中状态已切换', { id, checked: item.checked })
        saveCart()
      }
    } catch (error) {
      logger.error(MODULE, '切换选中状态异常', error)
    }
  }

  // 全选/取消全选
  function toggleAll(checked) {
    try {
      items.value.forEach(item => item.checked = checked)
      logger.debug(MODULE, '全选状态已切换', { checked })
      saveCart()
    } catch (error) {
      logger.error(MODULE, '全选操作异常', error)
    }
  }

  // 清空购物车
  function clearCart() {
    try {
      items.value = []
      saveCart()
      logger.info(MODULE, '购物车已清空')
    } catch (error) {
      logger.error(MODULE, '清空购物车异常', error)
    }
  }

  // 初始化
  initCart()

  return { 
    items, 
    totalCount, 
    totalPrice, 
    checkedItems, 
    checkedPrice, 
    addItem, 
    removeItem, 
    updateCount, 
    toggleCheck, 
    toggleAll,
    clearCart
  }
})
