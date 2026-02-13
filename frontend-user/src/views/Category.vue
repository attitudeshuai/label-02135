<template>
  <div class="category">
    <van-nav-bar title="分类" />
    <van-search v-model="searchVal" placeholder="搜索商品" shape="round" @click="$router.push('/search')" readonly />
    <div class="content">
      <van-sidebar v-model="activeKey" class="sidebar">
        <van-sidebar-item v-for="cat in categoryList" :key="cat.id" :title="cat.name" />
      </van-sidebar>
      <div class="main">
        <div class="category-banner" :style="{ background: bannerColors[activeKey % bannerColors.length] }">
          <van-icon :name="categoryList[activeKey]?.icon || 'shop-o'" size="40" color="#fff" />
          <span>{{ categoryList[activeKey]?.name || '分类' }}</span>
        </div>
        <div class="sub-title" v-if="categoryList[activeKey]">{{ categoryList[activeKey].name }}分类</div>
        <div class="sub-list" v-if="categoryList[activeKey]">
          <div class="sub-item" v-for="sub in categoryList[activeKey].children" :key="sub.id" @click="goSearch(sub.name)">
            <ProductImage :icon="sub.icon" :image="sub.image" :alt="sub.name" :size="60" />
            <span>{{ sub.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categoryList } from '../api/mock'
import { ProductImage } from '../components'

const route = useRoute()
const router = useRouter()
const searchVal = ref('')

// 从 sessionStorage 恢复或使用路由参数
const savedIndex = sessionStorage.getItem('categoryActiveKey')
const initialIndex = route.query.index !== undefined ? parseInt(route.query.index) : (savedIndex ? parseInt(savedIndex) : 0)
const activeKey = ref(initialIndex)

const bannerColors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
]

// 监听 activeKey 变化，保存到 sessionStorage
watch(activeKey, (val) => {
  sessionStorage.setItem('categoryActiveKey', val.toString())
})

onMounted(() => {
  // 如果有路由参数，优先使用路由参数
  const index = route.query.index
  if (index !== undefined) {
    activeKey.value = parseInt(index)
  }
})

function goSearch(keyword) {
  router.push({ path: '/search', query: { keyword } })
}
</script>

<style scoped>
.category { height: 100vh; display: flex; flex-direction: column; background: #f5f5f5; }

:deep(.van-search) { padding: 10px 15px; }

.content { flex: 1; display: flex; overflow: hidden; }

.sidebar {
  width: 90px;
  flex-shrink: 0;
  background: #f8f8f8;
}
:deep(.van-sidebar-item) {
  padding: 18px 12px;
  font-size: 13px;
  background: #f8f8f8;
}
:deep(.van-sidebar-item--select) {
  background: #fff;
  color: #ff6700;
  font-weight: 500;
}
:deep(.van-sidebar-item--select::before) {
  background: #ff6700;
}

.main {
  flex: 1;
  background: #fff;
  padding: 15px;
  overflow-y: auto;
}

.category-banner {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  margin-bottom: 15px;
}

.sub-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  padding-left: 10px;
  border-left: 3px solid #ff6700;
}

.sub-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.sub-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
}
.sub-item:active {
  transform: scale(0.95);
}

.sub-item span {
  font-size: 12px;
  color: #333;
  margin-top: 8px;
  text-align: center;
}
</style>
