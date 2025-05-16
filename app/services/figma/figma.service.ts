import { getInstance } from "../request";
import { FigmaApi } from "@/app/api/figma/types";

const request = getInstance();

/**
 * 从Figma URL中提取文件Key
 */
export const extractFigmaFileKey = (figmaUrl: string): string => {
  // 支持的URL格式:
  // https://www.figma.com/file/FILE_KEY/FILE_NAME
  // https://www.figma.com/proto/FILE_KEY/FILE_NAME
  const regex = /figma\.com\/(file|proto)\/([a-zA-Z0-9]+)/;
  const match = figmaUrl.match(regex);

  if (!match || !match[2]) {
    throw new Error('无效的Figma URL。请提供有效的Figma文件链接。');
  }

  return match[2];
};

/**
 * 获取Figma文件信息
 */
export const getFigmaFile = async (
  params: FigmaApi.GetFileRequest
): Promise<FigmaApi.GetFileResponse> => {
  try {
    const fileKey = extractFigmaFileKey(params.fileUrl);
    const response = await request(`/figma/file?fileKey=${fileKey}`, {
      method: "GET",
      headers: {
        ...(params.accessToken ? { 'X-Figma-Token': params.accessToken } : {})
      }
    });
    return await response.json();
  } catch (error) {
    console.error("获取Figma文件信息失败:", error);
    throw error;
  }
};

/**
 * 获取Figma节点图像
 */
export const getFigmaImages = async (
  params: FigmaApi.GetImageRequest
): Promise<FigmaApi.GetImageResponse> => {
  try {
    const fileKey = extractFigmaFileKey(params.fileUrl);
    const nodeIdsParam = params.nodeIds.join(',');
    const formatParam = params.format || 'png';
    const scaleParam = params.scale || 1;

    const queryParams = new URLSearchParams({
      fileKey,
      ids: nodeIdsParam,
      format: formatParam,
      scale: scaleParam.toString()
    }).toString();

    const response = await request(`/figma/images?${queryParams}`, {
      method: "GET",
      headers: {
        ...(params.accessToken ? { 'X-Figma-Token': params.accessToken } : {})
      }
    });

    return await response.json();
  } catch (error) {
    console.error("获取Figma图像失败:", error);
    throw error;
  }
};

/**
 * 获取设计上下文，格式化为AI代码生成友好的格式
 */
export const getFigmaDesignContext = async (
  params: FigmaApi.GetDesignContextRequest
): Promise<FigmaApi.GetDesignContextResponse> => {
  try {
    // 1. 获取Figma文件信息
    const fileKey = extractFigmaFileKey(params.fileUrl);
    const fileResponse = await request(`/figma/context?fileKey=${fileKey}${params.nodeId ? `&nodeId=${params.nodeId}` : ''}${params.includeStyles ? '&includeStyles=true' : ''}`, {
      method: "GET",
      headers: {
        ...(params.accessToken ? { 'X-Figma-Token': params.accessToken } : {})
      }
    });

    return await fileResponse.json();
  } catch (error) {
    console.error("获取Figma设计上下文失败:", error);
    throw error;
  }
};

/**
 * 简单的缓存实现，避免重复请求相同的设计文件
 */
const figmaCache = new Map<string, any>();

/**
 * 带缓存的设计上下文获取
 */
export const getCachedFigmaDesignContext = async (
  params: FigmaApi.GetDesignContextRequest
): Promise<FigmaApi.GetDesignContextResponse> => {
  const cacheKey = `${params.fileUrl}_${params.nodeId || 'root'}_${params.includeStyles ? 'withStyles' : 'noStyles'}`;

  // 检查缓存
  if (figmaCache.has(cacheKey)) {
    return figmaCache.get(cacheKey);
  }

  // 获取数据
  const result = await getFigmaDesignContext(params);

  // 更新缓存
  figmaCache.set(cacheKey, result);

  return result;
}; 