/**
 * 输入校验工具
 */

// 手机号校验
export function validatePhone(phone) {
  if (!phone) {
    return { valid: false, message: '请输入手机号' }
  }
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    return { valid: false, message: '请输入正确的手机号格式' }
  }
  return { valid: true, message: '' }
}

// 密码校验
export function validatePassword(password) {
  if (!password) {
    return { valid: false, message: '请输入密码' }
  }
  if (password.length < 6) {
    return { valid: false, message: '密码长度不能少于6位' }
  }
  if (password.length > 20) {
    return { valid: false, message: '密码长度不能超过20位' }
  }
  if (!/^[a-zA-Z0-9_]+$/.test(password)) {
    return { valid: false, message: '密码只能包含字母、数字和下划线' }
  }
  return { valid: true, message: '' }
}

// 购物车数量校验
export function validateCartCount(count, min = 1, max = 99) {
  const num = parseInt(count, 10)
  if (isNaN(num)) {
    return { valid: false, value: min, message: '数量必须为数字' }
  }
  if (num < min) {
    return { valid: false, value: min, message: `数量不能少于${min}` }
  }
  if (num > max) {
    return { valid: false, value: max, message: `数量不能超过${max}` }
  }
  return { valid: true, value: num, message: '' }
}

// 搜索关键词校验
export function validateSearchKeyword(keyword) {
  if (!keyword || !keyword.trim()) {
    return { valid: false, message: '请输入搜索关键词' }
  }
  if (keyword.length > 50) {
    return { valid: false, message: '搜索关键词不能超过50个字符' }
  }
  // 过滤特殊字符
  const sanitized = keyword.replace(/[<>'"&]/g, '')
  return { valid: true, value: sanitized, message: '' }
}

export default {
  validatePhone,
  validatePassword,
  validateCartCount,
  validateSearchKeyword
}
