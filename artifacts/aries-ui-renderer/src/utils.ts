import { createApp, defineComponent, h } from "vue/dist/vue.esm-bundler.js"

import * as Vue from "vue/dist/vue.esm-bundler.js"
import Aries from "@lefit/aries-ui"
import * as AriesIcons from "@lefit/aries-ui-icon"
import * as dayjs from "dayjs"
import ErrorDisplay from "./components/ErrorDisplay.vue"

// 引入新的组件渲染器
import { componentRenderer } from "./core/component-renderer"
import { virtualFs } from "./core/virtual-fs"

const mockModules: Record<string, any> = {
  vue: Vue,
  "@lefit/aries-ui": Aries,
  "@lefit/aries-ui-icon": AriesIcons,
  dayjs: dayjs,
}

// 添加错误处理和成功处理函数
const handleError = (errorMessage: string) => {
  window.parent.postMessage(
    {
      type: "artifacts-error",
      errorMessage,
    },
    "*",
  )
}

const handleSuccess = () => {
  window.parent.postMessage(
    {
      type: "artifacts-success",
    },
    "*",
  )
}

/**
 * 创建组件 - 向后兼容的旧版API
 * @param componentString 组件代码字符串
 * @deprecated 请使用新的createComponentFromFiles函数
 */
export function createComponentFromString(componentString: string) {
  const templateMatch = componentString.match(/<template>([\s\S]*)<\/template>/)
  const scriptMatch = componentString.match(/<script>([\s\S]*)<\/script>/)
  const styleMatch = componentString.match(/<style scoped>([\s\S]*)<\/style>/)

  const template = templateMatch ? templateMatch[1].trim() : ""
  let scriptContent = scriptMatch
    ? scriptMatch[1].trim()
    : "exports.default = {}"
  const style = styleMatch ? styleMatch[1].trim() : ""

  const imports: Record<string, string[]> = {}
  // 提取所有的导入语句
  scriptContent = scriptContent.replace(
    /import\s+(\{[^}]+\}|\w+)\s+from\s+['"]([^'"]+)['"]/g,
    (match, importNames, moduleName) => {
      imports[moduleName] = importNames
        .replace(/[{}]/g, "")
        .split(",")
        .map((name: string) => name.trim())
      return ""
    },
  )

  // 将 export default 转换为 exports.default =
  scriptContent = scriptContent.replace(
    /export\s+default\s*(\{[\s\S]*\}|[^{;\n]+)/,
    (match, exportedContent) => `exports.default = ${exportedContent}`,
  )

  let componentOptions = {}
  try {
    const mockImports = Object.entries(imports).reduce(
      (acc: Record<string, any>, [moduleName, importNames]) => {
        const moduleExports = mockModules[moduleName] || {}
        importNames.forEach(name => {
          if (name === "default") {
            acc[moduleName] = moduleExports
          } else {
            acc[name] = moduleExports[name]
          }
        })
        return acc
      },
      {},
    )

    const scriptFunction = new Function(
      ...Object.keys(mockImports),
      `
      const exports = {};
      ${scriptContent}
      return exports.default || {};
    `,
    )
    componentOptions = scriptFunction(...Object.values(mockImports))
  } catch (error) {
    console.error("Error parsing script:", error)
    const errorMessage = `Error parsing script: ${error}`
    handleError(errorMessage)
    const app = createApp({
      render() {
        return h(ErrorDisplay, { errorMessage })
      },
    })
    const container = document.getElementById("artifacts-container")
    if (container) {
      container.innerHTML = ""
      app.mount(container)
    }
    return null
  }

  // 使用 defineComponent 来创建组件
  const component = defineComponent({
    ...componentOptions,
    template: template,
  })

  // 创建一个渲染函数
  const renderComponent = () => {
    try {
      // 清空容器内容
      const container = document.getElementById("artifacts-container")
      if (container) {
        container.innerHTML = ""
      }

      // 创建新的应用实例
      const app = createApp(component)

      // 注册Aries UI
      app.use(Aries)

      // 注册图标组件
      for (const [key, iconComponent] of Object.entries(AriesIcons)) {
        app.component(key, iconComponent)
      }

      if (container) {
        app.mount(container)
        // 延迟一下再发送成功消息，确保渲染完成
        setTimeout(() => {
          handleSuccess()
        }, 100)
      }
      return null
    } catch (error) {
      console.error("Error rendering component:", error)
      const errorMessage = `Error rendering component: ${error}`
      handleError(errorMessage)
      const app = createApp({
        render() {
          return h(ErrorDisplay, { errorMessage })
        },
      })
      const container = document.getElementById("artifacts-container")
      if (container) {
        container.innerHTML = ""
        app.mount(container)
      }
    }
  }

  if (style) {
    // 先移除已有的 artifacts-style 标签
    const existingStyle = document.querySelector("[data-artifacts-style]")
    if (existingStyle) {
      document.head.removeChild(existingStyle)
    }
    const styleElement = document.createElement("style")
    styleElement.textContent = style
    // 添加特殊的属性，用于标识是 artifacts 的 style
    styleElement.setAttribute("data-artifacts-style", "true")
    document.head.appendChild(styleElement)
  }

  renderComponent()
}

/**
 * 从多个文件创建组件（新版API）
 * @param files 文件内容映射 {路径: 内容}
 * @param entryPath 入口文件路径（默认为/App.vue）
 */
export function createComponentFromFiles(
  files: Record<string, string>,
  entryPath: string = "/App.vue"
) {
  try {
    console.log(`[createComponentFromFiles] 开始渲染多文件组件，入口文件: ${entryPath}`);
    console.log(`[createComponentFromFiles] 文件列表: ${Object.keys(files).join(', ')}`);

    // 确保入口路径格式一致 (以斜杠开头)
    if (!entryPath.startsWith('/')) {
      entryPath = '/' + entryPath;
      console.log(`[createComponentFromFiles] 规范化入口路径: ${entryPath}`);
    }

    // 检查文件是否提供
    if (!files || Object.keys(files).length === 0) {
      console.error("[createComponentFromFiles] 未提供任何文件");
      throw new Error("未提供任何文件");
    }

    // 检查入口文件是否存在
    if (!files[entryPath]) {
      console.error(`[createComponentFromFiles] 入口文件不存在: ${entryPath}`);
      console.log(`[createComponentFromFiles] 可用文件: ${Object.keys(files).join(', ')}`);

      // 尝试无斜杠版本
      const entryPathWithoutSlash = entryPath.replace(/^\//, '');
      if (files[entryPathWithoutSlash]) {
        console.log(`[createComponentFromFiles] 找到无斜杠版本的入口文件: ${entryPathWithoutSlash}`);
        // 创建规范化版本的文件映射
        const normalizedFiles: Record<string, string> = {};
        for (const [path, content] of Object.entries(files)) {
          const normalizedPath = path.startsWith('/') ? path : '/' + path;
          normalizedFiles[normalizedPath] = content;
          console.log(`[createComponentFromFiles] 规范化路径: ${path} -> ${normalizedPath}`);
        }

        console.log(`[createComponentFromFiles] 使用规范化的文件继续渲染`);
        return createComponentFromFiles(normalizedFiles, entryPath);
      }

      // 如果只有一个文件且没指定入口，将其视为App.vue
      if (Object.keys(files).length === 1) {
        const singleFilePath = Object.keys(files)[0];
        const content = files[singleFilePath];
        console.log(`[createComponentFromFiles] 只有一个文件: ${singleFilePath}，尝试兼容模式`);

        // 单文件模式兼容旧版API
        if (singleFilePath.endsWith('.vue') || content.includes('<template>')) {
          console.log('[createComponentFromFiles] 单文件模式，使用旧API进行兼容');
          return createComponentFromString(content);
        }
      }

      throw new Error(`入口文件 ${entryPath} 不存在`);
    }

    console.log(`[createComponentFromFiles] 开始加载文件到虚拟文件系统...`);
    // 加载所有文件到虚拟文件系统
    componentRenderer.loadFiles(files);

    console.log(`[createComponentFromFiles] 开始渲染组件...`);
    // 渲染组件
    componentRenderer.render({
      containerId: 'artifacts-container',
      entryPath,
      onSuccess: () => {
        console.log("[createComponentFromFiles] 渲染成功");
        handleSuccess();
      },
      onError: (errorMsg) => {
        console.error("[createComponentFromFiles] 渲染失败:", errorMsg);
        handleError(errorMsg);
      }
    });

    return null;
  } catch (error) {
    console.error("[createComponentFromFiles] 渲染组件失败:", error);
    const errorMessage = `渲染组件失败: ${error instanceof Error ? error.message : String(error)}`;
    handleError(errorMessage);

    // 显示错误
    const container = document.getElementById("artifacts-container");
    if (container) {
      container.innerHTML = "";
      const app = createApp({
        render() {
          return h(ErrorDisplay, { errorMessage });
        },
      });
      app.mount(container);
    }

    return null;
  }
}

/**
 * 导出虚拟文件系统中所有文件内容，返回 { '/App.vue': '...', ... }
 */
export function exportVirtualFsFiles(): Record<string, string> {
  const result: Record<string, string> = {};

  function traverse(dir: any, currentPath: string) {
    for (const key in dir) {
      const item = dir[key];
      const path = currentPath + '/' + key;
      if (item && typeof item === 'object' && 'content' in item) {
        result[path] = item.content;
      } else if (item && typeof item === 'object') {
        traverse(item, path);
      }
    }
  }

  // 访问 virtualFs 的私有 root 属性
  // @ts-ignore
  traverse(virtualFs.root, '');
  return result;
}
