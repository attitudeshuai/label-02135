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

# 运行单元测试（watch模式）
npm run test

# 运行单元测试（单次执行）
npm run test:run

# 运行单元测试并生成覆盖率报告
npm run test:coverage

# 运行单元测试（UI界面）
npm run test:ui
```

## 单元测试工程化

本项目已集成 **Vitest + Vue Test Utils** 实现完整的前端测试工程化方案：

### 技术栈

| 工具 | 用途 | 版本 |
|------|------|------|
| Vitest | 测试运行器、断言库 | ^1.6.0 |
| Vue Test Utils | Vue组件测试工具库 | 最新 |
| happy-dom | DOM模拟环境 | ^14.0.0 |
| @vitest/coverage-v8 | 覆盖率统计 | ^1.6.0 |

### 测试命令说明

| 命令 | 说明 | 输出 |
|------|------|------|
| `npm run test` | 启动开发模式测试，文件修改自动重跑 | 控制台实时输出 |
| `npm run test:run` | CI/CD环境单次执行所有测试 | 控制台测试报告 |
| `npm run test:coverage` | 执行测试并统计代码覆盖率 | `coverage/` 目录下HTML/JSON报告 |
| `npm run test:ui` | 启动可视化测试UI界面 | 浏览器界面 |

### 测试文件规范

```
src/
├── components/
│   └── __tests__/          # 组件测试目录
│       └── *.test.js       # 组件单元测试
├── store/
│   └── __tests__/          # Store测试目录
│       └── *.test.js       # Pinia状态管理测试
├── utils/
│   └── __tests__/          # 工具函数测试目录
│       └── *.test.js       # 纯函数单元测试
└── views/
    └── __tests__/          # 页面组件测试目录
        └── *.test.js       # 页面集成测试
```

### 已实现的测试示例

1. **工具函数单元测试** - `src/utils/__tests__/validator.test.js`
   - 覆盖所有输入校验场景（手机号、密码、购物车数量、搜索关键词）
   - 代码覆盖率：100%

2. **Vue组件测试** - `src/components/__tests__/ProductImage.test.js`
   - 组件Props渲染验证
   - 条件渲染分支覆盖
   - UI组件Mock策略

3. **Pinia状态管理测试** - `src/store/__tests__/cart.test.js`
   - 购物车核心业务流程（增删改查、全选、价格计算）
   - 边界条件验证（数量限制1-99）
   - 代码覆盖率：80.87%

### 覆盖率统计配置

在 `vite.config.js` 中已配置：
- **统计范围**：`src/**/*.{js,vue}`
- **排除文件**：路由配置、入口文件、Mock数据
- **报告格式**：控制台文本、HTML可视化、JSON

### 最佳实践

1. **纯函数优先**：工具逻辑抽离为纯函数，易于测试
2. **组件隔离**：使用 `stubs` Mock第三方UI组件（如Vant）
3. **环境隔离**：每个测试用例独立创建Pinia实例
4. **边界覆盖**：重点测试空值、极值、异常场景

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
