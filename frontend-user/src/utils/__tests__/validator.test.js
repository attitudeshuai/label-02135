import { describe, it, expect } from 'vitest'
import { validatePhone, validatePassword, validateCartCount, validateSearchKeyword } from '../validator'

describe('Validator 工具函数测试', () => {
  describe('validatePhone 手机号校验', () => {
    it('空手机号应该返回错误', () => {
      const result = validatePhone('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('请输入手机号')
    })

    it('格式错误的手机号应该返回错误', () => {
      expect(validatePhone('12345').valid).toBe(false)
      expect(validatePhone('12345678901').valid).toBe(false)
      expect(validatePhone('abcdefghijk').valid).toBe(false)
    })

    it('正确格式的手机号应该校验通过', () => {
      expect(validatePhone('13800138000').valid).toBe(true)
      expect(validatePhone('15912345678').valid).toBe(true)
      expect(validatePhone('18888888888').valid).toBe(true)
    })
  })

  describe('validatePassword 密码校验', () => {
    it('空密码应该返回错误', () => {
      expect(validatePassword('').valid).toBe(false)
    })

    it('密码长度小于6位应该返回错误', () => {
      expect(validatePassword('12345').valid).toBe(false)
      expect(validatePassword('12345').message).toBe('密码长度不能少于6位')
    })

    it('密码长度超过20位应该返回错误', () => {
      expect(validatePassword('a'.repeat(21)).valid).toBe(false)
    })

    it('包含特殊字符的密码应该返回错误', () => {
      expect(validatePassword('123456!').valid).toBe(false)
    })

    it('合法密码应该校验通过', () => {
      expect(validatePassword('123456').valid).toBe(true)
      expect(validatePassword('abc123_').valid).toBe(true)
      expect(validatePassword('Test123').valid).toBe(true)
    })
  })

  describe('validateCartCount 购物车数量校验', () => {
    it('非数字应该返回错误', () => {
      expect(validateCartCount('abc').valid).toBe(false)
    })

    it('小于最小值应该返回错误', () => {
      const result = validateCartCount(0)
      expect(result.valid).toBe(false)
      expect(result.value).toBe(1)
    })

    it('大于最大值应该返回错误', () => {
      const result = validateCartCount(100)
      expect(result.valid).toBe(false)
      expect(result.value).toBe(99)
    })

    it('合法数量应该校验通过', () => {
      expect(validateCartCount(1).valid).toBe(true)
      expect(validateCartCount(50).valid).toBe(true)
      expect(validateCartCount(99).valid).toBe(true)
    })
  })

  describe('validateSearchKeyword 搜索关键词校验', () => {
    it('空关键词应该返回错误', () => {
      expect(validateSearchKeyword('').valid).toBe(false)
      expect(validateSearchKeyword('   ').valid).toBe(false)
    })

    it('超过50字符应该返回错误', () => {
      expect(validateSearchKeyword('a'.repeat(51)).valid).toBe(false)
    })

    it('应该过滤特殊字符', () => {
      const result = validateSearchKeyword('<script>alert(1)</script>')
      expect(result.valid).toBe(true)
      expect(result.value).toBe('scriptalert(1)/script')
    })

    it('合法关键词应该校验通过', () => {
      expect(validateSearchKeyword('手机').valid).toBe(true)
      expect(validateSearchKeyword('小米14').valid).toBe(true)
    })
  })
})
