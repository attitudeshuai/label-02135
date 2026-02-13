<template>
  <div class="home">
    <!-- 顶部搜索栏 -->
    <div class="header">
      <div class="logo">MI</div>
      <van-search v-model="searchVal" placeholder="Xiaomi 14 Ultra" shape="round" background="transparent" @click="$router.push('/search')" readonly />
      <van-icon name="scan" size="22" color="#fff" class="scan-icon" @click="onScanClick" />
    </div>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="#ff6700" class="banner-swipe">
      <van-swipe-item v-for="banner in banners" :key="banner.id">
        <div class="banner-img" :style="{ background: banner.color }">
          <img :src="banner.image" :alt="banner.title" class="banner-real-img" @error="(e) => e.target.style.display='none'" />
          <div class="banner-text">
            <div class="banner-title">{{ banner.title }}</div>
            <div class="banner-desc">{{ banner.desc }}</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 分类导航 -->
    <div class="nav-section">
      <div class="nav-item" v-for="(cat, index) in categories" :key="cat.id" @click="goCategory(index)">
        <div class="nav-icon" :style="{ background: cat.color }">
          <van-icon :name="cat.icon" size="24" color="#fff" />
        </div>
        <span>{{ cat.name }}</span>
      </div>
    </div>

    <!-- 限时秒杀 -->
    <div class="section flash-sale">
      <SectionHeader title="限时秒杀" icon="fire-o">
        <template #right>
          <van-count-down :time="countdown" format="HH:mm:ss" class="countdown" />
        </template>
      </SectionHeader>
      <div class="flash-list">
        <div class="flash-item" v-for="item in flashSaleProducts" :key="item.id" @click="$router.push(`/product/${item.id}`)">
          <ProductImage :icon="item.icon" :image="item.image" :alt="item.name" :size="80" />
          <div class="flash-name">{{ item.name }}</div>
          <div class="flash-price">¥{{ item.salePrice }}</div>
          <div class="flash-origin">¥{{ item.price }}</div>
        </div>
      </div>
    </div>

    <!-- 热门推荐 -->
    <div class="section">
      <SectionHeader title="热门推荐" icon="hot-o" />
      <div class="product-grid">
        <ProductCard 
          v-for="(product, index) in products" 
          :key="product.id"
          :product="product"
          :tag="index === 0 ? '热卖' : index === 1 ? '新品' : ''"
          @click="$router.push(`/product/${product.id}`)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { banners, categories, products, flashSaleProducts } from '../api/mock'
import { ProductImage, SectionHeader, ProductCard } from '../components'
import { notify } from '../utils/notify'

const router = useRouter()
const searchVal = ref('')
const countdown = ref(2 * 60 * 60 * 1000)

function goCategory(index) {
  router.push({ path: '/category', query: { index } })
}

function onScanClick() {
  notify('扫码功能开发中，敬请期待')
}
</script>

<style scoped>
.home {
  padding-bottom: 70px;
  background: linear-gradient(180deg, #ff6700 0%, #ff6700 200px, #f5f5f5 200px);
}

.header {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  gap: 10px;
}

.header .logo {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  font-style: italic;
}

.header :deep(.van-search) { flex: 1; padding: 0; }
.header :deep(.van-search__content) { background: rgba(255, 255, 255, 0.3); }
.header :deep(.van-field__control) { color: #fff; }
.header :deep(.van-field__control::placeholder) { color: rgba(255, 255, 255, 0.8); }
.header :deep(.van-icon-search) { color: rgba(255, 255, 255, 0.8); }

.scan-icon { transition: opacity 0.2s; cursor: pointer; }
.scan-icon:active { opacity: 0.6; }

.banner-swipe {
  margin: 0 10px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.banner-img {
  width: 100%;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.banner-real-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-text { text-align: center; color: #fff; position: relative; z-index: 1; text-shadow: 0 1px 4px rgba(0,0,0,0.3); }
.banner-title { font-size: 24px; font-weight: 600; }
.banner-desc { font-size: 14px; margin-top: 8px; opacity: 0.9; }

.nav-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 20px 15px;
  background: #fff;
  margin: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.nav-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.nav-item:active .nav-icon { transform: scale(0.95); }
.nav-item span { font-size: 12px; color: #333; }

.section {
  background: #fff;
  margin: 10px;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.flash-sale .countdown {
  background: linear-gradient(135deg, #ff6700, #ff9500);
  padding: 2px 8px;
  border-radius: 4px;
}

.flash-sale :deep(.van-count-down) {
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

.flash-list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 5px;
}

.flash-list::-webkit-scrollbar { display: none; }

.flash-item {
  flex-shrink: 0;
  width: 100px;
  text-align: center;
}

.flash-name { font-size: 12px; color: #333; margin-top: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.flash-price { color: #ff6700; font-size: 16px; font-weight: 600; margin-top: 4px; }
.flash-origin { color: #999; font-size: 12px; text-decoration: line-through; }

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>
