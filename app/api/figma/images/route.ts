import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';

/**
 * 获取Figma节点图像的API端点
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileKey = searchParams.get('fileKey');
    const ids = searchParams.get('ids');
    const format = searchParams.get('format') || 'png';
    const scale = searchParams.get('scale') || '1';

    if (!fileKey || !ids) {
      return NextResponse.json(
        { error: '缺少必要参数: fileKey 或 ids' },
        { status: 400 }
      );
    }

    // 获取Figma访问令牌
    const accessToken = request.headers.get('X-Figma-Token') || env.FIGMA_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: '未提供Figma访问令牌。请在请求头中提供X-Figma-Token或设置环境变量FIGMA_ACCESS_TOKEN。' },
        { status: 401 }
      );
    }

    // 构建Figma API URL
    const apiUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${ids}&format=${format}&scale=${scale}`;

    // 调用Figma API获取图像
    const response = await fetch(apiUrl, {
      headers: {
        'X-Figma-Token': accessToken
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: '获取Figma图像失败', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      images: data.images || {}
    });
  } catch (error) {
    console.error('获取Figma图像时出错:', error);
    return NextResponse.json(
      { error: '服务器内部错误', details: (error as Error).message },
      { status: 500 }
    );
  }
} 