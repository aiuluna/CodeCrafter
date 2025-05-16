import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';

/**
 * 获取Figma文件信息的API端点
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileKey = searchParams.get('fileKey');

    if (!fileKey) {
      return NextResponse.json(
        { error: '缺少必要参数: fileKey' },
        { status: 400 }
      );
    }

    // 获取Figma访问令牌，优先使用请求头中的令牌，其次使用环境变量
    const accessToken = request.headers.get('X-Figma-Token') || env.FIGMA_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json(
        { error: '未提供Figma访问令牌。请在请求头中提供X-Figma-Token或设置环境变量FIGMA_ACCESS_TOKEN。' },
        { status: 401 }
      );
    }

    // 调用Figma API获取文件信息
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': accessToken
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: '获取Figma文件失败', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      file: {
        name: data.name,
        lastModified: data.lastModified,
        thumbnailUrl: data.thumbnailUrl,
        version: data.version,
        document: data.document,
        components: data.components,
        componentSets: data.componentSets,
        styles: data.styles
      },
      nodes: {}
    });
  } catch (error) {
    console.error('获取Figma文件信息时出错:', error);
    return NextResponse.json(
      { error: '服务器内部错误', details: (error as Error).message },
      { status: 500 }
    );
  }
} 