<template>
  <div class="product-card" @click="$emit('click')">
    <div class="card-img">
      <ProductImage :icon="product.icon" :size="imgSize" />
      <span class="card-tag" v-if="tag">{{ tag }}</span>
    </div>
    <div class="card-info">
      <div class="card-name">{{ product.name }}</div>
      <div class="card-desc" v-if="showDesc">{{ product.desc }}</div>
      <div class="card-bottom">
        <div class="card-price">
          <span class="symbol">¥</span>
          <span class="amount">{{ product.price }}</span>
        </div>
        <div class="card-sales" v-if="showSales">{{ sales }}付款</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductImage from './ProductImage.vue'

const props = defineProps({
  product: { type: Object, required: true },
  tag: { type: String, default: '' },
  showDesc: { type: Boolean, default: true },
  showSales: { type: Boolean, default: true },
  imgSize: { type: Number, default: 120 }
})

defineEmits(['click'])

const sales = Math.floor(Math.random() * 10) + '万+'
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-img {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: #fafafa;
}

.card-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  background: linear-gradient(135deg, #ff6700, #ff9500);
  color: #fff;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
}

.card-info { padding: 10px 12px 12px; }
.card-name { font-size: 14px; font-weight: 500; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card-desc { font-size: 11px; color: #999; margin: 5px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card-bottom { display: flex; justify-content: space-between; align-items: baseline; margin-top: 5px; }
.card-price { color: #ff6700; }
.card-price .symbol { font-size: 12px; }
.card-price .amount { font-size: 18px; font-weight: 600; }
.card-sales { font-size: 10px; color: #bbb; }
</style>
