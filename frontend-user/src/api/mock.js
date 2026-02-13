/**
 * Mock 数据模块
 */

// 轮播图数据
export const banners = [
  { id: 1, title: 'Xiaomi 14', desc: '徕卡光学 超越所见', color: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', image: '/images/products/xiaomi14-white.png' },
  { id: 2, title: 'Xiaomi 14 黑色版', desc: '徕卡影像 小尺寸旗舰', color: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)', image: '/images/products/xiaomi14-black.png' },
  { id: 3, title: '小米电视 S Pro', desc: 'Mini LED 高端画质', color: 'linear-gradient(135deg, #533483 0%, #e94560 100%)', image: '/images/products/tv.png' }
]

// 首页分类导航（8个）
export const categories = [
  { id: 1, name: '手机', icon: 'phone-o', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, name: '电视', icon: 'tv-o', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, name: '笔记本', icon: 'desktop-o', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 4, name: '平板', icon: 'photo-o', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 5, name: '穿戴', icon: 'clock-o', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 6, name: '音箱', icon: 'music-o', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { id: 7, name: '路由器', icon: 'cluster-o', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  { id: 8, name: '智能', icon: 'bulb-o', color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }
]

// 商品数据
export const products = [
  { id: 1, name: 'Xiaomi 14', price: 3999, desc: '徕卡影像 小尺寸旗舰', icon: 'phone-o', image: '/images/products/xiaomi14-white.png' },
  { id: 2, name: 'Xiaomi 14 黑色版', price: 3999, desc: '徕卡影像 小尺寸旗舰', icon: 'phone-o', image: '/images/products/xiaomi14-black.png' },
  { id: 3, name: '小米电视 S Pro 85', price: 7999, desc: 'Mini LED 高端画质', icon: 'tv-o', image: '/images/products/tv.png' },
  { id: 4, name: 'RedmiBook Pro 14', price: 4999, desc: '轻薄高性能笔记本', icon: 'desktop-o', image: '/images/products/redmibook.png' },
  { id: 5, name: 'Xiaomi Watch S3 白色', price: 999, desc: 'eSIM独立通话', icon: 'clock-o', image: '/images/products/watch-white.jpg' },
  { id: 6, name: 'Xiaomi Watch S3 黑色', price: 999, desc: 'eSIM独立通话', icon: 'clock-o', image: '/images/products/watch-black.jpg' },
  { id: 7, name: '小米路由器 BE7000', price: 999, desc: 'WiFi 7 万兆路由', icon: 'cluster-o', image: '/images/products/router.png' },
  { id: 8, name: '小米蓝牙音箱', price: 199, desc: '立体声组合 串联播放', icon: 'music-o', image: '/images/products/speaker.jpg' },
  { id: 9, name: 'Redmi Buds 5', price: 199, desc: '主动降噪 长续航', icon: 'music-o', image: '/images/products/earbuds.jpg' },
  { id: 10, name: 'Xiaomi 14 Ultra', price: 6499, desc: '徕卡光学 超越所见', icon: 'phone-o', image: '/images/products/xiaomi14-white.png' }
]

// 分类列表（8个分类）
export const categoryList = [
  { id: 1, name: '手机', icon: 'phone-o', children: [
    { id: 101, name: 'Xiaomi 14', icon: 'phone-o', image: '/images/products/xiaomi14-white.png' },
    { id: 102, name: 'Xiaomi 14 黑色', icon: 'phone-o', image: '/images/products/xiaomi14-black.png' }
  ]},
  { id: 2, name: '电视', icon: 'tv-o', children: [
    { id: 201, name: '小米电视 S Pro', icon: 'tv-o', image: '/images/products/tv.png' }
  ]},
  { id: 3, name: '笔记本', icon: 'desktop-o', children: [
    { id: 301, name: 'RedmiBook Pro', icon: 'desktop-o', image: '/images/products/redmibook.png' }
  ]},
  { id: 4, name: '平板', icon: 'photo-o', children: [
    { id: 401, name: '小米平板 6', icon: 'photo-o', image: '/images/products/pad.png' },
    { id: 402, name: '小米平板 6 Pro', icon: 'photo-o', image: '/images/products/pad.png' }
  ]},
  { id: 5, name: '穿戴', icon: 'clock-o', children: [
    { id: 501, name: 'Xiaomi Watch S3 白', icon: 'clock-o', image: '/images/products/watch-white.jpg' },
    { id: 502, name: 'Xiaomi Watch S3 黑', icon: 'clock-o', image: '/images/products/watch-black.jpg' }
  ]},
  { id: 6, name: '音箱', icon: 'music-o', children: [
    { id: 601, name: '小米蓝牙音箱', icon: 'music-o', image: '/images/products/speaker.jpg' },
    { id: 602, name: 'Redmi Buds 5', icon: 'music-o', image: '/images/products/earbuds.jpg' }
  ]},
  { id: 7, name: '路由器', icon: 'cluster-o', children: [
    { id: 701, name: '小米路由器 BE7000', icon: 'cluster-o', image: '/images/products/router.png' }
  ]},
  { id: 8, name: '智能', icon: 'bulb-o', children: [
    { id: 801, name: '小米智能门锁', icon: 'bulb-o', image: '/images/products/smartlock.png' },
    { id: 802, name: '小米摄像头', icon: 'bulb-o', image: '/images/products/camera.jpg' }
  ]}
]

// 限时秒杀商品
export const flashSaleProducts = [
  { id: 5, name: 'Xiaomi Watch S3', price: 999, salePrice: 799, icon: 'clock-o', image: '/images/products/watch-white.jpg' },
  { id: 9, name: 'Redmi Buds 5', price: 199, salePrice: 149, icon: 'music-o', image: '/images/products/earbuds.jpg' },
  { id: 8, name: '小米蓝牙音箱', price: 199, salePrice: 159, icon: 'music-o', image: '/images/products/speaker.jpg' },
  { id: 7, name: '小米路由器 BE7000', price: 999, salePrice: 799, icon: 'cluster-o', image: '/images/products/router.png' }
]

// 推荐商品
export const recommendProducts = [
  { id: 1, name: 'Xiaomi 14', price: 3999, icon: 'phone-o', image: '/images/products/xiaomi14-white.png' },
  { id: 3, name: '小米电视 S Pro', price: 7999, icon: 'tv-o', image: '/images/products/tv.png' },
  { id: 6, name: 'Xiaomi Watch S3', price: 999, icon: 'clock-o', image: '/images/products/watch-black.jpg' },
  { id: 4, name: 'RedmiBook Pro 14', price: 4999, icon: 'desktop-o', image: '/images/products/redmibook.png' }
]
