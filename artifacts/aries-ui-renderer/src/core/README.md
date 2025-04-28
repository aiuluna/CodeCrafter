# 组件渲染器核心模块

本模块提供了虚拟文件系统、路径解析、依赖分析和组件渲染功能，用于支持多文件组件的渲染。

## 主要功能

- 虚拟文件系统：支持在内存中存储和管理多个文件
- 路径解析：处理相对路径、绝对路径和别名路径
- 依赖分析：自动分析并处理组件间的依赖关系
- 组件渲染：将多文件组件编译并渲染到DOM中

## 使用方法

### 基本用法

```typescript
import { createComponentFromFiles } from '../utils';

// 多文件组件示例
const files = {
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
      <div class="hello">
        <p>这是一个组件</p>
      </div>
    </template>
    <script>
    export default {
      name: 'HelloWorld'
    }
    </script>
    <style>
    .hello {
      color: green;
    }
    </style>
  `
};

// 渲染组件
createComponentFromFiles(files, '/App.vue');
```

### 高级用法

如果需要更精细的控制，可以直接使用核心API：

```typescript
import { 
  virtualFs, 
  pathResolver, 
  dependencyAnalyzer, 
  componentRenderer 
} from './core';

// 设置路径别名
pathResolver.setAliases({
  '@': '/src',
  '~': '/'
});

// 写入文件到虚拟文件系统
virtualFs.writeFile('/App.vue', '...');
virtualFs.writeFile('/components/Button.vue', '...');

// 分析依赖
const dependencies = dependencyAnalyzer.analyzeDependencies('/App.vue');
console.log('依赖列表:', dependencies);

// 检查循环依赖
const cycles = dependencyAnalyzer.detectCircularDependencies('/App.vue');
if (cycles.length > 0) {
  console.warn('检测到循环依赖:', cycles);
}

// 渲染组件
componentRenderer.render({
  containerId: 'app',
  entryPath: '/App.vue',
  onSuccess: () => console.log('渲染成功'),
  onError: (err) => console.error('渲染失败:', err)
});
```

## 特性

- 支持多文件组件
- 自动解析相对路径和别名
- 递归处理组件依赖
- 缓存已编译的组件以提高性能
- 自动检测循环依赖
- 提供详细的错误信息和堆栈跟踪
- 样式隔离，避免样式冲突 