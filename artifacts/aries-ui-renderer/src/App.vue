<template>
  <div class="aries-ui-renderer">
    <Sandbox :store="store" @keydown.ctrl.s.prevent @keydown.meta.s.prevent />
  </div>
</template>

<script setup>
import { Sandbox, useVueImportMap } from "@vue/repl"
import { ref, watchEffect, onMounted, onUnmounted } from "vue"
import { setupStore, getUILibraryImports } from "./store"

// 设置视口高度
const setVH = () => {
  document.documentElement.style.setProperty("--vh", window.innerHeight + "px")
}
window.addEventListener("resize", setVH)
setVH()

const {
  importMap: builtinImportMap,
  vueVersion,
  productionMode,
} = useVueImportMap({
  runtimeDev:
    "https://fastly.jsdelivr.net/npm/@vue/runtime-dom@3.5.13/dist/runtime-dom.esm-browser.js",
  runtimeProd:
    "https://fastly.jsdelivr.net/npm/@vue/runtime-dom@3.5.13/dist/runtime-dom.esm-browser.js",
  serverRenderer:
    "https://fastly.jsdelivr.net/npm/@vue/server-renderer@3.5.13/dist/server-renderer.esm-bundler.js",
})

// 从URL获取配置选项
const query = new URLSearchParams(location.search)
const hash = location.hash.slice(1)

// 获取当前UI库（默认为nutui）
const currentUILibrary = ref("ariesui")

// 合并导入映射
builtinImportMap.value.imports = {
  ...builtinImportMap.value.imports,
  ...getUILibraryImports(currentUILibrary.value),
}

// 创建自定义Store
const { store, processMessage, setUILibrary } = setupStore(
  {
    builtinImportMap,
    vueVersion,
  },
  hash,
)

// 启用SFC实验性功能和Less支持
// store.options = {
//   script: {
//     reactivityTransform: true,
//   },
//   compiler: {
//     typescript: true,
//   },
// }

// 设置UI库并传入importMap引用
watchEffect(() => {
  setUILibrary(currentUILibrary.value, builtinImportMap)
})

// 处理收到的消息
const handleMessage = event => {
  processMessage(event)
}

// 组件加载时自动设置初始代码
onMounted(() => {
  window.addEventListener("message", handleMessage)
  window.parent.postMessage("IFRAME_LOADED", "*")
})

onUnmounted(() => {
  window.removeEventListener("message", handleMessage)
})

// 持久化状态
watchEffect(() => history.replaceState({}, "", store.serialize()))

// 在控制台中暴露store以便调试
console.log("[Vue渲染器] 已初始化", store)
window.__VUE_RENDERER_STORE = store

// 导出给父组件使用
defineExpose({
  store,
  // 导出切换UI库的方法和当前使用的UI库
  setUILib: lib => {
    currentUILibrary.value = lib
  },
  currentUILibrary,
})
</script>

<style>
body {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  --base: #444;
}

.aries-ui-renderer {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.control-panel {
  padding: 10px;
  background: #f3f3f3;
  border-bottom: 1px solid #ddd;
}

.control-panel button {
  padding: 6px 12px;
  background: #3eaf7c;
  color: white;
  border-radius: 4px;
  font-size: 14px;
}

.vue-repl {
  height: calc(var(--vh) - 50px);
  flex: 1;
}

button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
}
</style>
