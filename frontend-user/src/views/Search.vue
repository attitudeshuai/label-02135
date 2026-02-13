<template>
  <div class="search">
    <van-nav-bar title="搜索" left-arrow @click-left="$router.back()" />
    <van-search v-model="keyword" placeholder="搜索商品" show-action autofocus @search="onSearch" @cancel="$router.back()" />
    
    <div class="search-content" v-if="!keyword">
      <div class="history" v-if="history.length">
        <SectionHeader title="搜索历史">
          <template #right>
            <van-icon name="delete-o" size="18" color="#999" @click="clearHistory" class="delete-icon" />
          </template>
        </SectionHeader>
        <div class="tags">
          <span class="tag" v-for="(item, index) in history" :key="index" @click="keyword = item">{{ item }}</span>
        </div>
      </div>

      <div class="hot">
        <SectionHeader title="热门搜索" icon="fire-o" />
        <div class="hot-list">
          <div class="hot-item" v-for="(item, index) in hotWords" :key="item" @click="keyword = item">
            <span class="rank" :class="{ top: index < 3 }">{{ index + 1 }}</span>
            <span class="word">{{ item }}</span>
            <van-tag v-if="index === 0" type="danger" size="small">热</van-tag>
            <van-tag v-else-if="index === 1" type="warning" size="small">新</van-tag>
          </div>
        </div>
      </div>
    </div>

    <div class="results" v-if="keyword">
      <div class="filter-bar">
        <span :class="{ active: sortType === 'default' }" @click="sortType = 'default'">综合</span>
        <span :class="{ active: sortType === 'sales' }" @click="sortType = 'sales'">销量</span>
        <span :class="{ active: sortType === 'price' }" @click="sortType = 'price'">价格</span>
      </div>
      <div class="result-list">
        <div class="result-item" v-for="product in filteredProducts" :key="product.id" @click="goProduct(product.id)">
          <ProductImage :icon="product.icon" :image="product.image" :alt="product.name" :size="100" />
          <div class="result-info">
            <div class="result-name">{{ product.name }}</div>
            <div class="result-desc">{{ product.desc }}</div>
            <div class="result-tags">
              <van-tag plain type="danger" size="small">自营</van-tag>
              <van-tag plain size="small">免运费</van-tag>
            </div>
            <div class="result-bottom">
              <div class="result-price">
                <span class="symbol">¥</span>
                <span class="amount">{{ product.price }}</span>
              </div>
              <div class="result-sales">{{ Math.floor(Math.random() * 10) }}万+付款</div>
            </div>
          </div>
        </div>
      </div>
      <van-empty v-if="!filteredProducts.length" description="未找到相关商品" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { products } from '../api/mock'
import { ProductImage, SectionHeader } from '../components'
import { validateSearchKeyword } from '../utils/validator'
import logger from '../utils/logger'

const MODULE = 'SearchPage'
const router = useRouter()
const route = useRoute()
const keyword = ref('')
const sortType = ref('default')
const history = ref(JSON.parse(localStorage.getItem('searchHistory') || '[]'))
const hotWords = ['Xiaomi 14', '小米电视', '手环', '路由器', '平板', 'Redmi K70', '小米手表', '耳机']

// 从 URL 参数获取关键词
onMounted(() => {
  if (route.query.keyword) {
    keyword.value = route.query.keyword
  }
})

const filteredProducts = computed(() => {
  if (!keyword.value) return []
  const validation = validateSearchKeyword(keyword.value)
  if (!validation.valid) return []
  return products.filter(p => 
    p.name.toLowerCase().includes(validation.value.toLowerCase()) ||
    p.desc.toLowerCase().includes(validation.value.toLowerCase())
  )
})

function onSearch() {
  const validation = validateSearchKeyword(keyword.value)
  if (!validation.valid) return
  
  if (!history.value.includes(validation.value)) {
    history.value.unshift(validation.value)
    history.value = history.value.slice(0, 10)
    localStorage.setItem('searchHistory', JSON.stringify(history.value))
    logger.info(MODULE, '搜索历史已更新', { keyword: validation.value })
  }
}

function clearHistory() {
  history.value = []
  localStorage.removeItem('searchHistory')
  logger.info(MODULE, '搜索历史已清空')
}

function goProduct(id) {
  onSearch()
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.search { min-height: 100vh; background: #f5f5f5; }

.search-content { padding: 15px; }

.history { background: #fff; padding: 15px; border-radius: 12px; margin-bottom: 15px; }
.history .delete-icon { cursor: pointer; transition: opacity 0.2s; }
.history .delete-icon:active { opacity: 0.5; }
.tags { display: flex; flex-wrap: wrap; gap: 10px; }
.tag {
  padding: 8px 16px;
  background: #f5f5f5;
  border-radius: 20px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: background 0.2s;
}
.tag:active { background: #eee; }

.hot { background: #fff; padding: 15px; border-radius: 12px; }
.hot-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
  gap: 12px;
  cursor: pointer;
  transition: background 0.2s;
}
.hot-item:active { background: #f9f9f9; }
.hot-item:last-child { border-bottom: none; }
.hot-item .rank {
  width: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #999;
}
.hot-item .rank.top { color: #ff6700; }
.hot-item .word { flex: 1; font-size: 14px; color: #333; }

.filter-bar {
  display: flex;
  background: #fff;
  padding: 12px 15px;
  gap: 30px;
}
.filter-bar span {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
}
.filter-bar span:active { opacity: 0.7; }
.filter-bar span.active { color: #ff6700; font-weight: 500; }

.result-list { padding: 10px; }
.result-item {
  display: flex;
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s;
}
.result-item:active { transform: scale(0.98); }
.result-info { flex: 1; display: flex; flex-direction: column; }
.result-name { font-size: 14px; font-weight: 500; color: #333; line-height: 1.4; }
.result-desc { font-size: 12px; color: #999; margin: 6px 0; }
.result-tags { display: flex; gap: 6px; }
.result-bottom { display: flex; justify-content: space-between; align-items: baseline; margin-top: auto; }
.result-price { color: #ff6700; }
.result-price .symbol { font-size: 12px; }
.result-price .amount { font-size: 20px; font-weight: 600; }
.result-sales { font-size: 11px; color: #bbb; }
</style>
