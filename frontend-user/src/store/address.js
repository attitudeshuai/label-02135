import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import logger from '../utils/logger'

const MODULE = 'AddressStore'

export const useAddressStore = defineStore('address', () => {
  const addresses = ref([])
  
  // 初始化
  function init() {
    try {
      const saved = localStorage.getItem('addresses')
      if (saved) {
        addresses.value = JSON.parse(saved)
      } else {
        // 默认地址
        addresses.value = [{
          id: 1,
          name: '小米用户',
          phone: '13800138000',
          province: '北京市',
          city: '朝阳区',
          district: '望京街道',
          detail: '小米科技园',
          isDefault: true
        }]
        save()
      }
      logger.info(MODULE, '地址初始化成功', { count: addresses.value.length })
    } catch (error) {
      logger.error(MODULE, '地址初始化失败', error)
    }
  }
  
  function save() {
    localStorage.setItem('addresses', JSON.stringify(addresses.value))
  }
  
  const defaultAddress = computed(() => {
    return addresses.value.find(a => a.isDefault) || addresses.value[0]
  })
  
  function addAddress(address) {
    try {
      const newAddress = {
        ...address,
        id: Date.now()
      }
      if (newAddress.isDefault) {
        addresses.value.forEach(a => a.isDefault = false)
      }
      addresses.value.push(newAddress)
      save()
      logger.info(MODULE, '添加地址成功', { id: newAddress.id })
      return { success: true }
    } catch (error) {
      logger.error(MODULE, '添加地址失败', error)
      return { success: false, message: '添加失败' }
    }
  }
  
  function updateAddress(id, address) {
    try {
      const index = addresses.value.findIndex(a => a.id === id)
      if (index === -1) return { success: false, message: '地址不存在' }
      
      if (address.isDefault) {
        addresses.value.forEach(a => a.isDefault = false)
      }
      addresses.value[index] = { ...addresses.value[index], ...address }
      save()
      logger.info(MODULE, '更新地址成功', { id })
      return { success: true }
    } catch (error) {
      logger.error(MODULE, '更新地址失败', error)
      return { success: false, message: '更新失败' }
    }
  }
  
  function removeAddress(id) {
    try {
      const index = addresses.value.findIndex(a => a.id === id)
      if (index === -1) return { success: false, message: '地址不存在' }
      
      const wasDefault = addresses.value[index].isDefault
      addresses.value.splice(index, 1)
      
      // 如果删除的是默认地址，设置第一个为默认
      if (wasDefault && addresses.value.length > 0) {
        addresses.value[0].isDefault = true
      }
      save()
      logger.info(MODULE, '删除地址成功', { id })
      return { success: true }
    } catch (error) {
      logger.error(MODULE, '删除地址失败', error)
      return { success: false, message: '删除失败' }
    }
  }
  
  function setDefault(id) {
    try {
      addresses.value.forEach(a => a.isDefault = (a.id === id))
      save()
      logger.info(MODULE, '设置默认地址成功', { id })
      return { success: true }
    } catch (error) {
      logger.error(MODULE, '设置默认地址失败', error)
      return { success: false, message: '设置失败' }
    }
  }
  
  init()
  
  return { addresses, defaultAddress, addAddress, updateAddress, removeAddress, setDefault }
})
