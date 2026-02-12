/**
 * 日志工具类
 * 支持不同级别的日志输出，生产环境可关闭
 */
const isDev = import.meta.env.DEV

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
}

const currentLevel = isDev ? LOG_LEVELS.DEBUG : LOG_LEVELS.WARN

function formatTime() {
  return new Date().toLocaleTimeString('zh-CN', { hour12: false })
}

function formatMessage(level, module, message, data) {
  const time = formatTime()
  const prefix = `[${time}] [${level}] [${module}]`
  return { prefix, message, data }
}

export const logger = {
  debug(module, message, data = null) {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      const { prefix } = formatMessage('DEBUG', module, message, data)
      console.log(`%c${prefix}`, 'color: #888', message, data || '')
    }
  },

  info(module, message, data = null) {
    if (currentLevel <= LOG_LEVELS.INFO) {
      const { prefix } = formatMessage('INFO', module, message, data)
      console.info(`%c${prefix}`, 'color: #1890ff', message, data || '')
    }
  },

  warn(module, message, data = null) {
    if (currentLevel <= LOG_LEVELS.WARN) {
      const { prefix } = formatMessage('WARN', module, message, data)
      console.warn(`%c${prefix}`, 'color: #faad14', message, data || '')
    }
  },

  error(module, message, error = null) {
    if (currentLevel <= LOG_LEVELS.ERROR) {
      const { prefix } = formatMessage('ERROR', module, message, error)
      console.error(`%c${prefix}`, 'color: #ff4d4f', message, error || '')
    }
  }
}

export default logger
