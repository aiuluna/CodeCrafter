import { useStore, File } from '@vue/repl'
import { ref, computed, Ref } from 'vue'

// 样式文件路径
const nutUIStyleUrl = 'https://fastly.jsdelivr.net/npm/@nutui/nutui@latest/dist/style.css'
const ariesUIStyleUrl = 'https://res.leoao.com/14240/merchant/test/903efa194f1c579d.css'

// 使用哪个UI库，可以配置
const uiLibrary = ref('ariesui') // 'nutui' 或 'ariesui'

// 默认的App.vue文件代码
const defaultAppCode = `
<script setup>
import Counter from './Counter.vue'
import AppButton from './Button.vue'
</script>

<template>
  <div class="app">
    <h1>多文件组件示例</h1>
    <Counter />
    <div class="buttons">
      <AppButton color="primary">主要按钮</AppButton>
      <AppButton color="warning">警告按钮</AppButton>
    </div>
  </div>
</template>

<style>
.app {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
.buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
`

// 计数器组件代码
const counterComponentCode = `
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
const decrement = () => count.value = Math.max(0, count.value - 1)
</script>

<template>
  <div class="counter">
    <h2>计数器组件</h2>
    <div class="counter-display">
      当前计数: <span class="count">{{ count }}</span>
    </div>
    <div class="counter-actions">
      <button class="counter-button decrement" @click="decrement">-</button>
      <button class="counter-button increment" @click="increment">+</button>
    </div>
  </div>
</template>

<style>
.counter {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
}
.counter-display {
  font-size: 18px;
  margin: 10px 0;
}
.count {
  font-weight: bold;
  color: #2c3e50;
}
.counter-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.counter-button {
  width: 40px;
  height: 40px;
  font-size: 18px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.increment {
  background-color: #4caf50;
  color: white;
}
.decrement {
  background-color: #f44336;
  color: white;
}
</style>
`

// 按钮组件代码
const buttonComponentCode = `
<script setup>
defineProps({
  color: {
    type: String,
    default: 'default'
  }
})
</script>

<template>
  <button class="app-button" :class="color">
    <slot></slot>
  </button>
</template>

<style>
.app-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s;
}
.app-button:hover {
  opacity: 0.8;
}
.app-button.primary {
  background-color: #1976d2;
  color: white;
}
.app-button.warning {
  background-color: #ff9800;
  color: white;
}
.app-button.default {
  background-color: #e0e0e0;
  color: #333;
}
</style>
`

// 主容器文件
const CONTAINER_FILE = 'Container_AriesUI.vue'
// 默认应用入口文件
const DEFAULT_APP_FILE = 'App.vue'
// 导入映射文件
const IMPORTMAP_FILE = 'import-map.json'

// NutUI容器组件代码
const generateNutUIContainerCode = (entryFile = DEFAULT_APP_FILE) => `
<script setup>
import App from './${entryFile}'
import '@nutui/touch-emulator'
import { getCurrentInstance } from 'vue'
import NutUI from '@nutui/nutui'

const instance = getCurrentInstance()
instance.appContext.app.use(NutUI)

// 添加样式
const style = document.createElement('style')
style.innerHTML = '* { margin: 0; padding: 0; }'
document.body.appendChild(style)

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = '${nutUIStyleUrl}'
document.body.appendChild(link)

// 添加 REM 适配
const setupRem = () => {
  const docEl = document.documentElement
  const resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    // 设置根字体大小
    docEl.style.fontSize = 50 * (docEl.clientWidth / 375) + 'px'
    setTimeout(function () {
      docEl.style.fontSize = 50 * (docEl.clientWidth / 375) + 'px'
    }, 200)
  }
  // 绑定浏览器缩放与加载事件
  window.addEventListener(resizeEvt, recalc, false)
  document.addEventListener('DOMContentLoaded', recalc, false)
  recalc()
}

// 执行REM适配
setupRem()
</script>

<template>
  <App />
</template>
`.trim()

// AriesUI容器组件代码
const generateAriesUIContainerCode = (entryFile = DEFAULT_APP_FILE) => `
<script setup>
import App from './${entryFile}'
import { getCurrentInstance } from 'vue'
import Aries from '@lefit/aries-ui'

const instance = getCurrentInstance()
instance.appContext.app.use(Aries)

// 添加样式
const style = document.createElement('style')
style.innerHTML = '* { margin: 0; padding: 0; }'
document.body.appendChild(style)

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = '${ariesUIStyleUrl}'
document.body.appendChild(link)

// 添加 REM 适配
const setupRem = () => {
  const docEl = document.documentElement
  const resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    // 设置根字体大小
    docEl.style.fontSize = 50 * (docEl.clientWidth / 375) + 'px'
    setTimeout(function () {
      docEl.style.fontSize = 50 * (docEl.clientWidth / 375) + 'px'
    }, 200)
  }
  // 绑定浏览器缩放与加载事件
  window.addEventListener(resizeEvt, recalc, false)
  document.addEventListener('DOMContentLoaded', recalc, false)
  recalc()
}

// 执行REM适配
setupRem()
</script>

<template>
  <App />
</template>
`.trim()

// 动态选择使用哪个UI库的容器代码
const generateContainerCode = (entryFile = DEFAULT_APP_FILE) => {
  return uiLibrary.value === 'nutui'
    ? generateNutUIContainerCode(entryFile)
    : generateAriesUIContainerCode(entryFile)
}

// 默认容器代码
const containerCode = generateContainerCode()

// URL编码/解码工具函数
const utoa = (data: string): string => {
  return btoa(unescape(encodeURIComponent(data)))
}

const atou = (b64: string): string => {
  return decodeURIComponent(escape(atob(b64)))
}

/**
 * 获取特定UI库需要的导入映射
 * 仅用于生成导入配置，不直接修改store
 */
export function getUILibraryImports(library = 'nutui', version = 'latest') {
  if (library === 'nutui') {
    return {
      '@nutui/nutui': `https://fastly.jsdelivr.net/npm/@nutui/nutui@${version}/dist/nutui.js`,
      '@nutui/icons-vue': 'https://fastly.jsdelivr.net/npm/@nutui/icons-vue@latest/dist/lib/index.mjs',
      '@nutui/touch-emulator': 'https://fastly.jsdelivr.net/npm/@nutui/touch-emulator',
      // 兼容函数式组件样式导入
      '@nutui/nutui/dist/packages/toast/style': './style.js',
      '@nutui/nutui/dist/packages/dialog/style': './style.js',
      '@nutui/nutui/dist/packages/imagepreview/style': './style.js',
      '@nutui/nutui/dist/packages/notify/style': './style.js'
    }
  } else {
    return {
      '@lefit/aries-ui': 'https://res.leoao.com/14240/merchant/test/dfc6da9d3e879ebf.js'
    }
  }
}

/**
 * 从消息中提取文件和入口文件
 */
function parseMessageData(data: any) {
  let filesData: any = null
  let entryFile: string | null = null

  // 处理可能的嵌套结构
  if (data.files) {
    // 直接结构：{ files: {...}, entryFile: '...' }
    filesData = data.files
    entryFile = data.entryFile
  } else if (data.data && data.data.files) {
    // 嵌套结构：{ data: { files: {...}, entryFile: '...' } }
    filesData = data.data.files
    entryFile = data.data.entryFile
  } else if (typeof data === 'object') {
    // 可能直接是files对象
    filesData = data
  }

  // 查找entryFile（可能在多处定义）
  if (!entryFile) {
    if (data.entryFile) {
      entryFile = data.entryFile
    } else if (data.entry) {
      // 处理 entry: 'App.vue' 或 entry: [{},entryFile:'App.vue']
      if (typeof data.entry === 'string') {
        entryFile = data.entry
      } else if (Array.isArray(data.entry) && data.entry.length > 0) {
        // 处理 entry: [{ entryFile: 'App.vue' }]
        const entryObj = data.entry[0]
        if (entryObj && entryObj.entryFile) {
          entryFile = entryObj.entryFile
        }
      } else if (data.entry && data.entry.entryFile) {
        entryFile = data.entry.entryFile
      }
    }
  }

  // 处理特殊情况，数组格式的files
  if (!filesData && data.files && Array.isArray(data.files)) {
    const mergedFiles: Record<string, string> = {}
    data.files.forEach((fileObj: any) => {
      const fileName = Object.keys(fileObj)[0]
      if (fileName) {
        mergedFiles[fileName] = fileObj[fileName]
      }
    })
    filesData = mergedFiles
  }

  return { filesData, entryFile }
}

/**
 * 处理消息并更新store
 */
function handleMessage(event: MessageEvent, store: any, setEntryFile: (file: string) => void) {
  try {
    const { type, data } = event.data
    if (type !== 'artifacts') return false

    console.log("收到消息，正在处理...", data)

    // 解析文件和入口文件
    const { filesData, entryFile } = parseMessageData(data)

    // 更新入口文件
    let currentEntryFile = DEFAULT_APP_FILE
    if (entryFile) {
      currentEntryFile = entryFile
      setEntryFile(entryFile)
      console.log("设置入口文件:", entryFile)
    }

    // 如果找到了文件数据
    if (filesData && typeof filesData === 'object') {
      // 生成容器代码
      const dynamicContainerCode = generateContainerCode(currentEntryFile)

      // 设置文件
      store.setFiles(
        {
          [CONTAINER_FILE]: dynamicContainerCode,
          ...filesData,
        },
        CONTAINER_FILE
      )

      // 激活入口文件
      store.setActive(currentEntryFile)

      console.log("文件内容设置成功")
      return true
    } else {
      console.warn("未找到有效的文件数据")
      return false
    }
  } catch (error) {
    console.error("处理消息时出错:", error)
    return false
  }
}

/**
 * 创建并初始化Store
 */
export function setupStore(options: any, hash: string) {
  // 当前入口文件
  const currentEntryFile = ref(DEFAULT_APP_FILE)

  // 使用repl的useStore创建store
  const store = useStore({
    ...options,
    sfcOptions: {
      script: {
        reactivityTransform: true
      },
      style: {
        preprocessorLang: 'less'
      },
      compiler: {
        typescript: true
      }
    }
  }, hash || undefined)

  // 如果有新文件，添加默认多文件示例
  if (Object.keys(store.files).length === 0) {
    // 添加主应用文件
    store.addFile(new File(DEFAULT_APP_FILE, defaultAppCode))

    // 添加组件文件
    store.addFile(new File('Counter.vue', counterComponentCode))
    store.addFile(new File('Button.vue', buttonComponentCode))

    // 设置容器文件
    const containerCode = generateContainerCode(DEFAULT_APP_FILE)
    store.addFile(new File(CONTAINER_FILE, containerCode, true))

    // 设置主文件和激活文件
    store.mainFile = CONTAINER_FILE
    store.setActive(DEFAULT_APP_FILE)
  }

  // 消息处理函数
  const processMessage = (event: MessageEvent) => {
    return handleMessage(event, store, (file) => {
      currentEntryFile.value = file
    })
  }

  // 切换UI库
  const setUILibrary = (library: 'nutui' | 'ariesui', builtinImportMap?: Ref<any>) => {
    uiLibrary.value = library

    // 更新导入映射，如果提供了builtinImportMap则使用它
    if (builtinImportMap) {
      const imports = getUILibraryImports(library)
      builtinImportMap.value.imports = {
        ...builtinImportMap.value.imports,
        ...imports
      }
    }

    // 如果已有容器文件，更新它
    if (store.files[CONTAINER_FILE]) {
      const newContainerCode = generateContainerCode(currentEntryFile.value)
      store.addFile(new File(CONTAINER_FILE, newContainerCode, true))
    }
  }

  return {
    store,
    processMessage,
    setUILibrary,
    currentEntryFile
  }
}

export {
  generateContainerCode,
  containerCode,
  DEFAULT_APP_FILE
}
