import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import logger from '../utils/logger'

const MODULE = 'OrderStore'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  
  // 初始化
  function init() {
    try {
      const saved = localStorage.getItem('orders')
      if (saved) {
        orders.value = JSON.parse(saved)
      }
      logger.info(MODULE, '订单初始化成功', { count: orders.value.length })
    } catch (error) {
      logger.error(MODULE, '订单初始化失败', error)
    }
  }
  
  function save() {
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }
  
  // 订单状态：1待付款 2待发货 3待收货 4待评价 5已完成
  const statusMap = {
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '待评价',
    5: '已完成'
  }
  
  const pendingPayment = computed(() => orders.value.filter(o => o.status === 1))
  const pendingShip = computed(() => orders.value.filter(o => o.status === 2))
  const pendingReceive = computed(() => orders.value.filter(o => o.status === 3))
  const pendingReview = computed(() => orders.value.filter(o => o.status === 4))
  
  function createOrder(items, address, totalPrice) {
    try {
      const order = {
        id: Date.now(),
        orderNo: 'MI' + Date.now(),
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          count: item.count,
          icon: item.icon,
          image: item.image,
          selectedColor: item.selectedColor,
          selectedVersion: item.selectedVersion
        })),
        address: { ...address },
        totalPrice,
        status: 2, // 模拟已支付，待发货
        createTime: new Date().toISOString()
      }
      orders.value.unshift(order)
      save()
      logger.info(MODULE, '创建订单成功', { orderNo: order.orderNo })
      return { success: true, order }
    } catch (error) {
      logger.error(MODULE, '创建订单失败', error)
      return { success: false, message: '创建订单失败' }
    }
  }
  
  function updateStatus(orderId, status) {
    try {
      const order = orders.value.find(o => o.id === orderId)
      if (!order) return { success: false, message: '订单不存在' }
      
      order.status = status
      save()
      logger.info(MODULE, '更新订单状态', { orderId, status })
      return { success: true }
    } catch (error) {
      logger.error(MODULE, '更新订单状态失败', error)
      return { success: false, message: '更新失败' }
    }
  }
  
  function getStatusText(status) {
    return statusMap[status] || '未知'
  }
  
  init()
  
  return { 
    orders, 
    pendingPayment, 
    pendingShip, 
    pendingReceive, 
    pendingReview,
    createOrder, 
    updateStatus, 
    getStatusText 
  }
})
