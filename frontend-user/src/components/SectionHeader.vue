<template>
  <div class="section-header">
    <div class="title">
      <van-icon v-if="icon" :name="icon" color="#ff6700" />
      <span>{{ title }}</span>
    </div>
    <slot name="right">
      <span class="more" v-if="showMore" @click="$emit('more')">
        {{ moreText }} <van-icon name="arrow" />
      </span>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: '' },
  showMore: { type: Boolean, default: false },
  moreText: { type: String, default: '查看更多' }
})

defineEmits(['more'])
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.more {
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
}
</style>
