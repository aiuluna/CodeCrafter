/**
 * 组件渲染器核心API
 * 
 * 导出虚拟文件系统、路径解析和依赖分析等核心模块
 */

export { virtualFs } from './virtual-fs';
export { pathResolver } from './path-resolver';
export { dependencyAnalyzer } from './dependency-analyzer';
export { componentRenderer } from './component-renderer';

// 导出类型定义
export type { VirtualFile, VirtualDirectory } from './virtual-fs'; 