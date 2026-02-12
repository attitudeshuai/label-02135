/**
 * Mock 数据模块
 * 使用本地图片路径，确保稳定显示
 */

// 轮播图数据
export const banners = [
  { id: 1, title: 'Xiaomi 14 Ultra', desc: '徕卡光学 超越所见', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: 'Xiaomi SU7', desc: '人车合一 我心澎湃', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, title: '小米澎湃OS', desc: '以人为中心 打造人车家生态', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
]

// 首页分类导航 - 与 categoryList 顺序对应
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
  { id: 1, name: 'Xiaomi 14 Ultra', price: 6499, desc: '徕卡光学 超越所见', icon: 'phone-o' },
  { id: 2, name: 'Xiaomi 14', price: 3999, desc: '徕卡影像 小尺寸旗舰', icon: 'phone-o' },
  { id: 3, name: 'Redmi K70 Pro', price: 3299, desc: '第三代骁龙8', icon: 'phone-o' },
  { id: 4, name: 'Xiaomi MIX Fold 3', price: 8999, desc: '轻薄折叠旗舰', icon: 'phone-o' },
  { id: 5, name: '小米电视S Pro 85', price: 7999, desc: 'Mini LED 高端画质', icon: 'tv-o' },
  { id: 6, name: '小米平板6 Max', price: 3499, desc: '14.0英寸超大屏', icon: 'photo-o' },
  { id: 7, name: 'Xiaomi Book Pro 16', price: 6999, desc: '轻薄高性能笔记本', icon: 'desktop-o' },
  { id: 8, name: '小米手环8 Pro', price: 379, desc: '1.74英寸AMOLED大屏', icon: 'clock-o' },
  { id: 9, name: '小米Watch S3', price: 999, desc: 'eSIM独立通话', icon: 'clock-o' },
  { id: 10, name: '小米路由器BE7000', price: 999, desc: 'WiFi 7 万兆路由', icon: 'cluster-o' }
]

// 分类页数据 - 与首页 categories 顺序对应
export const categoryList = [
  { id: 1, name: '手机', icon: 'phone-o', children: [
    { id: 11, name: 'Xiaomi 14系列', icon: 'phone-o' },
    { id: 12, name: 'Xiaomi MIX系列', icon: 'phone-o' },
    { id: 13, name: 'Redmi K系列', icon: 'phone-o' },
    { id: 14, name: 'Redmi Note系列', icon: 'phone-o' }
  ]},
  { id: 2, name: '电视', icon: 'tv-o', children: [
    { id: 21, name: '小米电视S Pro', icon: 'tv-o' },
    { id: 22, name: '小米电视A Pro', icon: 'tv-o' },
    { id: 23, name: 'Redmi电视', icon: 'tv-o' }
  ]},
  { id: 3, name: '笔记本', icon: 'desktop-o', children: [
    { id: 31, name: 'Xiaomi Book Pro', icon: 'desktop-o' },
    { id: 32, name: 'RedmiBook', icon: 'desktop-o' },
    { id: 33, name: '游戏本', icon: 'desktop-o' }
  ]},
  { id: 4, name: '平板', icon: 'photo-o', children: [
    { id: 41, name: '小米平板6系列', icon: 'photo-o' },
    { id: 42, name: 'Redmi Pad', icon: 'photo-o' }
  ]},
  { id: 5, name: '穿戴', icon: 'clock-o', children: [
    { id: 51, name: '小米手环', icon: 'clock-o' },
    { id: 52, name: '小米手表', icon: 'clock-o' },
    { id: 53, name: '小米耳机', icon: 'music-o' }
  ]},
  { id: 6, name: '音箱', icon: 'music-o', children: [
    { id: 61, name: '小爱音箱', icon: 'music-o' },
    { id: 62, name: '蓝牙音箱', icon: 'music-o' },
    { id: 63, name: '车载音箱', icon: 'music-o' }
  ]},
  { id: 7, name: '路由器', icon: 'cluster-o', children: [
    { id: 71, name: 'WiFi 7路由器', icon: 'cluster-o' },
    { id: 72, name: 'WiFi 6路由器', icon: 'cluster-o' },
    { id: 73, name: 'Mesh路由器', icon: 'cluster-o' }
  ]},
  { id: 8, name: '智能', icon: 'bulb-o', children: [
    { id: 81, name: '智能门锁', icon: 'bulb-o' },
    { id: 82, name: '智能摄像头', icon: 'bulb-o' },
    { id: 83, name: '智能灯具', icon: 'bulb-o' },
    { id: 84, name: '扫地机器人', icon: 'bulb-o' }
  ]}
]

// 秒杀商品
export const flashSaleProducts = [
  { id: 8, name: '小米手环8 Pro', price: 379, salePrice: 299, icon: 'clock-o' },
  { id: 9, name: '小米Watch S3', price: 999, salePrice: 799, icon: 'clock-o' },
  { id: 10, name: '小米路由器', price: 999, salePrice: 799, icon: 'cluster-o' }
]

// 推荐商品
export const recommendProducts = [
  { id: 5, name: '小米电视S Pro', price: 7999, icon: 'tv-o' },
  { id: 6, name: '小米平板6 Max', price: 3499, icon: 'photo-o' },
  { id: 7, name: 'Xiaomi Book Pro', price: 6999, icon: 'desktop-o' }
]
