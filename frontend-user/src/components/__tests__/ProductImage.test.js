import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductImage from '../ProductImage.vue'

describe('ProductImage 组件测试', () => {
  const global = {
    stubs: {
      'van-icon': true
    }
  }

  it('应该正确渲染默认 props', () => {
    const wrapper = mount(ProductImage, { global })
    expect(wrapper.find('.product-image').exists()).toBe(true)
    expect(wrapper.find('.product-fallback').exists()).toBe(true)
  })

  it('应该正确应用 size 属性', () => {
    const size = 200
    const wrapper = mount(ProductImage, {
      props: { size },
      global
    })
    const container = wrapper.find('.product-image')
    expect(container.attributes('style')).toContain('width: 200px')
    expect(container.attributes('style')).toContain('height: 200px')
  })

  it('有 image props 时应该渲染 img 标签', () => {
    const wrapper = mount(ProductImage, {
      props: {
        image: 'https://example.com/test.jpg',
        alt: '测试图片'
      },
      global
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/test.jpg')
    expect(img.attributes('alt')).toBe('测试图片')
  })

  it('没有 image 时应该渲染 fallback 图标', () => {
    const wrapper = mount(ProductImage, {
      props: { icon: 'phone-o' },
      global
    })
    expect(wrapper.find('.product-fallback').exists()).toBe(true)
  })

  it('应该正确渲染 van-icon 占位', () => {
    const wrapper = mount(ProductImage, { props: { icon: 'phone-o' }, global })
    expect(wrapper.find('van-icon-stub').exists()).toBe(true)
  })
})
