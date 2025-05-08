import { createApp } from 'vue'
import TestPage from './TestPage.vue'
import './styles/index.css'
import App from './App.vue'
import Aries from '@lefit/aries-ui'

// 创建应用实例
const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('[Vue渲染器] 错误:', err)
  console.error(`信息: ${info}`)
}

app.use(Aries)

// 挂载应用
app.mount('#app')

console.log('[Vue渲染器] 启动完成 🚀')
