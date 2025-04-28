/**
 * 路径解析模块
 * 
 * 用于解析和处理组件中的导入路径
 */

interface PathAliasConfig {
  [key: string]: string;
}

export class PathResolver {
  private aliases: PathAliasConfig = {};

  /**
   * 构造函数
   * @param aliases 路径别名配置
   */
  constructor(aliases: PathAliasConfig = {}) {
    this.aliases = aliases;
  }

  /**
   * 设置别名配置
   * @param aliases 路径别名配置
   */
  setAliases(aliases: PathAliasConfig): void {
    this.aliases = aliases;
  }

  /**
   * 添加别名
   * @param alias 别名
   * @param path 实际路径
   */
  addAlias(alias: string, path: string): void {
    this.aliases[alias] = path;
  }

  /**
   * 解析导入路径
   * @param importPath 导入路径
   * @param currentPath 当前文件路径
   * @returns 解析后的绝对路径
   */
  resolve(importPath: string, currentPath: string): string {
    // 处理别名路径
    for (const [alias, path] of Object.entries(this.aliases)) {
      if (importPath.startsWith(alias)) {
        importPath = importPath.replace(alias, path);
        return this.normalizePath(importPath);
      }
    }

    // 处理相对路径
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      const currentDir = this.getDirectoryPath(currentPath);
      return this.normalizePath(this.joinPaths(currentDir, importPath));
    }

    // 处理绝对路径
    if (importPath.startsWith('/')) {
      return this.normalizePath(importPath);
    }

    // 处理node_modules包或内置模块（这里保持原样，由依赖处理器处理）
    return importPath;
  }

  /**
   * 自动补全文件扩展名
   * @param path 文件路径
   * @param extensions 扩展名列表
   * @param fileExists 文件存在检查函数
   * @returns 带扩展名的路径
   */
  resolveExtension(
    path: string,
    extensions: string[] = ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    fileExists: (path: string) => boolean
  ): string {
    // 如果路径已有扩展名且文件存在，直接返回
    if (fileExists(path)) {
      return path;
    }

    // 尝试各种扩展名
    for (const ext of extensions) {
      const pathWithExt = `${path}${ext}`;
      if (fileExists(pathWithExt)) {
        return pathWithExt;
      }
    }

    // 尝试 index 文件
    for (const ext of extensions) {
      const indexPath = this.joinPaths(path, `index${ext}`);
      if (fileExists(indexPath)) {
        return indexPath;
      }
    }

    // 如果都找不到，返回原始路径
    return path;
  }

  /**
   * 获取目录路径
   * @param filePath 文件路径
   * @returns 目录路径
   * @private
   */
  private getDirectoryPath(filePath: string): string {
    const parts = filePath.split('/');
    parts.pop();
    return parts.join('/');
  }

  /**
   * 连接路径
   * @param base 基础路径
   * @param path 相对路径
   * @returns 连接后的路径
   * @private
   */
  private joinPaths(base: string, path: string): string {
    if (path.startsWith('/')) {
      return path;
    }

    const stack: string[] = [];
    const parts = [...base.split('/'), ...path.split('/')];

    for (const part of parts) {
      if (part === '' || part === '.') {
        continue;
      }

      if (part === '..') {
        stack.pop();
      } else {
        stack.push(part);
      }
    }

    return '/' + stack.join('/');
  }

  /**
   * 规范化路径
   * @param path 路径
   * @returns 规范化后的路径
   * @private
   */
  private normalizePath(path: string): string {
    // 确保路径以 / 开头
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    // 规范化 /./ 和 /../
    const stack: string[] = [];
    const parts = path.split('/');

    for (const part of parts) {
      if (part === '' || part === '.') {
        continue;
      }

      if (part === '..') {
        stack.pop();
      } else {
        stack.push(part);
      }
    }

    return '/' + stack.join('/');
  }
}

// 导出默认实例
export const pathResolver = new PathResolver(); 