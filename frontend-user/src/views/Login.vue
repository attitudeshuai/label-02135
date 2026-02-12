<template>
  <div class="login-page">
    <van-nav-bar :title="isLogin ? '登录' : '注册'" left-arrow @click-left="$router.back()" />
    
    <div class="login-header">
      <div class="logo">MI</div>
      <div class="title">{{ isLogin ? '欢迎回来' : '注册账号' }}</div>
    </div>

    <van-form @submit="onSubmit" class="login-form" ref="formRef">
      <van-cell-group inset>
        <van-field 
          v-model="phone" 
          type="tel" 
          label="手机号" 
          placeholder="请输入手机号" 
          maxlength="11"
          :rules="phoneRules"
          clearable
        />
        <van-field 
          v-model="password" 
          :type="showPwd ? 'text' : 'password'" 
          label="密码" 
          placeholder="请输入密码（6-20位）"
          maxlength="20"
          :rules="passwordRules"
        >
          <template #right-icon>
            <van-icon :name="showPwd ? 'eye-o' : 'closed-eye'" @click="showPwd = !showPwd" />
          </template>
        </van-field>
        <van-field 
          v-if="!isLogin" 
          v-model="confirmPwd" 
          :type="showPwd ? 'text' : 'password'" 
          label="确认密码" 
          placeholder="请再次输入密码"
          maxlength="20"
          :rules="confirmRules"
        />
      </van-cell-group>

      <div class="form-footer">
        <van-button round block type="primary" native-type="submit" :loading="userStore.loading">
          {{ isLogin ? '登 录' : '注 册' }}
        </van-button>
        <div class="switch-mode" @click="switchMode">
          {{ isLogin ? '没有账号？立即注册' : '已有账号？立即登录' }}
        </div>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { notify, notifySuccess } from '../utils/notify'
import { validatePhone, validatePassword } from '../utils/validator'
import logger from '../utils/logger'

const MODULE = 'LoginPage'
const router = useRouter()
const userStore = useUserStore()
const formRef = ref(null)

const isLogin = ref(true)
const phone = ref('')
const password = ref('')
const confirmPwd = ref('')
const showPwd = ref(false)

const phoneRules = [
  { required: true, message: '请输入手机号' },
  { validator: (val) => /^1[3-9]\d{9}$/.test(val), message: '请输入正确的手机号格式' }
]

const passwordRules = [
  { required: true, message: '请输入密码' },
  { validator: (val) => val.length >= 6, message: '密码长度不能少于6位' },
  { validator: (val) => val.length <= 20, message: '密码长度不能超过20位' },
  { validator: (val) => /^[a-zA-Z0-9_]+$/.test(val), message: '密码只能包含字母、数字和下划线' }
]

const confirmRules = [
  { required: true, message: '请确认密码' },
  { validator: (val) => val === password.value, message: '两次密码输入不一致' }
]

function switchMode() {
  isLogin.value = !isLogin.value
  password.value = ''
  confirmPwd.value = ''
  logger.debug(MODULE, '切换模式', { isLogin: isLogin.value })
}

async function onSubmit() {
  try {
    logger.info(MODULE, '提交表单', { isLogin: isLogin.value })
    
    const result = isLogin.value 
      ? await userStore.login(phone.value, password.value)
      : await userStore.register(phone.value, password.value)
    
    if (result.success) {
      notifySuccess(isLogin.value ? '登录成功' : '注册成功')
      const redirect = router.currentRoute.value.query.redirect
      router.replace(redirect || '/')
    } else {
      notify(result.message || '操作失败', 'error')
    }
  } catch (error) {
    logger.error(MODULE, '表单提交异常', error)
    notify('操作失败，请稍后重试', 'error')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #ff6700 0%, #ff6700 200px, #f5f5f5 200px);
}

.login-header {
  padding: 40px 0;
  text-align: center;
}

.logo {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  font-style: italic;
}

.title {
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
}

.login-form {
  padding: 0 20px;
}

.login-form :deep(.van-cell-group) {
  border-radius: 12px;
  overflow: hidden;
}

.form-footer {
  margin-top: 30px;
}

.form-footer :deep(.van-button) {
  background: linear-gradient(135deg, #ff6700, #ff9500);
  border: none;
  height: 46px;
  font-size: 16px;
}

.switch-mode {
  text-align: center;
  margin-top: 20px;
  color: #ff6700;
  font-size: 14px;
  background: transparent;
  border: none;
  outline: none;
}
</style>
