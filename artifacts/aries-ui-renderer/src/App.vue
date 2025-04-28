<template>
  <div id="artifacts-container"></div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue"
import { createComponentFromString, createComponentFromFiles } from "./utils"

export default {
  name: "AriesUIRenderer",
  setup() {
    const codeContent = ref("")
    const key = ref(0)

    const handleMessage = event => {
      // 检查消息来源
      const { type, data } = event.data

      if (type === "artifacts") {
        console.log("接收到渲染请求:", data)

        // 检查是否是多文件模式
        if (data.files && Object.keys(data.files).length > 0) {
          const fileKeys = Object.keys(data.files)
          console.log(
            "接收到多文件渲染请求:",
            fileKeys.length,
            "个文件,",
            "文件列表:",
            fileKeys,
            "入口文件:",
            data.entryFile,
          )

          try {
            // 使用新API渲染多文件组件
            createComponentFromFiles(data.files, data.entryFile || "/App.vue")
          } catch (error) {
            console.error("多文件组件渲染失败:", error)
            // 向父窗口发送错误消息
            window.parent.postMessage(
              {
                type: "artifacts-error",
                errorMessage: `多文件组件渲染失败: ${
                  error.message || String(error)
                }`,
              },
              "*",
            )
          }
        } else if (data.code) {
          // 兼容旧版单文件模式
          console.log("接收到单文件渲染请求(code格式)")
          codeContent.value = data.code
          try {
            createComponentFromString(codeContent.value)
          } catch (error) {
            console.error("单文件组件渲染失败:", error)
            window.parent.postMessage(
              {
                type: "artifacts-error",
                errorMessage: `单文件组件渲染失败: ${
                  error.message || String(error)
                }`,
              },
              "*",
            )
          }
        } else if (data.files && data.entryFile) {
          // 旧版单文件格式，但使用files字段
          console.log(
            "接收到单文件渲染请求(files格式)，入口文件:",
            data.entryFile,
          )

          try {
            codeContent.value = data.files[data.entryFile]
            console.log("文件内容长度:", codeContent.value.length)
            createComponentFromString(codeContent.value)
          } catch (error) {
            console.error("单文件组件渲染失败:", error)
            window.parent.postMessage(
              {
                type: "artifacts-error",
                errorMessage: `单文件组件渲染失败: ${
                  error.message || String(error)
                }`,
              },
              "*",
            )
          }
        }

        key.value += 1 // 更新key强制重新挂载
      }
    }

    onMounted(() => {
      console.log("AriesUIRenderer 组件已挂载")
      window.addEventListener("message", handleMessage)
      // 通知父窗口iframe已加载完成
      window.parent.postMessage("IFRAME_LOADED", "*")
    })

    onUnmounted(() => {
      window.removeEventListener("message", handleMessage)
    })

    return {
      codeContent,
      key,
    }
  },
}
</script>
