declare namespace FigmaApi {
  // Figma基本节点类型
  export interface FigmaNode {
    id: string;
    name: string;
    type: string;
    [key: string]: any;
  }

  // Figma文件信息
  export interface FigmaFile {
    name: string;
    lastModified: string;
    thumbnailUrl?: string;
    version: string;
    document: FigmaNode;
    components?: Record<string, any>;
    componentSets?: Record<string, any>;
    styles?: Record<string, any>;
  }

  // 获取Figma文件信息请求
  export interface GetFileRequest {
    fileUrl: string;
    accessToken?: string; // 可选，使用环境变量中的token
  }

  // 获取Figma文件信息响应
  export interface GetFileResponse {
    file: FigmaFile;
    nodes: Record<string, FigmaNode>;
  }

  // 获取Figma图像请求
  export interface GetImageRequest {
    fileUrl: string;
    nodeIds: string[];
    format?: 'jpg' | 'png' | 'svg' | 'pdf';
    scale?: number;
    accessToken?: string;
  }

  // 获取Figma图像响应
  export interface GetImageResponse {
    images: Record<string, string>;
  }

  // 格式化Figma数据为代码上下文
  export interface GetDesignContextRequest {
    fileUrl: string;
    nodeId?: string; // 可选，指定特定节点
    includeStyles?: boolean;
    accessToken?: string;
  }

  // 格式化后的设计上下文
  export interface GetDesignContextResponse {
    context: {
      fileKey: string;
      fileName: string;
      mainComponent: FigmaNode;
      designTokens?: {
        colors?: Record<string, string>;
        typography?: Record<string, any>;
        spacing?: Record<string, any>;
      };
      components?: FigmaNode[];
      images?: Record<string, string>;
    };
    rawData?: FigmaFile; // 可选，原始数据
  }
}

export { FigmaApi }; 