/**
 * 虚拟文件系统实现
 * 
 * 用于在内存中模拟文件系统，支持组件渲染器的多文件处理需求
 */

export interface VirtualFile {
  content: string;
  mtime: Date; // 修改时间
}

export interface VirtualDirectory {
  [key: string]: VirtualFile | VirtualDirectory;
}

export class VirtualFileSystem {
  private root: VirtualDirectory = {};

  /**
   * 写入文件
   * @param path 文件路径，使用 '/' 作为分隔符
   * @param content 文件内容
   */
  writeFile(path: string, content: string): void {
    const parts = this.normalizePath(path).split('/').filter(Boolean);
    const fileName = parts.pop();

    if (!fileName) {
      throw new Error('文件路径无效');
    }

    let current = this.root;

    // 确保目录路径存在
    for (const part of parts) {
      if (!(part in current)) {
        current[part] = {};
      }

      const item = current[part];
      if (this.isFile(item)) {
        throw new Error(`无法在 ${part} 创建目录：已存在同名文件`);
      }

      current = item as VirtualDirectory;
    }

    // 写入文件
    current[fileName] = {
      content,
      mtime: new Date()
    };
  }

  /**
   * 读取文件
   * @param path 文件路径
   * @returns 文件内容
   */
  readFile(path: string): string {
    const file = this.getFile(path);
    return file.content;
  }

  /**
   * 检查文件是否存在
   * @param path 文件路径
   * @returns 存在返回true，否则返回false
   */
  fileExists(path: string): boolean {
    try {
      this.getFile(path);
      return true;
    } catch (_) {
      return false;
    }
  }

  /**
   * 删除文件
   * @param path 文件路径
   */
  deleteFile(path: string): void {
    const parts = this.normalizePath(path).split('/').filter(Boolean);
    const fileName = parts.pop();

    if (!fileName) {
      throw new Error('文件路径无效');
    }

    let current = this.root;

    for (const part of parts) {
      if (!(part in current)) {
        throw new Error(`路径不存在: ${path}`);
      }

      const item = current[part];
      if (this.isFile(item)) {
        throw new Error(`期望是目录，但得到文件: ${part}`);
      }

      current = item as VirtualDirectory;
    }

    if (!(fileName in current)) {
      throw new Error(`文件不存在: ${path}`);
    }

    if (!this.isFile(current[fileName])) {
      throw new Error(`期望是文件，但得到目录: ${fileName}`);
    }

    delete current[fileName];
  }

  /**
   * 列出目录内容
   * @param path 目录路径
   * @returns 目录内容列表
   */
  listDirectory(path: string): string[] {
    const dir = this.getDirectory(path);
    return Object.keys(dir);
  }

  /**
   * 创建目录
   * @param path 目录路径
   */
  createDirectory(path: string): void {
    const parts = this.normalizePath(path).split('/').filter(Boolean);

    let current = this.root;

    for (const part of parts) {
      if (!(part in current)) {
        current[part] = {};
      }

      const item = current[part];
      if (this.isFile(item)) {
        throw new Error(`无法创建目录 ${part}: 已存在同名文件`);
      }

      current = item as VirtualDirectory;
    }
  }

  /**
   * 获取文件对象
   * @param path 文件路径
   * @returns 文件对象
   * @private
   */
  private getFile(path: string): VirtualFile {
    const parts = this.normalizePath(path).split('/').filter(Boolean);
    const fileName = parts.pop();

    if (!fileName) {
      throw new Error('文件路径无效');
    }

    const dir = this.navigateToDirectory(parts);

    if (!(fileName in dir)) {
      throw new Error(`文件不存在: ${path}`);
    }

    const file = dir[fileName];
    if (!this.isFile(file)) {
      throw new Error(`期望是文件，但得到目录: ${fileName}`);
    }

    return file as VirtualFile;
  }

  /**
   * 获取目录对象
   * @param path 目录路径
   * @returns 目录对象
   * @private
   */
  private getDirectory(path: string): VirtualDirectory {
    if (path === '' || path === '/') {
      return this.root;
    }

    const parts = this.normalizePath(path).split('/').filter(Boolean);
    return this.navigateToDirectory(parts);
  }

  /**
   * 导航到指定目录
   * @param parts 路径部分
   * @returns 目录对象
   * @private
   */
  private navigateToDirectory(parts: string[]): VirtualDirectory {
    let current = this.root;

    for (const part of parts) {
      if (!(part in current)) {
        throw new Error(`目录不存在: ${part}`);
      }

      const item = current[part];
      if (this.isFile(item)) {
        throw new Error(`期望是目录，但得到文件: ${part}`);
      }

      current = item as VirtualDirectory;
    }

    return current;
  }

  /**
   * 检查对象是否为文件
   * @param item 对象
   * @returns 是文件返回true，否则返回false
   * @private
   */
  private isFile(item: VirtualFile | VirtualDirectory): boolean {
    return 'content' in item && 'mtime' in item;
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

    // 移除多余的 /
    path = path.replace(/\/+/g, '/');

    // 移除结尾的 /
    path = path.replace(/\/+$/, '');

    return path;
  }
}

// 导出单例实例
export const virtualFs = new VirtualFileSystem(); 