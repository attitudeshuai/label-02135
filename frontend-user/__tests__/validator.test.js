import { validatePhone, validatePassword, validateCartCount, validateSearchKeyword } from '../src/utils/validator'

describe('Validator Utils', () => {
  describe('validatePhone', () => {
    it('should return error when phone is empty', () => {
      const result = validatePhone('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('请输入手机号')
    })

    it('should return error when phone format is invalid', () => {
      const result = validatePhone('12345')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('请输入正确的手机号格式')
    })

    it('should return error when phone does not start with 1', () => {
      const result = validatePhone('23456789012')
      expect(result.valid).toBe(false)
    })

    it('should return error when phone has invalid second digit', () => {
      const result = validatePhone('12345678901')
      expect(result.valid).toBe(false)
    })

    it('should return valid for correct phone format', () => {
      const result = validatePhone('13800138000')
      expect(result.valid).toBe(true)
    })
  })

  describe('validatePassword', () => {
    it('should return error when password is empty', () => {
      const result = validatePassword('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('请输入密码')
    })

    it('should return error when password is too short', () => {
      const result = validatePassword('12345')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('密码长度不能少于6位')
    })

    it('should return error when password is too long', () => {
      const result = validatePassword('a'.repeat(21))
      expect(result.valid).toBe(false)
      expect(result.message).toBe('密码长度不能超过20位')
    })

    it('should return error when password contains invalid characters', () => {
      const result = validatePassword('password!')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('密码只能包含字母、数字和下划线')
    })

    it('should return valid for correct password', () => {
      const result = validatePassword('test123')
      expect(result.valid).toBe(true)
    })
  })

  describe('validateCartCount', () => {
    it('should return error when count is not a number', () => {
      const result = validateCartCount('abc')
      expect(result.valid).toBe(false)
    })

    it('should return error when count is less than min', () => {
      const result = validateCartCount(0)
      expect(result.valid).toBe(false)
      expect(result.value).toBe(1)
    })

    it('should return error when count is more than max', () => {
      const result = validateCartCount(100)
      expect(result.valid).toBe(false)
      expect(result.value).toBe(99)
    })

    it('should return valid for count within range', () => {
      const result = validateCartCount(50)
      expect(result.valid).toBe(true)
      expect(result.value).toBe(50)
    })
  })

  describe('validateSearchKeyword', () => {
    it('should return error when keyword is empty', () => {
      const result = validateSearchKeyword('')
      expect(result.valid).toBe(false)
    })

    it('should return error when keyword is too long', () => {
      const result = validateSearchKeyword('a'.repeat(51))
      expect(result.valid).toBe(false)
    })

    it('should sanitize special characters', () => {
      const result = validateSearchKeyword('<script>alert("test")</script>')
      expect(result.valid).toBe(true)
      expect(result.value).not.toContain('<')
    })

    it('should return valid for normal keyword', () => {
      const result = validateSearchKeyword('小米手机')
      expect(result.valid).toBe(true)
      expect(result.value).toBe('小米手机')
    })
  })
})
