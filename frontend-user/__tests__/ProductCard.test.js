import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '../src/components/ProductCard.vue'

const mockProduct = {
  id: 1,
  name: '小米14',
  desc: '骁龙8 Gen3处理器',
  price: 3999,
  icon: 'phone',
  image: ''
}

describe('ProductCard.vue', () => {
  it('renders product name correctly', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct
      },
      global: {
        stubs: {
          ProductImage: true
        }
      }
    })
    expect(wrapper.find('.card-name').text()).toBe(mockProduct.name)
  })

  it('renders product price correctly', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct
      },
      global: {
        stubs: {
          ProductImage: true
        }
      }
    })
    expect(wrapper.find('.card-price .amount').text()).toBe(String(mockProduct.price))
  })

  it('renders product description when showDesc is true', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
        showDesc: true
      },
      global: {
        stubs: {
          ProductImage: true
        }
      }
    })
    expect(wrapper.find('.card-desc').exists()).toBe(true)
    expect(wrapper.find('.card-desc').text()).toBe(mockProduct.desc)
  })

  it('does not render product description when showDesc is false', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
        showDesc: false
      },
      global: {
        stubs: {
          ProductImage: true
        }
      }
    })
    expect(wrapper.find('.card-desc').exists()).toBe(false)
  })

  it('renders tag when tag prop is provided', () => {
    const tagText = '限时秒杀'
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
        tag: tagText
      },
      global: {
        stubs: {
          ProductImage: true
        }
      }
    })
    expect(wrapper.find('.card-tag').exists()).toBe(true)
    expect(wrapper.find('.card-tag').text()).toBe(tagText)
  })

  it('does not render tag when tag prop is empty', () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct,
        tag: ''
      },
      global: {
        stubs: {
          ProductImage: true
        }
      }
    })
    expect(wrapper.find('.card-tag').exists()).toBe(false)
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: {
        product: mockProduct
      },
      global: {
        stubs: {
          ProductImage: true
        }
      }
    })
    await wrapper.find('.product-card').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
