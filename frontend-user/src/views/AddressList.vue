<template>
  <div class="address-list">
    <van-nav-bar title="收货地址" left-arrow @click-left="$router.back()" />
    
    <div class="list" v-if="addressStore.addresses.length">
      <div class="address-item" v-for="addr in addressStore.addresses" :key="addr.id" @click="selectAddress(addr)">
        <div class="addr-info">
          <div class="addr-user">
            <span class="name">{{ addr.name }}</span>
            <span class="phone">{{ addr.phone }}</span>
            <van-tag v-if="addr.isDefault" type="danger" size="small">默认</van-tag>
          </div>
          <div class="addr-detail">{{ addr.province }} {{ addr.city }} {{ addr.district }} {{ addr.detail }}</div>
        </div>
        <van-icon name="edit" size="20" color="#999" @click.stop="editAddress(addr)" />
      </div>
    </div>
    
    <van-empty v-else description="暂无收货地址" />
    
    <div class="bottom-btn">
      <van-button type="primary" block round @click="addAddress">新增收货地址</van-button>
    </div>
    
    <!-- 编辑弹窗 -->
    <van-popup v-model:show="showEdit" position="bottom" round :style="{ height: '70%' }">
      <div class="edit-popup">
        <div class="popup-header">
          <span>{{ editingId ? '编辑地址' : '新增地址' }}</span>
          <van-icon name="cross" @click="showEdit = false" />
        </div>
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field v-model="form.name" label="收货人" placeholder="请输入收货人姓名" :rules="[{ required: true }]" />
            <van-field v-model="form.phone" label="手机号" type="tel" placeholder="请输入手机号" :rules="[{ required: true, pattern: /^1[3-9]\d{9}$/ }]" />
            <van-field v-model="form.province" label="省份" placeholder="请输入省份" :rules="[{ required: true }]" />
            <van-field v-model="form.city" label="城市" placeholder="请输入城市" :rules="[{ required: true }]" />
            <van-field v-model="form.district" label="区县" placeholder="请输入区县" :rules="[{ required: true }]" />
            <van-field v-model="form.detail" label="详细地址" placeholder="请输入详细地址" :rules="[{ required: true }]" />
            <van-cell>
              <van-checkbox v-model="form.isDefault" checked-color="#ff6700">设为默认地址</van-checkbox>
            </van-cell>
          </van-cell-group>
          <div class="form-btns">
            <van-button type="primary" block round native-type="submit">保存</van-button>
            <van-button v-if="editingId" block round @click="deleteAddress">删除地址</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAddressStore } from '../store/address'
import { notify, notifySuccess, confirm } from '../utils/notify'

const router = useRouter()
const route = useRoute()
const addressStore = useAddressStore()

const showEdit = ref(false)
const editingId = ref(null)
const form = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  isDefault: false
})

function resetForm() {
  form.value = { name: '', phone: '', province: '', city: '', district: '', detail: '', isDefault: false }
  editingId.value = null
}

function addAddress() {
  resetForm()
  showEdit.value = true
}

function editAddress(addr) {
  editingId.value = addr.id
  form.value = { ...addr }
  showEdit.value = true
}

function selectAddress(addr) {
  if (route.query.select) {
    router.back()
    // 通过 localStorage 传递选中的地址
    localStorage.setItem('selectedAddress', JSON.stringify(addr))
  }
}

function onSubmit() {
  const result = editingId.value 
    ? addressStore.updateAddress(editingId.value, form.value)
    : addressStore.addAddress(form.value)
  
  if (result.success) {
    notifySuccess('保存成功')
    showEdit.value = false
    resetForm()
  } else {
    notify(result.message)
  }
}

function deleteAddress() {
  confirm({ title: '提示', message: '确定删除该地址吗？' })
    .then(() => {
      const result = addressStore.removeAddress(editingId.value)
      if (result.success) {
        notifySuccess('删除成功')
        showEdit.value = false
        resetForm()
      } else {
        notify(result.message)
      }
    })
    .catch(() => {})
}
</script>

<style scoped>
.address-list { min-height: 100vh; background: #f5f5f5; padding-bottom: 80px; }

.list { padding: 10px; }

.address-item {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.addr-info { flex: 1; }

.addr-user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.addr-user .name { font-size: 16px; font-weight: 500; color: #333; }
.addr-user .phone { font-size: 14px; color: #666; }

.addr-detail { font-size: 13px; color: #666; line-height: 1.4; }

.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: #fff;
}

.bottom-btn :deep(.van-button) {
  background: linear-gradient(135deg, #ff6700, #ff9500);
  border: none;
}

.edit-popup { padding: 15px; }

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 20px;
  font-size: 16px;
  font-weight: 500;
}

.form-btns {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-btns :deep(.van-button--primary) {
  background: linear-gradient(135deg, #ff6700, #ff9500);
  border: none;
}
</style>
