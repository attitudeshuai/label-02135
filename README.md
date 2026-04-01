# 仿小米商城

## 环境要求

- Node.js >= 18.x（推荐 18.x 或 20.x）
- npm >= 9.x
- Docker & Docker Compose（可选，用于容器化部署）

## How to Run

### 方式一：Docker 部署（推荐）

```bash
# 启动项目
docker-compose up --build -d

# 停止项目
docker-compose down

# 查看日志
docker-compose logs -f
```

### 方式二：npm 本地开发

```bash
# 进入项目目录
cd frontend-user

# 安装依赖
npm install

# 启动开发服务器（热更新）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行单元测试
npm run test

# 运行单元测试并生成覆盖率报告
npm run test:coverage
```

### 测试说明

项目已集成 **Vitest** + **Vue Test Utils** 测试框架，支持：

- 单元测试：测试工具函数和组件
- 覆盖率统计：使用 v8 引擎生成详细的覆盖率报告
- 测试文件位置：`__tests__/` 目录

#### 测试示例

项目已包含两个示例测试文件：

1. `__tests__/validator.test.js` - 测试 `src/utils/validator.js` 工具函数
2. `__tests__/ProductCard.test.js` - 测试 `src/components/ProductCard.vue` 组件

#### 覆盖率报告

运行 `npm run test:coverage` 后会在项目根目录生成 `coverage/` 文件夹，包含：
- `index.html` - HTML格式的可视化覆盖率报告
- `lcov-report/` - 详细的覆盖率分析
- `lcov.info` - 标准格式的覆盖率数据

覆盖率配置见 `vitest.config.js`，默认排除路由和入口文件。

## Services

| 服务 | 端口 | 说明 |
|------|------|------|
| frontend-user | 8081 | 用户端商城 |

访问地址：http://localhost:8081

## 测试账号

本项目支持登录/注册功能（模拟）：
- 手机号：任意11位手机号（如 13800138000）
- 密码：任意6位以上字符（如 123456）

注册后自动登录，数据保存在浏览器本地存储中。

## 题目内容

使用vue、vant完成一个仿小米商城的前端项目

---

## 项目介绍

基于 Vue 3 + Vant 4 + Vite 5 开发的仿小米商城移动端项目。

### 技术栈

- Vue 3 (Composition API)
- Vant 4 (移动端UI组件库)
- Vue Router 4 (路由管理)
- Pinia (状态管理)
- Vite 5 (构建工具)

### 项目结构

```
frontend-user/
├── src/
│   ├── api/            # 数据层
│   │   └── mock.js     # Mock 数据
│   ├── components/     # 公共组件
│   │   ├── ProductImage.vue   # 商品图片组件
│   │   ├── ProductCard.vue    # 商品卡片组件
│   │   ├── SectionHeader.vue  # 区块标题组件
│   │   └── index.js           # 组件导出
│   ├── store/          # 状态管理
│   │   ├── cart.js     # 购物车状态
│   │   └── user.js     # 用户状态
│   ├── utils/          # 工具类
│   │   ├── validator.js  # 输入校验
│   │   └── logger.js     # 日志工具
│   ├── views/          # 页面组件
│   ├── router/         # 路由配置
│   ├── App.vue
│   └── main.js
├── Dockerfile
├── nginx.conf
└── package.json
```

### 功能实现说明

| 功能模块 | 实现状态 | 说明 |
|---------|---------|------|
| 首页展示 | ✅ 完整实现 | 轮播图、分类导航、限时秒杀、商品列表 |
| 商品分类 | ✅ 完整实现 | 8大分类导航、子分类展示、点击跳转搜索 |
| 商品搜索 | ✅ 完整实现 | 搜索历史(本地存储)、热门搜索、实时过滤 |
| 商品详情 | ✅ 完整实现 | 商品轮播、规格选择、详情/参数切换、收藏 |
| 购物车 | ✅ 完整实现 | 增删改查、全选、数量限制(1-99)、本地持久化 |
| 用户登录 | ✅ 完整实现 | 登录/注册切换、表单校验、本地持久化、登录态保持 |
| 收货地址 | ✅ 完整实现 | 地址列表、新增/编辑/删除、设置默认地址、本地持久化 |
| 订单确认 | ✅ 完整实现 | 选择地址、商品清单、选择支付方式、提交订单 |
| 订单列表 | ✅ 完整实现 | 全部/待付款/待发货/待收货/待评价、确认收货、本地持久化 |
| 个人中心 | ✅ 完整实现 | 用户信息、订单入口(带角标)、收货地址入口、退出登录 |
| 支付功能 | ⚠️ 模拟实现 | 支持选择微信/支付宝，提交后模拟支付成功 |

### Mock 数据说明

本项目为纯前端演示项目，所有数据均为模拟数据：

| 数据类型 | 存储方式 | 说明 |
|---------|---------|------|
| 商品数据 | 静态Mock | 定义在 `src/api/mock.js`，包含10个商品 |
| 商品图片 | 图标渐变 | 使用 Vant 图标 + CSS 渐变背景，按分类区分颜色 |
| 用户数据 | localStorage | 模拟登录，支持任意手机号注册 |
| 购物车 | localStorage | 完整CRUD，数据持久化 |
| 收货地址 | localStorage | 完整CRUD，支持设置默认地址 |
| 订单数据 | localStorage | 完整订单流程，支持状态流转 |
| 搜索历史 | localStorage | 最多保留10条记录 |

### 错误处理与日志

- 所有操作都有 try-catch 错误捕获
- 用户输入有完整的校验和边界检查
- 购物车数量限制 1-99
- 开发环境下可在浏览器控制台查看详细日志（DEBUG/INFO/WARN/ERROR）

### 扩展说明

如需接入真实后端，可按以下步骤：

1. 在 `src/api/` 目录下创建 `request.js` 封装 HTTP 请求
2. 修改 `mock.js` 中的数据获取方式为真实 API 调用
3. 修改 `store/` 中的状态管理逻辑，调用真实接口
