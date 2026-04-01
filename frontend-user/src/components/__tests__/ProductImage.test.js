import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductImage from '../ProductImage.vue'

describe('ProductImage组件测试', () => {
  it('应该正确渲染默认props', () => {
    const wrapper = mount(ProductImage)
    expect(wrapper.classes()).toContain('product-image')
  })

  it('应该正确设置尺寸', () => {
    const size = 200
    const wrapper = mount(ProductImage, {
      props: { size }
    })
    const div = wrapper.find('.product-image')
    expect(div.attributes('style')).toContain(`width: ${size}px`)
    expect(div.attributes('style')).toContain(`height: ${size}px`)
  })

  it('有图片时应该显示img标签', () => {
    const imageUrl = 'https://example.com/test.jpg'
    const wrapper = mount(ProductImage, {
      props: { image: imageUrl }
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(imageUrl)
  })

  it('没有图片时应该显示兜底图标', () => {
    const wrapper = mount(ProductImage, {
      props: { image: '' }
    })
    expect(wrapper.find('.product-fallback').exists()).toBe(true)
  })

  it('应该正确设置alt属性', () => {
    const altText = '测试商品'
    const wrapper = mount(ProductImage, {
      props: { image: 'test.jpg', alt: altText }
    })
    expect(wrapper.find('img').attributes('alt')).toBe(altText)
  })
})
