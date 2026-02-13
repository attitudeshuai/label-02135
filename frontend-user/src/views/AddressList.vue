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
        <van-form @submit="onSubmit" ref="formRef">
          <van-cell-group inset>
            <van-field
              v-model="form.name"
              label="收货人"
              placeholder="请输入收货人姓名"
              maxlength="20"
              :rules="[
                { required: true, message: '请输入收货人姓名' },
                { validator: v => v.trim().length >= 2, message: '姓名至少2个字符' }
              ]"
            />
            <van-field
              v-model="form.phone"
              label="手机号"
              type="tel"
              placeholder="请输入手机号"
              maxlength="11"
              :rules="[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的11位手机号' }
              ]"
            />
            <van-field
              v-model="form.province"
              is-link
              readonly
              label="省份"
              placeholder="请选择省份"
              :rules="[{ required: true, message: '请选择省份' }]"
              @click="showProvincePicker = true"
            />
            <van-field
              v-model="form.city"
              is-link
              readonly
              label="城市"
              placeholder="请选择城市"
              :rules="[{ required: true, message: '请选择城市' }]"
              @click="form.province ? showCityPicker = true : notify('请先选择省份')"
            />
            <van-field
              v-model="form.district"
              is-link
              readonly
              label="区县"
              placeholder="请选择区县"
              :rules="[{ required: true, message: '请选择区县' }]"
              @click="form.city ? showDistrictPicker = true : notify('请先选择城市')"
            />
            <van-field
              v-model="form.detail"
              label="详细地址"
              placeholder="请输入详细地址（楼栋门牌号等）"
              maxlength="100"
              :rules="[
                { required: true, message: '请输入详细地址' },
                { validator: v => v.trim().length >= 5, message: '详细地址至少5个字符' }
              ]"
            />
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
    
    <!-- 省份选择器 -->
    <van-popup v-model:show="showProvincePicker" position="bottom" round>
      <div class="picker-header">
        <span @click="showProvincePicker = false">取消</span>
        <span class="picker-title">选择省份</span>
        <span></span>
      </div>
      <div class="picker-list">
        <div 
          v-for="p in provinces" 
          :key="p" 
          class="picker-item" 
          :class="{ active: form.province === p }"
          @click="form.province = p; showProvincePicker = false"
        >{{ p }}</div>
      </div>
    </van-popup>
    
    <!-- 城市选择器 -->
    <van-popup v-model:show="showCityPicker" position="bottom" round>
      <div class="picker-header">
        <span @click="showCityPicker = false">取消</span>
        <span class="picker-title">选择城市</span>
        <span></span>
      </div>
      <div class="picker-list">
        <div 
          v-for="c in cities" 
          :key="c" 
          class="picker-item"
          :class="{ active: form.city === c }"
          @click="form.city = c; showCityPicker = false"
        >{{ c }}</div>
      </div>
    </van-popup>
    
    <!-- 区县选择器 -->
    <van-popup v-model:show="showDistrictPicker" position="bottom" round>
      <div class="picker-header">
        <span @click="showDistrictPicker = false">取消</span>
        <span class="picker-title">选择区县</span>
        <span></span>
      </div>
      <div class="picker-list">
        <div 
          v-for="d in districts" 
          :key="d" 
          class="picker-item"
          :class="{ active: form.district === d }"
          @click="form.district = d; showDistrictPicker = false"
        >{{ d }}</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAddressStore } from '../store/address'
import { notify, notifySuccess, confirm } from '../utils/notify'

const router = useRouter()
const route = useRoute()
const addressStore = useAddressStore()

// 省市区数据
const areaData = {
  '北京市': {
    '北京市': ['东城区', '西城区', '朝阳区', '海淀区', '丰台区', '通州区']
  },
  '上海市': {
    '上海市': ['黄浦区', '徐汇区', '长宁区', '静安区', '浦东新区', '闵行区']
  },
  '广东省': {
    '广州市': ['天河区', '越秀区', '海珠区', '白云区', '番禺区'],
    '深圳市': ['福田区', '南山区', '罗湖区', '宝安区', '龙岗区']
  },
  '浙江省': {
    '杭州市': ['西湖区', '上城区', '拱墅区', '滨江区', '余杭区'],
    '宁波市': ['海曙区', '江北区', '鄞州区', '镇海区']
  },
  '江苏省': {
    '南京市': ['玄武区', '秦淮区', '建邺区', '鼓楼区', '江宁区'],
    '苏州市': ['姑苏区', '吴中区', '相城区', '工业园区']
  }
}

const provinces = Object.keys(areaData)

const showEdit = ref(false)
const editingId = ref(null)
const formRef = ref(null)
const form = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  isDefault: false
})

// Picker 显示状态
const showProvincePicker = ref(false)
const showCityPicker = ref(false)
const showDistrictPicker = ref(false)

// 计算属性必须在 form 定义之后
const cities = computed(() => {
  if (!form.value.province) return []
  return Object.keys(areaData[form.value.province] || {})
})

const districts = computed(() => {
  if (!form.value.province || !form.value.city) return []
  return areaData[form.value.province]?.[form.value.city] || []
})

// watch 必须在 form 定义之后
watch(() => form.value.province, (newVal, oldVal) => {
  if (oldVal !== undefined && newVal !== oldVal) {
    form.value.city = ''
    form.value.district = ''
  }
})

watch(() => form.value.city, (newVal, oldVal) => {
  if (oldVal !== undefined && newVal !== oldVal) {
    form.value.district = ''
  }
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
    localStorage.setItem('selectedAddress', JSON.stringify(addr))
    router.back()
  } else {
    notify(`已选择地址：${addr.name}`)
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
    notify(result.message, 'error')
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
        notify(result.message, 'error')
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
  transition: background 0.2s;
}
.address-item:active { background: #f9f9f9; }

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

.edit-popup { padding: 15px; overflow-y: auto; }

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

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
}
.picker-header span { color: #666; font-size: 14px; width: 60px; }
.picker-header span:first-child { cursor: pointer; }
.picker-title { font-size: 16px; font-weight: 500; color: #333; text-align: center; flex: 1; }

.picker-list {
  max-height: 300px;
  overflow-y: auto;
}
.picker-item {
  padding: 15px 20px;
  font-size: 15px;
  color: #333;
  border-bottom: 1px solid #f5f5f5;
}
.picker-item:active { background: #f9f9f9; }
.picker-item.active { color: #ff6700; font-weight: 500; }
</style>
