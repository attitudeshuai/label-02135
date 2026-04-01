import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../cart'

describe('CartStore 购物车状态管理测试', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    Storage.prototype.getItem = () => null
    Storage.prototype.setItem = () => {}
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('应该初始化空购物车', () => {
    const cart = useCartStore()
    expect(cart.items).toEqual([])
    expect(cart.totalCount).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })

  it('应该成功添加商品', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      name: '测试商品',
      price: 100
    }

    const result = cart.addItem(product)
    expect(result.success).toBe(true)
    expect(cart.items.length).toBe(1)
    expect(cart.items[0].name).toBe('测试商品')
    expect(cart.items[0].count).toBe(1)
    expect(cart.items[0].checked).toBe(true)
    expect(cart.totalCount).toBe(1)
    expect(cart.totalPrice).toBe(100)
  })

  it('添加相同商品应该增加数量', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      name: '测试商品',
      price: 100
    }

    cart.addItem(product)
    cart.addItem(product)
    
    expect(cart.items.length).toBe(1)
    expect(cart.items[0].count).toBe(2)
    expect(cart.totalCount).toBe(2)
    expect(cart.totalPrice).toBe(200)
  })

  it('应该成功删除商品', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      name: '测试商品',
      price: 100,
      specKey: '1'
    }

    cart.addItem(product)
    expect(cart.items.length).toBe(1)
    
    const result = cart.removeItem('1')
    expect(result.success).toBe(true)
    expect(cart.items.length).toBe(0)
  })

  it('应该正确更新商品数量', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      name: '测试商品',
      price: 100,
      specKey: '1'
    }

    cart.addItem(product)
    cart.updateCount('1', 5)
    
    expect(cart.items[0].count).toBe(5)
    expect(cart.totalCount).toBe(5)
    expect(cart.totalPrice).toBe(500)
  })

  it('更新数量超过99时应该限制在99', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      name: '测试商品',
      price: 100,
      specKey: '1'
    }

    cart.addItem(product)
    cart.updateCount('1', 150)
    
    expect(cart.items[0].count).toBe(99)
  })

  it('应该正确切换选中状态', () => {
    const cart = useCartStore()
    const product = {
      id: 1,
      name: '测试商品',
      price: 100,
      specKey: '1'
    }

    cart.addItem(product)
    expect(cart.items[0].checked).toBe(true)
    
    cart.toggleCheck('1')
    expect(cart.items[0].checked).toBe(false)
    
    cart.toggleCheck('1')
    expect(cart.items[0].checked).toBe(true)
  })

  it('应该正确切换全选', () => {
    const cart = useCartStore()
    cart.addItem({ id: 1, name: '商品1', price: 100, specKey: '1' })
    cart.addItem({ id: 2, name: '商品2', price: 200, specKey: '2' })

    cart.toggleAll(false)
    expect(cart.items.every(item => !item.checked)).toBe(true)
    
    cart.toggleAll(true)
    expect(cart.items.every(item => item.checked)).toBe(true)
  })

  it('应该正确计算选中商品的价格', () => {
    const cart = useCartStore()
    cart.addItem({ id: 1, name: '商品1', price: 100, specKey: '1' })
    cart.addItem({ id: 2, name: '商品2', price: 200, specKey: '2' })

    cart.toggleCheck('1')
    expect(cart.checkedPrice).toBe(200)
  })

  it('应该成功清空购物车', () => {
    const cart = useCartStore()
    cart.addItem({ id: 1, name: '商品1', price: 100 })
    expect(cart.items.length).toBe(1)
    
    cart.clearCart()
    expect(cart.items.length).toBe(0)
    expect(cart.totalCount).toBe(0)
  })
})
