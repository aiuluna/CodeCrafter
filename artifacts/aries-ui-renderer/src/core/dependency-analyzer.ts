/**
 * 依赖分析器
 * 
 * 用于分析Vue组件中的依赖关系，支持递归依赖处理
 */

import { virtualFs } from './virtual-fs';
import { pathResolver } from './path-resolver';

// 支持的扩展名
const EXTENSIONS = ['.vue', '.js', '.ts', '.jsx', '.tsx'];

interface ModuleCache {
  [path: string]: {
    content: string;
    dependencies: string[];
    mtime: Date;
  }
}

export class DependencyAnalyzer {
  // 模块缓存
  private moduleCache: ModuleCache = {};

  /**
   * 构造函数
   */
  constructor() {
    // 初始化
  }

  /**
   * 提取Vue组件中的依赖
   * @param content 组件内容
   * @param filePath 文件路径
   * @returns 依赖列表
   */
  extractDependencies(content: string, filePath: string): string[] {
    const dependencies: string[] = [];
    console.log(`[依赖分析器] 开始提取依赖: ${filePath}`);

    try {
      // 提取script标签中的内容
      const scriptMatch = content.match(/<script.*?>([\s\S]*?)<\/script>/);
      if (!scriptMatch || !scriptMatch[1]) {
        console.log(`[依赖分析器] 组件中没有script标签: ${filePath}`);
        return dependencies;
      }

      const scriptContent = scriptMatch[1];
      console.log(`[依赖分析器] 提取到script内容，长度: ${scriptContent.length}`);

      // 兼容包括单个组件引入和解构引入的正则表达式
      // 改进正则表达式，更好地匹配各种import语句
      const importRegex = /import\s+(?:(\w+)|{\s*([\w\s,]+)\s*})\s+from\s+['"]([^'"]+)['"]/g;
      let match;
      let count = 0;

      // 使用Array.from和matchAll来处理所有匹配项
      const matches = Array.from(scriptContent.matchAll(importRegex));
      console.log(`[依赖分析器] 找到 ${matches.length} 个import语句`);

      for (const match of matches) {
        count++;
        const defaultImport = match[1];
        const namedImports = match[2];
        const importPath = match[3];

        console.log(`[依赖分析器] 导入${count}: 路径: ${importPath}, 默认导入: ${defaultImport || '无'}, 命名导入: ${namedImports || '无'}`);

        // 跳过外部包依赖
        if (this.isExternalDependency(importPath)) {
          console.log(`[依赖分析器] 跳过外部依赖: ${importPath}`);
          continue;
        }

        // 解析路径
        const resolvedPath = pathResolver.resolve(importPath, filePath);
        console.log(`[依赖分析器] 解析路径: ${importPath} -> ${resolvedPath}`);

        // 补全扩展名
        const fullPath = pathResolver.resolveExtension(
          resolvedPath,
          EXTENSIONS,
          (path) => virtualFs.fileExists(path)
        );

        if (fullPath !== resolvedPath) {
          console.log(`[依赖分析器] 补全扩展名: ${resolvedPath} -> ${fullPath}`);
        }

        if (!virtualFs.fileExists(fullPath)) {
          console.warn(`[依赖分析器] 警告: 找不到依赖文件: ${fullPath}`);
        } else {
          console.log(`[依赖分析器] 添加依赖: ${fullPath}`);
          dependencies.push(fullPath);
        }
      }

      console.log(`[依赖分析器] 依赖提取完成: ${filePath}, 共 ${dependencies.length} 个依赖`);
      return dependencies;
    } catch (error) {
      console.error(`[依赖分析器] 提取依赖失败: ${filePath}`, error);
      return dependencies;
    }
  }

  /**
   * 递归分析依赖
   * @param entryPath 入口文件路径
   * @returns 所有依赖文件路径的集合
   */
  analyzeDependencies(entryPath: string): Set<string> {
    console.log(`[依赖分析器] 开始分析依赖: ${entryPath}`);
    const visited = new Set<string>();
    const pending = [entryPath];

    // 确保入口文件存在
    if (!virtualFs.fileExists(entryPath)) {
      console.error(`[依赖分析器] 入口文件不存在: ${entryPath}`);
      throw new Error(`入口文件不存在: ${entryPath}`);
    }

    while (pending.length > 0) {
      const currentPath = pending.pop()!;
      console.log(`[依赖分析器] 处理文件: ${currentPath}`);

      if (visited.has(currentPath)) {
        console.log(`[依赖分析器] 文件已处理过，跳过: ${currentPath}`);
        continue;
      }

      visited.add(currentPath);
      console.log(`[依赖分析器] 已访问文件数: ${visited.size}`);

      // 检查缓存
      if (
        this.moduleCache[currentPath] &&
        virtualFs.fileExists(currentPath)
      ) {
        const fileContent = virtualFs.readFile(currentPath);
        const cachedModule = this.moduleCache[currentPath];

        // 如果文件没变，直接使用缓存的依赖
        if (cachedModule.content === fileContent) {
          console.log(`[依赖分析器] 使用缓存的依赖: ${currentPath}, 共 ${cachedModule.dependencies.length} 个依赖`);
          cachedModule.dependencies.forEach(dep => {
            if (!visited.has(dep)) {
              console.log(`[依赖分析器] 添加缓存依赖到待处理队列: ${dep}`);
              pending.push(dep);
            }
          });
          continue;
        }
      }

      // 读取文件内容
      const content = virtualFs.readFile(currentPath);
      console.log(`[依赖分析器] 读取文件内容: ${currentPath}, 长度: ${content.length}`);

      // 提取依赖
      const dependencies = this.extractDependencies(content, currentPath);
      console.log(`[依赖分析器] 提取到依赖: ${currentPath}, 共 ${dependencies.length} 个依赖`);

      // 更新缓存
      this.moduleCache[currentPath] = {
        content,
        dependencies,
        mtime: new Date()
      };

      // 添加到待处理列表
      dependencies.forEach(dep => {
        if (!visited.has(dep)) {
          console.log(`[依赖分析器] 添加新依赖到待处理队列: ${dep}`);
          pending.push(dep);
        }
      });
    }

    console.log(`[依赖分析器] 依赖分析完成: ${entryPath}, 共 ${visited.size} 个文件`);
    return visited;
  }

  /**
   * 检查是否为外部依赖
   * @param importPath 导入路径
   * @returns 是否为外部依赖
   * @private
   */
  private isExternalDependency(importPath: string): boolean {
    // 不是相对路径且不是绝对路径，视为外部依赖
    return !importPath.startsWith('.') && !importPath.startsWith('/');
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.moduleCache = {};
  }

  /**
   * 移除单个文件的缓存
   * @param filePath 文件路径
   */
  removeCacheEntry(filePath: string): void {
    if (this.moduleCache[filePath]) {
      delete this.moduleCache[filePath];
    }
  }

  /**
   * 检查循环依赖
   * @param entryPath 入口文件路径
   * @returns 循环依赖的路径数组，如果没有则返回空数组
   */
  detectCircularDependencies(entryPath: string): string[][] {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const pathStack: string[] = [];

    const dfs = (currentPath: string) => {
      // 如果当前路径已在路径栈中，说明有循环依赖
      const index = pathStack.indexOf(currentPath);
      if (index !== -1) {
        cycles.push([...pathStack.slice(index), currentPath]);
        return;
      }

      // 如果已访问过且没有在当前路径栈中，跳过
      if (visited.has(currentPath)) {
        return;
      }

      visited.add(currentPath);
      pathStack.push(currentPath);

      // 如果文件不存在，跳过
      if (!virtualFs.fileExists(currentPath)) {
        pathStack.pop();
        return;
      }

      // 读取或使用缓存
      const dependencies = this.getDependenciesFromCacheOrFile(currentPath);

      // 递归处理依赖
      for (const dep of dependencies) {
        dfs(dep);
      }

      pathStack.pop();
    };

    dfs(entryPath);
    return cycles;
  }

  /**
   * 从缓存或文件中获取依赖
   * @param filePath 文件路径
   * @returns 依赖列表
   * @private
   */
  private getDependenciesFromCacheOrFile(filePath: string): string[] {
    // 检查缓存
    if (this.moduleCache[filePath]) {
      return this.moduleCache[filePath].dependencies;
    }

    // 如果没有缓存，从文件中提取
    const content = virtualFs.readFile(filePath);
    const dependencies = this.extractDependencies(content, filePath);

    // 更新缓存
    this.moduleCache[filePath] = {
      content,
      dependencies,
      mtime: new Date()
    };

    return dependencies;
  }
}

// 导出单例实例
export const dependencyAnalyzer = new DependencyAnalyzer(); 