# Aries UI 组件渲染器

Vue3组件渲染器，用于在iframe中渲染和测试Aries UI组件。

## 🎯 功能特性

- 支持单文件组件渲染
- **新增：支持多文件组件渲染**
- **新增：虚拟文件系统**
- **新增：路径解析和依赖分析**
- **新增：组件缓存和性能优化**
- 自动注册Aries UI组件
- 错误处理和友好提示

## 🚀 快速开始

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

访问测试页面：

```
http://localhost:5173/test.html
```

## 💻 使用方法

### 单文件组件（旧版API，保持向后兼容）

```javascript
// 通过postMessage发送组件代码
window.frames[0].postMessage({
  type: 'artifacts',
  data: {
    files: {
      'component.vue': `
        <template>
          <a-button type="primary">测试按钮</a-button>
        </template>
      `
    },
    entryFile: 'component.vue'
  }
}, '*');
```

### 多文件组件（新版API）

```javascript
// 通过postMessage发送多个组件文件
window.frames[0].postMessage({
  type: 'artifacts',
  data: {
    files: {
      '/App.vue': `
        <template>
          <div>
            <h1>{{ title }}</h1>
            <HelloWorld />
          </div>
        </template>
        <script>
        import HelloWorld from './components/HelloWorld.vue';
        
        export default {
          components: { HelloWorld },
          data() {
            return {
              title: '多文件组件示例'
            }
          }
        }
        </script>
      `,
      '/components/HelloWorld.vue': `
        <template>
          <div>
            <a-button type="primary">测试按钮</a-button>
          </div>
        </template>
      `
    },
    entryFile: '/App.vue'
  }
}, '*');
```

## 🔄 架构改进

最新版本引入了重大架构改进：

1. **虚拟文件系统**: 在内存中模拟文件系统，支持多文件组件
2. **路径解析器**: 处理相对路径、绝对路径和别名路径
3. **依赖分析器**: 自动识别和处理组件间的依赖关系
4. **模块缓存**: 缓存已编译的组件，提高渲染性能
5. **更好的错误处理**: 详细的错误信息和堆栈跟踪

查看 `src/core/README.md` 获取更多核心模块使用信息。

## 📄 API参考

### `createComponentFromString(componentString)`

旧版API，将单个组件字符串渲染到容器中。

### `createComponentFromFiles(files, entryPath)`

新版API，将多个文件作为一个组件树渲染到容器中。

- `files`: 文件内容映射 `{路径: 内容}`
- `entryPath`: 入口文件路径（默认为 '/App.vue'）

## 🛠️ 开发

### 构建项目

```bash
npm run build
```

### 本地测试

```bash
npm run test
```
