<template>
  <div class="product-image" :style="{ width: size + 'px', height: size + 'px' }">
    <img
      v-if="image"
      :src="image"
      :alt="alt"
      class="product-img"
      :style="{ width: size + 'px', height: size + 'px' }"
      @error="onImgError"
      loading="lazy"
    />
    <div v-else class="product-fallback" :style="{ width: size + 'px', height: size + 'px', background: bgColor }">
      <van-icon :name="icon" :size="size * 0.4" :color="iconColor" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  icon: { type: String, default: 'photo-o' },
  image: { type: String, default: '' },
  alt: { type: String, default: '商品图片' },
  size: { type: Number, default: 100 },
  color: { type: String, default: '' }
})

const imgFailed = ref(false)

const colors = {
  'phone-o': { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '#fff' },
  'tv-o': { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: '#fff' },
  'desktop-o': { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '#fff' },
  'photo-o': { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', icon: '#fff' },
  'clock-o': { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', icon: '#fff' },
  'music-o': { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', icon: '#667' },
  'cluster-o': { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', icon: '#667' },
  'bulb-o': { bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', icon: '#667' }
}

const bgColor = computed(() => colors[props.icon]?.bg || 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)')
const iconColor = computed(() => colors[props.icon]?.icon || '#999')

function onImgError(e) {
  // 图片加载失败时使用 picsum 随机图作为兜底
  const target = e.target
  if (!imgFailed.value) {
    imgFailed.value = true
    target.src = `https://picsum.photos/seed/${props.icon}${props.size}/${props.size * 2}/${props.size * 2}`
  }
}
</script>

<style scoped>
.product-image {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
  overflow: hidden;
}

.product-img {
  object-fit: cover;
  border-radius: 12px;
}

.product-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}
</style>
