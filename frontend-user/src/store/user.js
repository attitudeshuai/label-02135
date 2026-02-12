import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { validatePhone, validatePassword } from '../utils/validator'
import logger from '../utils/logger'

const MODULE = 'UserStore'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const loading = ref(false)
  
  // 初始化用户信息
  function initUser() {
    try {
      const saved = localStorage.getItem('userInfo')
      if (saved) {
        userInfo.value = JSON.parse(saved)
        logger.info(MODULE, '用户信息初始化成功', { nickname: userInfo.value?.nickname })
      }
    } catch (error) {
      logger.error(MODULE, '用户信息初始化失败', error)
      userInfo.value = null
    }
  }
  
  const isLoggedIn = computed(() => !!userInfo.value)
  
  // 登录
  async function login(phone, password) {
    // 输入校验
    const phoneValidation = validatePhone(phone)
    if (!phoneValidation.valid) {
      logger.warn(MODULE, '登录失败：手机号校验不通过', { message: phoneValidation.message })
      return { success: false, message: phoneValidation.message }
    }
    
    const pwdValidation = validatePassword(password)
    if (!pwdValidation.valid) {
      logger.warn(MODULE, '登录失败：密码校验不通过', { message: pwdValidation.message })
      return { success: false, message: pwdValidation.message }
    }

    try {
      loading.value = true
      logger.info(MODULE, '开始登录', { phone: phone.slice(0, 3) + '****' + phone.slice(-4) })
      
      // 模拟登录延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 模拟登录成功
      const user = {
        id: Date.now(),
        phone,
        nickname: '小米用户' + phone.slice(-4),
        avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        level: '普通会员'
      }
      
      userInfo.value = user
      localStorage.setItem('userInfo', JSON.stringify(user))
      logger.info(MODULE, '登录成功', { nickname: user.nickname })
      return { success: true }
    } catch (error) {
      logger.error(MODULE, '登录异常', error)
      return { success: false, message: '登录失败，请稍后重试' }
    } finally {
      loading.value = false
    }
  }
  
  // 注册
  async function register(phone, password) {
    // 输入校验
    const phoneValidation = validatePhone(phone)
    if (!phoneValidation.valid) {
      logger.warn(MODULE, '注册失败：手机号校验不通过', { message: phoneValidation.message })
      return { success: false, message: phoneValidation.message }
    }
    
    const pwdValidation = validatePassword(password)
    if (!pwdValidation.valid) {
      logger.warn(MODULE, '注册失败：密码校验不通过', { message: pwdValidation.message })
      return { success: false, message: pwdValidation.message }
    }

    try {
      loading.value = true
      logger.info(MODULE, '开始注册', { phone: phone.slice(0, 3) + '****' + phone.slice(-4) })
      
      // 模拟注册延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 模拟注册成功
      const user = {
        id: Date.now(),
        phone,
        nickname: '小米用户' + phone.slice(-4),
        avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        level: '普通会员'
      }
      
      userInfo.value = user
      localStorage.setItem('userInfo', JSON.stringify(user))
      logger.info(MODULE, '注册成功', { nickname: user.nickname })
      return { success: true }
    } catch (error) {
      logger.error(MODULE, '注册异常', error)
      return { success: false, message: '注册失败，请稍后重试' }
    } finally {
      loading.value = false
    }
  }
  
  // 退出登录
  function logout() {
    try {
      const nickname = userInfo.value?.nickname
      userInfo.value = null
      localStorage.removeItem('userInfo')
      logger.info(MODULE, '退出登录成功', { nickname })
    } catch (error) {
      logger.error(MODULE, '退出登录异常', error)
    }
  }

  // 初始化
  initUser()
  
  return { userInfo, isLoggedIn, loading, login, register, logout }
})
