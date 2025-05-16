import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';

/**
 * 提取节点的样式信息
 */
function extractStyles(node: any): any {
  const styles: any = {};

  // 提取通用样式
  if (node.absoluteBoundingBox) {
    styles.position = {
      x: node.absoluteBoundingBox.x,
      y: node.absoluteBoundingBox.y,
      width: node.absoluteBoundingBox.width,
      height: node.absoluteBoundingBox.height
    };
  }

  // 提取背景颜色
  if (node.fills && node.fills.length > 0) {
    const solidFill = node.fills.find((fill: any) => fill.type === 'SOLID' && fill.visible !== false);
    if (solidFill) {
      const { r, g, b, a } = solidFill.color;
      styles.backgroundColor = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
    }
  }

  // 提取边框
  if (node.strokes && node.strokes.length > 0) {
    const solidStroke = node.strokes.find((stroke: any) => stroke.type === 'SOLID' && stroke.visible !== false);
    if (solidStroke) {
      const { r, g, b, a } = solidStroke.color;
      styles.border = {
        color: `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`,
        width: node.strokeWeight || 1,
        style: 'solid'
      };
    }
  }

  // 提取圆角
  if (node.cornerRadius !== undefined) {
    styles.borderRadius = `${node.cornerRadius}px`;
  }

  // 提取阴影
  if (node.effects && node.effects.length > 0) {
    const shadowEffect = node.effects.find((effect: any) =>
      (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') && effect.visible !== false
    );
    if (shadowEffect) {
      const { r, g, b, a } = shadowEffect.color;
      styles.boxShadow = `${shadowEffect.offset.x}px ${shadowEffect.offset.y}px ${shadowEffect.radius}px rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
    }
  }

  // 提取文本样式
  if (node.style) {
    styles.typography = {
      fontFamily: node.style.fontFamily,
      fontSize: `${node.style.fontSize}px`,
      fontWeight: node.style.fontWeight,
      lineHeight: node.style.lineHeightPx ? `${node.style.lineHeightPx}px` : 'normal',
      letterSpacing: node.style.letterSpacing ? `${node.style.letterSpacing}px` : 'normal',
      textAlign: node.style.textAlignHorizontal?.toLowerCase() || 'left',
      textDecoration: node.style.textDecoration === 'UNDERLINE' ? 'underline' : 'none'
    };

    // 文本颜色
    if (node.fills && node.fills.length > 0) {
      const textFill = node.fills.find((fill: any) => fill.type === 'SOLID' && fill.visible !== false);
      if (textFill) {
        const { r, g, b, a } = textFill.color;
        styles.typography.color = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
      }
    }
  }

  return styles;
}

/**
 * 递归处理Figma节点，提取有用信息
 */
function processNode(node: any, parentId: string = ''): any {
  if (!node) return null;

  // 基本节点信息
  const processedNode = {
    id: node.id,
    name: node.name,
    type: node.type,
    parentId
  };

  // 根据节点类型添加特定属性
  switch (node.type) {
    case 'FRAME':
    case 'GROUP':
    case 'COMPONENT':
    case 'INSTANCE':
      return {
        ...processedNode,
        width: node.absoluteBoundingBox?.width,
        height: node.absoluteBoundingBox?.height,
        backgroundColor: node.backgroundColor,
        children: node.children?.map((child: any) => processNode(child, node.id)) || [],
        styles: extractStyles(node)
      };
    case 'TEXT':
      return {
        ...processedNode,
        characters: node.characters,
        style: node.style,
        styles: extractStyles(node)
      };
    case 'RECTANGLE':
    case 'ELLIPSE':
    case 'VECTOR':
      return {
        ...processedNode,
        width: node.absoluteBoundingBox?.width,
        height: node.absoluteBoundingBox?.height,
        fills: node.fills,
        strokes: node.strokes,
        styles: extractStyles(node)
      };
    default:
      return {
        ...processedNode,
        children: node.children?.map((child: any) => processNode(child, node.id)) || []
      };
  }
}

/**
 * 提取基本的设计令牌
 */
function extractBasicDesignTokens(data: any) {
  const designTokens = {
    colors: {},
    typography: {}
  };

  // 简化版示例，实际项目中可以扩展更复杂的处理逻辑
  if (data.styles) {
    // 可以添加样式处理逻辑
  }

  return designTokens;
}

/**
 * 获取Figma设计上下文的API端点
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileKey = searchParams.get('fileKey');
    const nodeId = searchParams.get('nodeId');
    const includeStyles = searchParams.get('includeStyles') === 'true';

    if (!fileKey) {
      return NextResponse.json(
        { error: '缺少必要参数: fileKey' },
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

    // 调用Figma API获取文件信息
    let apiUrl = `https://api.figma.com/v1/files/${fileKey}`;
    if (nodeId) {
      apiUrl += `/nodes?ids=${nodeId}`;
    }

    const response = await fetch(apiUrl, {
      headers: {
        'X-Figma-Token': accessToken
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: '获取Figma设计上下文失败', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    // 处理响应数据
    let mainComponent = null;
    let fileName = '';

    if (nodeId && data.nodes && data.nodes[nodeId]) {
      // 如果指定了节点ID，处理该节点
      mainComponent = data.nodes[nodeId].document;
      fileName = data.name || '';
    } else if (data.document) {
      // 否则处理整个文档
      mainComponent = data.document;
      fileName = data.name || '';
    }

    // 返回数据
    return NextResponse.json({
      context: {
        fileKey,
        fileName,
        mainComponent,
        designTokens: includeStyles ? extractBasicDesignTokens(data) : undefined,
      },
      rawData: includeStyles ? data : undefined
    });
  } catch (error) {
    console.error('获取Figma设计上下文时出错:', error);
    return NextResponse.json(
      { error: '服务器内部错误', details: (error as Error).message },
      { status: 500 }
    );
  }
} 