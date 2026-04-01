import { describe, it, expect } from 'vitest'
import {
  validatePhone,
  validatePassword,
  validateCartCount,
  validateSearchKeyword
} from '../validator.js'

describe('validator工具函数测试', () => {
  describe('validatePhone - 手机号校验', () => {
    it('空手机号应该返回错误', () => {
      const result = validatePhone('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('请输入手机号')
    })

    it('格式错误的手机号应该返回错误', () => {
      const result = validatePhone('123456')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('请输入正确的手机号格式')
    })

    it('正确的手机号应该验证通过', () => {
      const result = validatePhone('13800138000')
      expect(result.valid).toBe(true)
      expect(result.message).toBe('')
    })
  })

  describe('validatePassword - 密码校验', () => {
    it('空密码应该返回错误', () => {
      const result = validatePassword('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('请输入密码')
    })

    it('密码长度小于6位应该返回错误', () => {
      const result = validatePassword('12345')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('密码长度不能少于6位')
    })

    it('密码长度超过20位应该返回错误', () => {
      const result = validatePassword('a'.repeat(21))
      expect(result.valid).toBe(false)
      expect(result.message).toBe('密码长度不能超过20位')
    })

    it('包含非法字符的密码应该返回错误', () => {
      const result = validatePassword('123456!')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('密码只能包含字母、数字和下划线')
    })

    it('合法密码应该验证通过', () => {
      const result = validatePassword('test_123')
      expect(result.valid).toBe(true)
      expect(result.message).toBe('')
    })
  })

  describe('validateCartCount - 购物车数量校验', () => {
    it('非数字数量应该返回错误', () => {
      const result = validateCartCount('abc')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('数量必须为数字')
    })

    it('数量小于最小值应该返回错误', () => {
      const result = validateCartCount(0)
      expect(result.valid).toBe(false)
      expect(result.message).toBe('数量不能少于1')
    })

    it('数量大于最大值应该返回错误', () => {
      const result = validateCartCount(100)
      expect(result.valid).toBe(false)
      expect(result.message).toBe('数量不能超过99')
    })

    it('合法数量应该验证通过', () => {
      const result = validateCartCount(5)
      expect(result.valid).toBe(true)
      expect(result.value).toBe(5)
    })
  })

  describe('validateSearchKeyword - 搜索关键词校验', () => {
    it('空关键词应该返回错误', () => {
      const result = validateSearchKeyword('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('请输入搜索关键词')
    })

    it('超过50字符的关键词应该返回错误', () => {
      const result = validateSearchKeyword('a'.repeat(51))
      expect(result.valid).toBe(false)
      expect(result.message).toBe('搜索关键词不能超过50个字符')
    })

    it('包含特殊字符的关键词应该被过滤', () => {
      const result = validateSearchKeyword('<script>alert(1)</script>')
      expect(result.valid).toBe(true)
      expect(result.value).not.toContain('<')
      expect(result.value).not.toContain('>')
    })
  })
})
