import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { extractFigmaFileKey } from '@/app/services/figma';

/**
 * 处理Figma URL请求的主入口
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { figmaUrl, nodeId, includeStyles } = body;

    if (!figmaUrl) {
      return NextResponse.json(
        { error: '缺少必要参数: figmaUrl' },
        { status: 400 }
      );
    }

    // 从URL中提取Figma文件Key
    let fileKey: string;
    try {
      fileKey = extractFigmaFileKey(figmaUrl);
    } catch (error) {
      return NextResponse.json(
        { error: '无效的Figma URL格式', details: (error as Error).message },
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

    // 构建上下文API URL
    const contextApiUrl = `/api/figma/context?fileKey=${fileKey}${nodeId ? `&nodeId=${nodeId}` : ''}${includeStyles ? '&includeStyles=true' : ''}`;

    // 重定向到上下文API端点
    const contextResponse = await fetch(new URL(contextApiUrl, request.url), {
      headers: {
        'X-Figma-Token': accessToken
      }
    });

    if (!contextResponse.ok) {
      const errorData = await contextResponse.json();
      return NextResponse.json(
        { error: '处理Figma数据失败', details: errorData },
        { status: contextResponse.status }
      );
    }

    // 返回处理结果
    const data = await contextResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('处理Figma URL请求时出错:', error);
    return NextResponse.json(
      { error: '服务器内部错误', details: (error as Error).message },
      { status: 500 }
    );
  }
} 