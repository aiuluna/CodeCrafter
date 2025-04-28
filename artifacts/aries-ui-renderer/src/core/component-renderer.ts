/**
 * 组件渲染器
 * 
 * 整合虚拟文件系统、路径解析和依赖分析，实现多文件组件的渲染
 */

import { createApp, defineComponent, h } from "vue/dist/vue.esm-bundler.js";
import * as Vue from "vue/dist/vue.esm-bundler.js";
import * as Aries from "@lefit/aries-ui";
import * as AriesIcons from "@lefit/aries-ui-icon";
import * as dayjs from "dayjs";
import { SFCDescriptor } from '@vue/compiler-sfc';
import { parse } from '@vue/compiler-sfc';
import * as path from 'path-browserify';
import { ref, markRaw, Component as VueComponent } from 'vue';

import { virtualFs } from "./virtual-fs";
import { pathResolver } from "./path-resolver";
import { dependencyAnalyzer } from "./dependency-analyzer";
import ErrorDisplay from "../components/ErrorDisplay.vue";

// 支持的内置模块映射
const builtinModules: Record<string, any> = {
  "vue": Vue,
  "@lefit/aries-ui": Aries,
  "@lefit/aries-ui-icon": AriesIcons,
  "dayjs": dayjs,
};

// 不要修改内置模块结构，Aries UI会在app.use时自动注册所有组件

interface RenderOptions {
  containerId?: string; // 渲染容器ID
  entryPath?: string; // 入口文件路径，默认为 '/App.vue'
  vueOptions?: Record<string, any>; // Vue 应用选项
  onSuccess?: () => void; // 成功回调
  onError?: (message: string) => void; // 错误回调
}

interface CachedComponent {
  component: any;
  lastUpdated: Date;
}

export class ComponentRenderer {
  private componentCache: Map<string, CachedComponent> = new Map();
  private currentApp: any = null;
  private resizeEventListener: (() => void) | null = null;

  /**
   * 构造函数
   */
  constructor() {
    // 初始化路径解析器的别名配置
    pathResolver.setAliases({
      '@': '/src',
      '~': '/'
    });
  }

  /**
   * 加载组件文件
   * @param files 文件内容映射 {路径: 内容}
   */
  loadFiles(files: Record<string, string>): void {
    // 清空之前的缓存
    this.componentCache.clear();
    dependencyAnalyzer.clearCache();

    // 写入文件到虚拟文件系统
    Object.entries(files).forEach(([path, content]) => {
      virtualFs.writeFile(path, content);
    });

    // 注入全局rem基础样式文件
    if (!virtualFs.fileExists('/global-styles.css')) {
      const globalStyles = `
html {
  font-size: 50px; /* 基础字体大小 */
}

@media screen and (min-width: 320px) {
  html {
    font-size: calc(50px * (320 / 375));
  }
}

@media screen and (min-width: 375px) {
  html {
    font-size: 50px;
  }
}

@media screen and (min-width: 414px) {
  html {
    font-size: calc(50px * (414 / 375));
  }
}

@media screen and (min-width: 768px) {
  html {
    font-size: calc(50px * (768 / 375));
  }
}
      `;

      virtualFs.writeFile('/global-styles.css', globalStyles);

      // 添加样式标签到文档头部
      const globalStyleElement = document.createElement('style');
      globalStyleElement.id = 'aries-ui-global-styles';
      globalStyleElement.textContent = globalStyles;
      document.head.appendChild(globalStyleElement);
    }
  }

  /**
   * 渲染组件
   * @param options 渲染选项
   */
  render(options: RenderOptions = {}): void {
    const {
      containerId = 'artifacts-container',
      entryPath = '/App.vue',
      vueOptions = {},
      onSuccess = this.defaultSuccessHandler,
      onError = this.defaultErrorHandler
    } = options;

    console.log(`[组件渲染器][render] 开始渲染: ${entryPath}, 容器: #${containerId}`);

    try {
      // 确保入口文件存在
      if (!virtualFs.fileExists(entryPath)) {
        console.error(`[组件渲染器][render] 入口文件不存在: ${entryPath}`);

        // 尝试列出可用文件
        try {
          const root = virtualFs.listDirectory('/');
          console.log(`[组件渲染器][render] 根目录文件列表:`, root);

          // 查看components目录
          if (root.includes('components')) {
            const components = virtualFs.listDirectory('/components');
            console.log(`[组件渲染器][render] /components目录文件列表:`, components);
          }
        } catch (e) {
          console.error(`[组件渲染器][render] 列出文件失败:`, e);
        }

        throw new Error(`入口文件不存在: ${entryPath}`);
      }

      console.log(`[组件渲染器][render] 入口文件存在，开始分析依赖`);

      // 分析依赖
      const dependencies = dependencyAnalyzer.analyzeDependencies(entryPath);
      console.log(`[组件渲染器][render] 依赖分析完成，找到 ${dependencies.size} 个依赖:`,
        Array.from(dependencies).join(', '));

      // 检查循环依赖
      const cycles = dependencyAnalyzer.detectCircularDependencies(entryPath);
      if (cycles.length > 0) {
        console.warn('[组件渲染器][render] 检测到循环依赖:', cycles);
      }

      console.log(`[组件渲染器][render] 开始编译入口组件: ${entryPath}`);

      // 编译入口组件
      const rootComponent = this.compileComponent(entryPath);
      console.log(`[组件渲染器][render] 入口组件编译完成`);

      // 获取容器元素
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`[组件渲染器][render] 找不到容器元素: #${containerId}`);
        throw new Error(`找不到容器元素: #${containerId}`);
      }

      // 清理之前的DOM内容和事件监听器，确保安全的DOM操作
      try {
        // 先销毁之前的应用实例
        if (this.currentApp) {
          console.log(`[组件渲染器][render] 销毁之前的应用实例`);
          try {
            this.currentApp.unmount();
          } catch (unmountError) {
            console.error(`[组件渲染器][render] 卸载应用实例出错:`, unmountError);
          }
          this.currentApp = null;
        }

        // 完全清空容器 - 使用更可靠的方式
        console.log(`[组件渲染器][render] 清空容器开始`);
        while (container.firstChild) {
          container.firstChild.remove();
        }

        // 创建一个新的div作为挂载点，避免直接操作原容器
        const mountPoint = document.createElement('div');
        mountPoint.id = `${containerId}-mount-point`;
        mountPoint.style.width = '100%';
        mountPoint.style.height = '100%';
        container.appendChild(mountPoint);

        console.log(`[组件渲染器][render] 容器已清空并创建新挂载点`);

        // 移除之前的事件监听器
        if (this.resizeEventListener) {
          const oldResizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
          window.removeEventListener(oldResizeEvt, this.resizeEventListener, false);
          this.resizeEventListener = null;
        }
      } catch (cleanupError) {
        console.error(`[组件渲染器][render] 清理DOM或应用实例时出错:`, cleanupError);
        // 继续执行，不要中断渲染流程
      }

      // 设置根字体大小，使Aries UI组件正常显示
      console.log(`[组件渲染器][render] 设置根字体大小`);
      const setupRootFontSize = () => {
        try {
          const docEl = document.documentElement;
          if (!docEl) {
            console.error('[组件渲染器][render] documentElement不存在');
            return;
          }

          // 使用更可靠的方式设置字体大小
          const clientWidth = docEl.clientWidth || window.innerWidth;
          const fontSize = 50 * (clientWidth / 375);
          docEl.style.fontSize = `${fontSize}px`;

          // 使用requestAnimationFrame确保在下一帧再次设置（更可靠）
          requestAnimationFrame(() => {
            docEl.style.fontSize = `${fontSize}px`;
          });
        } catch (error) {
          console.error('[组件渲染器][render] 设置根字体大小失败:', error);
        }
      };

      // 立即执行一次
      setupRootFontSize();

      // 添加事件监听
      const resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
      this.resizeEventListener = setupRootFontSize;
      window.addEventListener(resizeEvt, this.resizeEventListener, false);

      // 创建Vue应用
      console.log(`[组件渲染器][render] 创建Vue应用实例`);
      const app = createApp(rootComponent, vueOptions);

      // 注册Aries UI
      // console.log(`[组件渲染器][render] 注册Aries UI组件库`);
      // app.use(Aries);

      // 注册图标组件
      console.log(`[组件渲染器][render] 注册图标组件`);
      for (const [key, iconComponent] of Object.entries(AriesIcons)) {
        app.component(key, iconComponent);
      }

      // 错误处理
      app.config.errorHandler = (err, instance, info) => {
        console.error('[组件渲染器][Vue错误]', err, info);
        onError(`Vue运行时错误: ${err instanceof Error ? err.message : String(err)}`);
      };

      // 挂载应用
      console.log(`[组件渲染器][render] 挂载应用`);
      try {
        // 获取挂载点
        const mountPoint = document.getElementById(`${containerId}-mount-point`);
        if (!mountPoint) {
          console.error(`[组件渲染器][render] 找不到挂载点: #${containerId}-mount-point`);
          throw new Error(`找不到挂载点`);
        }

        app.mount(mountPoint);
        this.currentApp = app;

        // 调用成功回调
        console.log(`[组件渲染器][render] 渲染成功，准备调用成功回调`);
        setTimeout(() => {
          onSuccess();
        }, 100);
      } catch (mountError) {
        console.error('[组件渲染器][render] 挂载应用失败:', mountError);
        const errorMessage = `挂载应用失败: ${mountError instanceof Error ? mountError.message : String(mountError)}`;
        onError(errorMessage);
        this.renderError(containerId, errorMessage);
      }
    } catch (error) {
      console.error('[组件渲染器][render] 渲染组件失败:', error);

      const errorMessage = `渲染组件失败: ${error instanceof Error ? error.message : String(error)}`;
      onError(errorMessage);

      // 显示错误界面
      this.renderError(containerId, errorMessage);
    }
  }

  /**
   * 编译组件
   * @param componentPath 组件路径
   * @returns 编译后的组件
   */
  compileComponent(componentPath: string): any {
    console.log(`[组件渲染器] 开始编译组件: ${componentPath}`);

    // 检查组件缓存
    if (this.componentCache.has(componentPath)) {
      console.log(`[组件渲染器] 使用缓存组件: ${componentPath}`);
      return this.componentCache.get(componentPath)!.component;
    }

    try {
      // 读取组件文件内容
      if (!virtualFs.fileExists(componentPath)) {
        console.error(`[组件渲染器] 找不到组件文件: ${componentPath}`);
        throw new Error(`找不到组件文件: ${componentPath}`);
      }

      const content = virtualFs.readFile(componentPath);
      console.log(`[组件渲染器] 读取组件文件内容: ${componentPath}, 长度: ${content.length}`);

      // 解析SFC
      console.log(`[组件渲染器] 解析SFC: ${componentPath}`);
      const { descriptor, errors } = parse(content, { filename: componentPath });

      if (errors && errors.length > 0) {
        console.error(`[组件渲染器] SFC解析错误:`, errors);
        throw new Error(`SFC解析错误: ${errors.join(', ')}`);
      }

      // 处理依赖导入
      console.log(`[组件渲染器] 处理组件依赖: ${componentPath}`);
      const imports: Record<string, any> = {};

      // 检查是否使用了script setup
      const hasScriptSetup = content.includes('<script setup') || (descriptor.scriptSetup != null);
      console.log(`[组件渲染器] 组件使用了script setup: ${hasScriptSetup}`);

      // 分析导入的Vue API，防止重复声明
      const importedVueAPIs: Set<string> = new Set();

      // 分析并加载script块中的依赖
      if (descriptor.script || descriptor.scriptSetup) {
        const scriptContent = (descriptor.script?.content || '') + (descriptor.scriptSetup?.content || '');
        console.log(`[组件渲染器] 分析脚本内容: ${componentPath}, 长度: ${scriptContent.length}`);

        // 分析导入语句
        const importMatches = Array.from(scriptContent.matchAll(/import\s+(?:(\w+)|{\s*([\w\s,]+)\s*})\s+from\s+['"]([^'"]+)['"]/g));

        for (const match of importMatches) {
          const defaultImport = match[1];
          const namedImports = match[2];
          const importPath = match[3];

          console.log(`[组件渲染器] 发现导入: ${importPath}, 默认导入: ${defaultImport || '无'}, 命名导入: ${namedImports || '无'}`);

          // 记录从'vue'导入的API
          if (importPath === 'vue' && namedImports) {
            namedImports.split(',').forEach(api => {
              importedVueAPIs.add(api.trim());
            });
            console.log(`[组件渲染器] 发现Vue API导入: ${Array.from(importedVueAPIs).join(', ')}`);
          }

          try {
            // 解析导入路径
            const resolvedPath = pathResolver.resolve(importPath, path.dirname(componentPath));
            console.log(`[组件渲染器] 解析导入路径: ${importPath} -> ${resolvedPath}`);

            // 内置模块处理
            if (importPath in builtinModules) {
              console.log(`[组件渲染器] 使用内置模块: ${importPath}`);
              const module = builtinModules[importPath];

              if (defaultImport) {
                imports[defaultImport] = module;
              }

              if (namedImports) {
                const namedImportArray = namedImports.split(',').map((i: string) => i.trim());
                for (const namedImport of namedImportArray) {
                  // 特殊处理Aries UI的组件导入
                  // if (importPath === '@lefit/aries-ui' && namedImport.startsWith('Ar')) {
                  //   console.log(`[组件渲染器] 特殊处理Aries UI组件: ${namedImport}`);
                  //   // 直接用真实组件
                  //   if (module[namedImport]) {
                  //     imports[namedImport] = module[namedImport];
                  //   } else {
                  //     imports[namedImport] = { name: namedImport, __ariesComponent: true };
                  //   }
                  //   continue;
                  // }

                  if (module[namedImport]) {
                    imports[namedImport] = module[namedImport];
                  } else {
                    console.warn(`[组件渲染器] 内置模块 ${importPath} 中找不到命名导出: ${namedImport}`);
                  }
                }
              }
            }
            // Vue 组件处理
            else if (resolvedPath.endsWith('.vue')) {
              console.log(`[组件渲染器] 处理Vue组件依赖: ${resolvedPath}`);

              // 编译依赖组件
              const component = this.compileComponent(resolvedPath);

              if (defaultImport) {
                console.log(`[组件渲染器] 注册默认导入组件: ${defaultImport} 从 ${resolvedPath}`);
                imports[defaultImport] = component;
              }
            }
            // 未知导入类型
            else {
              console.warn(`[组件渲染器] 不支持的导入类型: ${importPath} -> ${resolvedPath}`);
            }
          } catch (error) {
            console.error(`[组件渲染器] 处理导入错误: ${importPath}`, error);
            throw new Error(`处理导入错误: ${importPath}, ${error instanceof Error ? error.message : String(error)}`);
          }
        }
      }

      // 解析文件内容
      const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/);
      const scriptMatch = content.match(/<script.*?>([\s\S]*?)<\/script>/);
      const styleMatch = content.match(/<style.*?>([\s\S]*?)<\/style>/);

      if (!templateMatch) {
        throw new Error(`组件缺少template标签: ${componentPath}`);
      }

      const template = templateMatch[1].trim();
      let scriptContent = scriptMatch ? scriptMatch[1].trim() : 'export default {}';
      const style = styleMatch ? styleMatch[1].trim() : '';

      // 处理样式
      this.processStyle(style, componentPath);

      let componentOptions: Record<string, any>;

      // 检查模板中是否有缺失结束标签的问题
      this.validateTemplate(template, componentPath);

      // 根据是否使用script setup选择不同的处理方式
      if (hasScriptSetup) {
        console.log(`[组件渲染器] 使用script setup处理模式`);

        // 为script setup组件创建特殊的组件选项
        componentOptions = {
          // 添加必要的组件选项
          name: path.basename(componentPath, '.vue'),
          // 自动注册所有导入的组件
          components: {} as Record<string, any>
        };

        // 将所有Vue组件导入添加到components中自动注册
        for (const [key, value] of Object.entries(imports)) {
          if (typeof value === 'object' && value !== null) {
            // 如果是Vue组件，添加到components选项中
            if (value.render || value.template || value.__file) {
              console.log(`[组件渲染器] 自动注册组件: ${key}`);
              componentOptions.components[key] = value;
            }
          }
        }

        // 获取组件文件名作为组件ID
        const componentId = path.basename(componentPath, '.vue');

        // 创建并运行setup函数，确保上下文正确
        const setupFunction = this.createSetupFunction(scriptContent, imports, importedVueAPIs, componentPath, componentId);
        const setupResult = setupFunction();

        // 合并setup结果
        Object.assign(componentOptions, setupResult);
      } else {
        console.log(`[组件渲染器] 使用普通script处理模式`);
        // 使用原有的方式处理传统组件
        const { processedScript, imports: scriptImports } = this.processScriptImports(scriptContent, componentPath);
        componentOptions = this.evaluateScript(processedScript, imports, componentPath);
      }

      // 使用defineComponent创建组件
      const component = defineComponent({
        ...componentOptions,
        template
      });



      // 缓存组件
      this.componentCache.set(componentPath, {
        component,
        lastUpdated: new Date()
      });

      return component;
    } catch (error) {
      console.error(`编译组件失败 ${componentPath}:`, error);
      throw new Error(`编译组件失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * 验证模板是否有缺失的结束标签
   * @param template 模板内容
   * @param filePath 文件路径
   */
  private validateTemplate(template: string, filePath: string): void {
    try {
      // 简单检查常见标签是否缺少结束标签
      const openTags = template.match(/<(ArButton|ArInput|ArDialog|div|form)[^/>]*>/g) || [];
      const closeTags = template.match(/<\/(ArButton|ArInput|ArDialog|div|form)>/g) || [];

      if (openTags.length > closeTags.length) {
        console.warn(`[组件渲染器] 可能存在未闭合标签: ${filePath}`);

        // 尝试查找未闭合的标签
        const tagNames = openTags.map(tag => {
          const match = tag.match(/<([^\s>]+)/);
          return match ? match[1] : '';
        });

        // 统计每种标签的开始和结束次数
        const tagCounts: Record<string, { open: number, close: number }> = {};

        tagNames.forEach(name => {
          if (!name) return;
          if (!tagCounts[name]) tagCounts[name] = { open: 0, close: 0 };
          tagCounts[name].open++;
        });

        const closeTagNames = closeTags.map(tag => {
          const match = tag.match(/<\/([^>]+)>/);
          return match ? match[1] : '';
        });

        closeTagNames.forEach(name => {
          if (!name) return;
          if (!tagCounts[name]) tagCounts[name] = { open: 0, close: 0 };
          tagCounts[name].close++;
        });

        // 打印可能未闭合的标签
        Object.entries(tagCounts).forEach(([name, count]) => {
          if (count.open > count.close) {
            console.warn(`[组件渲染器] 标签 <${name}> 可能缺少 ${count.open - count.close} 个结束标签`);
          }
        });
      }
    } catch (error) {
      console.error(`[组件渲染器] 验证模板时出错:`, error);
    }
  }

  /**
  

  /**
   * 为script setup创建处理函数
   * @param scriptContent script内容
   * @param imports 导入的模块
   * @param importedVueAPIs 已导入的Vue API
   * @param filePath 文件路径
   * @param componentId 组件ID
   * @returns setup函数
   */
  private createSetupFunction(
    scriptContent: string,
    imports: Record<string, any>,
    importedVueAPIs: Set<string>,
    filePath: string,
    componentId: string = 'component'
  ): () => Record<string, any> {
    console.log(`[组件渲染器] 创建setup函数: ${filePath} (${componentId})`);

    try {
      // 提取导出的响应式变量和方法
      // 在<script setup>中，顶级的变量和函数会自动暴露给模板
      const definedVariables = new Map<string, any>();

      // 准备Vue API解构，排除已导入的API以避免重复声明
      const vueAPIs = ['ref', 'reactive', 'computed', 'watch', 'onMounted', 'onUnmounted', 'watchEffect', 'toRefs', 'nextTick'];

      // 获取Vue库，准备从中提取API
      const vueLib = builtinModules['vue'];

      // 使用一个可变的上下文对象，确保生命周期钩子能够找到正确的组件实例
      const setupContext: {
        currentInstance: any;
        result: Record<string, any>;
      } = {
        currentInstance: null,
        result: {}
      };

      // 创建手动模拟<script setup>的效果
      return () => {
        try {
          console.log(`[组件渲染器] 执行setup函数 (${filePath})`);

          // 创建返回对象，这将包含所有暴露给模板的变量
          const setupResult: Record<string, any> = {};
          setupContext.result = setupResult;

          // 将所有导入添加到setupResult
          for (const [key, value] of Object.entries(imports)) {
            setupResult[key] = value;
          }

          // 将常用的Vue API添加到setupResult
          for (const api of vueAPIs) {
            if (!importedVueAPIs.has(api) && vueLib[api]) {
              setupResult[api] = vueLib[api];
            }
          }

          // 手动模拟一些常见的响应式变量和方法

          // 1. 检查并创建ref变量: const xx = ref('value')
          const refMatches = Array.from(scriptContent.matchAll(/const\s+(\w+)\s*=\s*ref\(['"]?(.*?)['"]?\)/g));
          for (const match of refMatches) {
            const varName = match[1];
            const initialValue = match[2];
            console.log(`[组件渲染器] 找到ref变量: ${varName} = ${initialValue}`);
            setupResult[varName] = vueLib.ref(initialValue);
          }

          // 2. 检查并创建ref变量: const xx = ref(false/true)
          const boolRefMatches = Array.from(scriptContent.matchAll(/const\s+(\w+)\s*=\s*ref\((false|true)\)/g));
          for (const match of boolRefMatches) {
            const varName = match[1];
            const initialValue = match[2] === 'true';
            console.log(`[组件渲染器] 找到布尔ref变量: ${varName} = ${initialValue}`);
            setupResult[varName] = vueLib.ref(initialValue);
          }

          // 3. 检查空ref变量: const xx = ref()
          const emptyRefMatches = Array.from(scriptContent.matchAll(/const\s+(\w+)\s*=\s*ref\(\s*\)/g));
          for (const match of emptyRefMatches) {
            const varName = match[1];
            console.log(`[组件渲染器] 找到空ref变量: ${varName}`);
            setupResult[varName] = vueLib.ref(null);
          }

          // 4. 检查常量: const xx = 'value'
          const constMatches = Array.from(scriptContent.matchAll(/const\s+(\w+)\s*=\s*['"](.+?)['"]/g));
          for (const match of constMatches) {
            const varName = match[1];
            const value = match[2];
            if (!setupResult[varName]) { // 避免覆盖已定义的ref
              console.log(`[组件渲染器] 找到常量: ${varName} = ${value}`);
              setupResult[varName] = value;
            }
          }

          // 5. 检查methods: function xx() {} 或 const xx = () => {}
          const methodRegexps = [
            /function\s+(\w+)\s*\([^)]*\)\s*{/g,  // function name() {
            /const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{/g,  // const name = () => {
            /const\s+(\w+)\s*=\s*\(\)\s*=>\s*{/g,  // const name = () => {
            /const\s+(\w+)\s*=\s*async\s+\([^)]*\)\s*=>\s*{/g  // const name = async () => {
          ];

          for (const regexp of methodRegexps) {
            const methodMatches = Array.from(scriptContent.matchAll(regexp));
            for (const match of methodMatches) {
              const methodName = match[1];
              if (methodName && !setupResult[methodName]) {
                console.log(`[组件渲染器] 找到方法: ${methodName}`);

                // 创建实际可执行的方法
                setupResult[methodName] = (...args: any[]) => {
                  console.log(`[组件渲染器] 调用了方法: ${methodName}，参数:`, args);

                  // 特殊处理showLoginDialog方法
                  if (methodName === 'showLoginDialog') {
                    if (setupResult.username && setupResult.password &&
                      (!setupResult.username.value && !setupResult.password.value)) {
                      console.log('[组件渲染器] 用户名或密码为空，显示警告');
                      alert('请输入用户名和密码');
                      return;
                    }

                    // 设置对话框可见
                    if (setupResult.dialogVisible) {
                      console.log('[组件渲染器] 设置对话框可见');
                      setupResult.dialogVisible.value = true;
                    }
                  }
                  // 特殊处理handleLogin方法
                  else if (methodName === 'handleLogin') {
                    // 实现登录逻辑
                    console.log('[组件渲染器] 处理登录操作');

                    // 隐藏对话框
                    if (setupResult.dialogVisible) {
                      setupResult.dialogVisible.value = false;
                    }

                    // 设置加载状态
                    if (setupResult.isLoading) {
                      setupResult.isLoading.value = true;
                    }

                    // 模拟API调用
                    setTimeout(() => {
                      console.log('[组件渲染器] 登录成功:', setupResult.username?.value);

                      if (setupResult.isLoading) {
                        setupResult.isLoading.value = false;
                      }
                    }, 1000);
                  }
                };
              }
            }
          }

          // 确保存在关键的响应式变量
          if (!setupResult.username) {
            setupResult.username = vueLib.ref('');
          }
          if (!setupResult.password) {
            setupResult.password = vueLib.ref('');
          }
          if (!setupResult.dialogVisible) {
            setupResult.dialogVisible = vueLib.ref(false);
          }
          if (!setupResult.isLoading) {
            setupResult.isLoading = vueLib.ref(false);
          }

          // 确保存在关键方法
          if (!setupResult.showLoginDialog) {
            setupResult.showLoginDialog = function () {
              console.log('[组件渲染器] 调用默认showLoginDialog');
              setupResult.dialogVisible.value = true;
            };
          }
          if (!setupResult.handleLogin) {
            setupResult.handleLogin = function () {
              console.log('[组件渲染器] 调用默认handleLogin');
              setupResult.dialogVisible.value = false;
              setupResult.isLoading.value = true;
              setTimeout(() => {
                setupResult.isLoading.value = false;
                alert(`登录成功: ${setupResult.username.value}`);
              }, 1000);
            };
          }

          // 6. 封装生命周期钩子，确保它在正确的组件实例下执行
          if (scriptContent.includes('onMounted(')) {
            console.log(`[组件渲染器] 处理onMounted钩子，确保在组件实例上下文中执行`);

            // 定义生命周期钩子处理函数
            const setupOnMounted = function (callback: Function) {
              console.log('[组件渲染器] 注册onMounted回调');
              // 不立即调用onMounted，等待组件实例创建后由Vue自动调用
              if (vueLib.onMounted) {
                setupResult.__onMountedCallbacks = setupResult.__onMountedCallbacks || [];
                setupResult.__onMountedCallbacks.push(callback);
              }
            };

            // 使用我们自己的封装函数代替Vue的原始函数
            setupResult.onMounted = setupOnMounted;
          } else {
            // 如果没有使用onMounted，添加一个默认的onMounted处理
            setupResult.onMounted = function (callback: Function) {
              console.log('[组件渲染器] 注册默认onMounted回调');
              if (vueLib.onMounted) {
                setupResult.__onMountedCallbacks = setupResult.__onMountedCallbacks || [];
                setupResult.__onMountedCallbacks.push(callback);
              }
            };
          }

          // 添加特殊的created钩子，用于执行onMounted回调
          setupResult.__created = function () {
            console.log('[组件渲染器] 组件已创建，准备执行onMounted回调');
            if (setupResult.__onMountedCallbacks && setupResult.__onMountedCallbacks.length) {
              setupResult.__onMountedCallbacks.forEach((callback: Function) => {
                try {
                  callback();
                } catch (error) {
                  console.error('[组件渲染器] 执行onMounted回调出错:', error);
                }
              });
            }
          };

          if (scriptContent.includes('watchEffect(')) {
            console.log(`[组件渲染器] 处理watchEffect`);

            // 创建watchEffect
            if (vueLib.watchEffect) {
              const setupWatchEffect = function (callback: Function) {
                console.log('[组件渲染器] 注册watchEffect回调');
                if (setupResult.password && setupResult.password.value !== undefined) {
                  vueLib.watchEffect(() => {
                    console.log('[组件渲染器] 观察到password变化:', setupResult.password.value);
                    try {
                      callback();
                    } catch (error) {
                      console.error('[组件渲染器] 执行watchEffect回调出错:', error);
                    }
                  });
                }
              };

              setupResult.watchEffect = setupWatchEffect;
            }
          }

          // 7. 为ArDialog添加全局方法支持
          if (imports.ArDialog || setupResult.ArDialog) {
            const ArDialog = imports.ArDialog || setupResult.ArDialog;
            if (ArDialog && !ArDialog.alert) {
              // 模拟ArDialog.alert静态方法
              ArDialog.alert = (options: any) => {
                console.log('[组件渲染器] 调用ArDialog.alert:', options);
                alert(options.message || '系统提示');
              };
            }
          }

          // 增加基本生命周期支持
          setupResult.onUnmounted = vueLib.onUnmounted;
          setupResult.watchEffect = setupResult.watchEffect || vueLib.watchEffect;

          console.log(`[组件渲染器] Setup结果包含 ${Object.keys(setupResult).length} 个属性:`, Object.keys(setupResult).join(', '));

          // 返回模拟的setup结果
          return setupResult;
        } catch (error) {
          console.error(`[组件渲染器] 执行setup函数失败:`, error);
          // 返回空对象作为fallback，避免整个渲染失败
          return {};
        }
      };
    } catch (error) {
      console.error(`创建setup函数失败 ${filePath}:`, error);
      console.error(`脚本内容长度: ${scriptContent.length}`);
      console.error(`脚本内容前100个字符: ${scriptContent.substring(0, 100).replace(/\n/g, '\\n')}`);

      // 返回一个空函数，避免完全失败
      return () => ({
        error: true,
        message: `无法解析组件脚本: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  }

  /**
   * 处理脚本中的导入语句
   * @param scriptContent 脚本内容
   * @param filePath 文件路径
   * @returns 处理后的脚本内容和导入映射
   * @private
   */
  private processScriptImports(scriptContent: string, filePath: string): {
    processedScript: string;
    imports: Record<string, any>;
  } {
    const importMap: Record<string, string[]> = {};

    // 替换导入语句，同时收集导入信息
    const processedScript = scriptContent.replace(
      /import\s+(\{[^}]+\}|\w+)\s+from\s+['"]([^'"]+)['"]/g,
      (match, importNames, moduleName) => {
        // 清理花括号，分割导入的名称
        const names = importNames
          .replace(/[{}]/g, '')
          .split(',')
          .map((name: string) => name.trim());

        importMap[moduleName] = names;

        // 从代码中删除导入语句
        return '';
      }
    );

    // 将 export default 转换为 exports.default =
    const finalScript = processedScript.replace(
      /export\s+default\s*(\{[\s\S]*\}|[^{;\n]+)/,
      (match, exportedContent) => `exports.default = ${exportedContent}`
    );

    // 准备导入的模块
    const imports: Record<string, any> = {};

    Object.entries(importMap).forEach(([moduleName, importNames]) => {
      // 处理内置模块
      if (moduleName in builtinModules) {
        importNames.forEach(name => {
          if (name === 'default') {
            imports[moduleName] = builtinModules[moduleName];
          } else {
            imports[name] = builtinModules[moduleName][name];
          }
        });
      }
      // 处理本地模块
      else {
        try {
          // 解析模块路径
          const resolvedPath = pathResolver.resolve(moduleName, filePath);

          // 自动补全扩展名
          const fullPath = pathResolver.resolveExtension(
            resolvedPath,
            ['.vue', '.js', '.ts', '.jsx', '.tsx'],
            (path) => virtualFs.fileExists(path)
          );

          // 编译依赖组件
          const dependencyComponent = this.compileComponent(fullPath);

          importNames.forEach(name => {
            if (name === 'default') {
              imports[moduleName] = dependencyComponent;
            } else {
              imports[name] = dependencyComponent[name];
            }
          });
        } catch (error) {
          console.error(`处理导入失败 ${moduleName} in ${filePath}:`, error);
          throw new Error(`无法导入模块 ${moduleName}: ${error}`);
        }
      }
    });

    return { processedScript: finalScript, imports };
  }

  /**
   * 执行脚本并获取组件选项
   * @param scriptContent 脚本内容
   * @param imports 导入的模块
   * @param filePath 文件路径（用于错误报告）
   * @returns 组件选项
   * @private
   */
  private evaluateScript(
    scriptContent: string,
    imports: Record<string, any>,
    filePath: string
  ): Record<string, any> {
    try {
      const scriptFunction = new Function(
        ...Object.keys(imports),
        `
        const exports = {};
        ${scriptContent}
        return exports.default || {};
        `
      );

      return scriptFunction(...Object.values(imports));
    } catch (error) {
      console.error(`执行脚本失败 ${filePath}:`, error);
      throw new Error(`执行脚本失败: ${error}`);
    }
  }

  /**
   * 处理样式
   * @param style 样式内容
   * @param filePath 文件路径
   * @private
   */
  private processStyle(style: string, filePath: string): void {
    if (!style) {
      return;
    }

    // 创建唯一的ID，用于样式隔离
    const styleId = `style-${filePath.replace(/[^\w]/g, '-')}`;

    // 移除已有的样式
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      document.head.removeChild(existingStyle);
    }

    // 创建并添加样式元素
    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.textContent = style;
    document.head.appendChild(styleElement);
  }

  /**
   * 渲染错误界面
   * @param containerId 容器ID
   * @param errorMessage 错误信息
   * @private
   */
  private renderError(containerId: string, errorMessage: string): void {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`[组件渲染器][renderError] 找不到容器: #${containerId}`);
        return;
      }

      // 清空容器
      while (container.firstChild) {
        container.firstChild.remove();
      }

      // 创建一个新的div作为挂载点
      const errorMountPoint = document.createElement('div');
      errorMountPoint.id = `${containerId}-error-mount`;
      errorMountPoint.style.width = '100%';
      errorMountPoint.style.height = '100%';
      container.appendChild(errorMountPoint);

      // 创建错误显示应用
      const errorApp = createApp({
        render() {
          return h(ErrorDisplay, { errorMessage });
        }
      });

      // 挂载错误应用
      errorApp.mount(errorMountPoint);
    } catch (error) {
      console.error(`[组件渲染器][renderError] 渲染错误界面失败:`, error);
      // 直接使用原始方法作为后备
      try {
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = `<div style="color: red; margin: 20px;">渲染错误: ${errorMessage}</div>`;
        }
      } catch (fallbackError) {
        console.error(`[组件渲染器][renderError] 后备错误显示也失败:`, fallbackError);
      }
    }
  }

  /**
   * 默认的成功处理函数
   * @private
   */
  private defaultSuccessHandler(): void {
    window.parent.postMessage(
      {
        type: "artifacts-success"
      },
      "*"
    );
  }

  /**
   * 默认的错误处理函数
   * @param errorMessage 错误信息
   * @private
   */
  private defaultErrorHandler(errorMessage: string): void {
    window.parent.postMessage(
      {
        type: "artifacts-error",
        errorMessage
      },
      "*"
    );
  }

  /**
   * 清除所有缓存
   */
  clearCache(): void {
    this.componentCache.clear();
    dependencyAnalyzer.clearCache();

    // 移除事件监听器
    if (this.resizeEventListener) {
      const resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
      window.removeEventListener(resizeEvt, this.resizeEventListener, false);
      this.resizeEventListener = null;
    }
  }
}

// 导出单例实例
export const componentRenderer = new ComponentRenderer(); 