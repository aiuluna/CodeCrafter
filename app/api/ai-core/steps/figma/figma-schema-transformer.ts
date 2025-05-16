/**
 * Figma数据结构转换器
 * 将原始Figma API数据转换为标准化Schema结构
 */

// Figma节点类型
interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  layoutMode?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  absoluteRenderBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  text?: string;
  textStyle?: string;
  fills?: any[];
  cornerRadius?: number;
  borderRadius?: number;
  constraints?: {
    horizontal: string;
    vertical: string;
  };
  strokes?: any[];
  effects?: any;
  visible?: boolean;
  style?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    textAlignHorizontal?: string;
    textDecoration?: string;
    lineHeightPx?: number;
    lineHeightPercent?: number;
    letterSpacing?: number;
    textCase?: string;
    textAlignVertical?: string;
  };
  opacity?: number;
  relativeTransform?: number[][];
}

// Figma数据结构
interface FigmaData {
  thumbnailUrl?: string;
  previewImageURL?: string;
  document?: {
    children: FigmaNode[];
  };
  nodes?: {
    [key: string]: {
      document: FigmaNode;
    };
  } | FigmaNode[]; // 增加支持直接数组类型
  globalVars?: {
    styles?: Record<string, any>;
  };
}

// 转换后的Block节点类型
interface BlockNode {
  __VERSION__?: string;
  type: string;
  id: string;
  name?: string;
  props: {
    style: Record<string, any>;
    attrs: Record<string, any>;
    text?: string;
  };
  children?: BlockNode[];
  originType?: string;
  nodeLayerName?: string;
}

// 转换后的Schema结构
interface SchemaResult {
  taskId: string;
  pluginVersion: string;
  reference: string;
  type: string;
  id: string;
  __VERSION__: string;
  previewImageURL?: string;
  props: {
    style: {
      width: number | null;
      height: number | null;
    };
    attrs: {
      x: number;
      y: number;
    };
  };
  children: BlockNode[];
  name?: string;
}

// 几何信息类型
interface GeometryInfo {
  x: number;
  y: number;
  width: number;
  height: number;
  layoutMode?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

/**
 * 生成随机ID
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16).toUpperCase();
  });
}

/**
 * 映射Figma节点类型到标准类型
 */
function mapNodeType(figmaType: string): string {
  switch (figmaType) {
    case "TEXT":
      return "Text";
    case "RECTANGLE":
    case "ELLIPSE":
    case "IMAGE-SVG":
    case "VECTOR":
      return "Shape";
    case "FRAME":
    case "COMPONENT":
    case "COMPONENT_SET":
      return "Block";
    case "GROUP":
      return "Block";
    case "INSTANCE":
      return "Block";
    case "BOOLEAN_OPERATION":
      return "Shape";
    case "LINE":
      return "Shape";
    default:
      return "Block";
  }
}

/**
 * 计算节点的几何信息
 */
function calculateGeometry(node: FigmaNode, parentGeometry?: GeometryInfo, siblings?: FigmaNode[]): GeometryInfo {
  let x = 0;
  let y = 0;
  let width = 100;
  let height = 100;

  // 1. 首先尝试从boundingBox属性获取位置信息
  if (node.boundingBox) {
    x = node.boundingBox.x;
    y = node.boundingBox.y;
    width = node.boundingBox.width;
    height = node.boundingBox.height;
  }
  // 2. 如果没有boundingBox，再尝试从absoluteBoundingBox属性获取
  else if (node.absoluteBoundingBox) {
    x = node.absoluteBoundingBox.x;
    y = node.absoluteBoundingBox.y;
    width = node.absoluteBoundingBox.width || width;
    height = node.absoluteBoundingBox.height || height;
  }
  // 3. 如果以上两种方式都失败，且有父节点，则基于父节点计算相对位置
  else if (parentGeometry) {
    const layoutMode = node.layoutMode || (parentGeometry && parentGeometry.layoutMode);

    // 简单的布局逻辑，可以根据Figma的具体布局规则扩展
    if (layoutMode === 'HORIZONTAL' && siblings) {
      const siblingIndex = siblings.indexOf(node);
      if (siblingIndex !== -1) {
        x = parentGeometry.x + (siblingIndex * 10); // 假设水平间距10px
      } else {
        x = parentGeometry.x;
      }
      y = parentGeometry.y;
    } else if (layoutMode === 'VERTICAL' && siblings) {
      const siblingIndex = siblings.indexOf(node);
      if (siblingIndex !== -1) {
        y = parentGeometry.y + (siblingIndex * 10); // 假设垂直间距10px
      } else {
        y = parentGeometry.y;
      }
      x = parentGeometry.x;
    } else {
      // 没有特定布局模式，保持在父容器内
      x = parentGeometry.x;
      y = parentGeometry.y;
    }

    // 考虑父容器的内边距
    if (parentGeometry.paddingLeft) x += parentGeometry.paddingLeft;
    if (parentGeometry.paddingTop) y += parentGeometry.paddingTop;

    // 如果有约束，根据约束调整位置
    if (node.constraints) {
      if (node.constraints.horizontal === 'RIGHT') {
        x = parentGeometry.x + parentGeometry.width - width;
      } else if (node.constraints.horizontal === 'CENTER') {
        x = parentGeometry.x + (parentGeometry.width - width) / 2;
      }

      if (node.constraints.vertical === 'BOTTOM') {
        y = parentGeometry.y + parentGeometry.height - height;
      } else if (node.constraints.vertical === 'CENTER') {
        y = parentGeometry.y + (parentGeometry.height - height) / 2;
      }
    }
  }

  return {
    x,
    y,
    width,
    height,
    layoutMode: node.layoutMode,
    paddingLeft: node.paddingLeft,
    paddingRight: node.paddingRight,
    paddingTop: node.paddingTop,
    paddingBottom: node.paddingBottom
  };
}

/**
 * 提取颜色值
 */
function extractColor(fills: any[] | string, globalVars?: { styles?: Record<string, any> }): string | null {
  // 如果fills是字符串ID，尝试从全局变量中获取
  if (typeof fills === 'string' && globalVars && globalVars.styles) {
    const globalFills = globalVars.styles[fills];
    if (globalFills) {
      // 如果是数组，递归调用自身处理
      if (Array.isArray(globalFills)) {
        return extractColor(globalFills);
      }

      // 如果是直接的颜色值
      if (typeof globalFills === 'string') {
        return globalFills;
      }
    }
    return null;
  }

  if (!fills || !Array.isArray(fills) || fills.length === 0) {
    return null;
  }

  // 处理普通颜色
  for (const fill of fills) {
    // 如果是SOLID类型的填充
    if (fill.type === 'SOLID' && fill.rgba) {
      return fill.rgba;
    } else if (fill.type === 'SOLID' && fill.hex) {
      return fill.hex;
    }

    // 处理线性渐变
    if (fill.type === 'GRADIENT_LINEAR' && fill.gradientStops && fill.gradientStops.length >= 2) {
      // 提取渐变的起止颜色和位置，保留原始位置值（包括负值和超出100%的值）
      const gradientStops = fill.gradientStops.map((stop: any) => {
        // 处理色标颜色，支持多种可能的格式
        let color = '';

        // 如果已经有处理好的hex属性，直接使用
        if (stop.color && stop.color.hex) {
          color = stop.color.hex;
        }
        // 如果有原始Figma格式的颜色对象 {r,g,b} 进行转换
        else if (stop.color && typeof stop.color.r === 'number') {
          color = `#${Math.round(stop.color.r * 255).toString(16).padStart(2, '0').toUpperCase()}${Math.round(stop.color.g * 255).toString(16).padStart(2, '0').toUpperCase()}${Math.round(stop.color.b * 255).toString(16).padStart(2, '0').toUpperCase()}`;
        }
        // 默认颜色
        else {
          color = '#000000';
        }

        // 将位置转换为百分比，但保留原始范围
        const position = Math.round(stop.position * 100 * 100) / 100; // 保留两位小数
        return `${color} ${position}%`;
      }).join(', ');

      // 计算渐变角度
      let angle = 180; // 默认从上到下

      if (fill.gradientHandlePositions && fill.gradientHandlePositions.length >= 2) {
        // Figma的渐变使用三个控制点定义
        const start = fill.gradientHandlePositions[0];
        const end = fill.gradientHandlePositions[1];

        // 计算方向向量
        const deltaX = end.x - start.x;
        // 因为Figma的Y轴向下，而CSS的Y轴向上，所以需要对Y坐标取反
        const deltaY = -(end.y - start.y);

        // 计算角度（弧度）
        const radians = Math.atan2(deltaY, deltaX);

        // 转换为度数，CSS渐变角度是从上方（0度）开始顺时针旋转
        let degrees = radians * (180 / Math.PI);

        // 确保角度在0-360范围内
        degrees = ((degrees % 360) + 360) % 360;

        // CSS渐变方向与向量方向相反
        degrees = (degrees + 180) % 360;

        // 设置最终角度
        angle = Math.round(degrees);

        // 记录日志以便验证
        console.log(`Gradient angle calculation: deltaX=${deltaX}, deltaY=${deltaY}, degrees=${angle}`);
      }

      // 创建CSS线性渐变表达式，使用完整的色标信息
      return `linear-gradient(${Math.round(angle)}deg, ${gradientStops})`;
    }

    // 如果是直接的rgba或hex值
    if (typeof fill === 'string') {
      if (fill.startsWith('rgba(') || fill.startsWith('#')) {
        return fill;
      }
    }
  }

  return null;
}

/**
 * 从样式ID提取文本样式
 */
function extractTextStyle(textStyleId: string, node?: FigmaNode, globalVars?: { styles?: Record<string, any> }): Record<string, any> {
  const styleProps: Record<string, any> = {};

  // 尝试从全局变量中获取样式
  if (globalVars && globalVars.styles && textStyleId && textStyleId in globalVars.styles) {
    const globalStyle = globalVars.styles[textStyleId];

    // 处理文本样式
    if (globalStyle) {
      if (globalStyle.fontFamily) styleProps.fontFamily = globalStyle.fontFamily;
      if (globalStyle.fontSize) styleProps.fontSize = `${globalStyle.fontSize}px`;
      if (globalStyle.fontWeight) styleProps.fontWeight = globalStyle.fontWeight;
      if (globalStyle.lineHeight) styleProps.lineHeight = globalStyle.lineHeight;
      if (globalStyle.letterSpacing) styleProps.letterSpacing = globalStyle.letterSpacing;
      if (globalStyle.textCase) styleProps.textTransform = mapTextCase(globalStyle.textCase);
      if (globalStyle.textAlignHorizontal) styleProps.textAlign = mapTextAlign(globalStyle.textAlignHorizontal);
    }
  }

  // 如果提供了节点，尝试从节点获取样式
  if (node) {
    // 文本样式
    if (node.style) {
      if (node.style.fontFamily) styleProps.fontFamily = node.style.fontFamily;
      if (node.style.fontSize) styleProps.fontSize = `${node.style.fontSize}px`;
      if (node.style.fontWeight) styleProps.fontWeight = node.style.fontWeight;

      // 文本对齐
      if (node.style.textAlignHorizontal) {
        styleProps.textAlign = mapTextAlign(node.style.textAlignHorizontal);
      }

      // 文本装饰
      if (node.style.textDecoration) {
        switch (node.style.textDecoration) {
          case 'UNDERLINE': styleProps.textDecoration = 'underline'; break;
          case 'STRIKETHROUGH': styleProps.textDecoration = 'line-through'; break;
        }
      }

      // 行高
      if (node.style.lineHeightPx) {
        styleProps.lineHeight = `${node.style.lineHeightPx}px`;
      } else if (node.style.lineHeightPercent) {
        styleProps.lineHeight = `${node.style.lineHeightPercent / 100}`;
      }
    }

    // 从节点填充中提取颜色 - 这里可能需要修改
    if (typeof node.fills === 'string') {
      // 如果是全局填充引用
      const textColor = extractColor(node.fills, globalVars);
      if (textColor) styleProps.color = textColor;
    } else if (Array.isArray(node.fills) && node.fills.length) {
      // 如果fills是数组，直接提取
      const textColor = extractColor(node.fills);
      if (textColor) styleProps.color = textColor;
    }
  }

  return styleProps;
}

/**
 * 映射Figma文本对齐值到CSS文本对齐值
 */
function mapTextAlign(textAlignHorizontal: string): string {
  switch (textAlignHorizontal) {
    case 'LEFT': return 'left';
    case 'CENTER': return 'center';
    case 'RIGHT': return 'right';
    case 'JUSTIFIED': return 'justify';
    default: return 'left';
  }
}

/**
 * 映射Figma文本大小写值到CSS文本转换值
 */
function mapTextCase(textCase: string): string {
  switch (textCase) {
    case 'UPPER': return 'uppercase';
    case 'LOWER': return 'lowercase';
    case 'TITLE': return 'capitalize';
    default: return 'none';
  }
}

/**
 * 递归转换子节点
 */
function transformChildren(node: FigmaNode, parentGeometry?: GeometryInfo, globalVars?: { styles?: Record<string, any> }): BlockNode[] {
  if (!node.children || !Array.isArray(node.children)) {
    return [];
  }

  // 过滤掉隐藏的节点
  const visibleChildren = node.children.filter(child => child.visible !== false);

  // 对每个子节点应用转换
  return visibleChildren.map(child => {
    const childGeometry = calculateGeometry(child, parentGeometry, visibleChildren);

    const childNode: BlockNode = {
      __VERSION__: "2.0",
      type: mapNodeType(child.type),
      id: child.id || generateUUID(),
      name: child.name || '',
      props: {
        style: {
          width: childGeometry.width,
          height: childGeometry.height,
          // 如果有不透明度，则添加
          ...(child.opacity !== undefined && child.opacity !== 1
            ? { opacity: child.opacity }
            : {}),
          // 如果有圆角，则添加（确保移除可能的px后缀）
          ...(child.cornerRadius || child.borderRadius
            ? { borderRadius: processRadiusValue(child.cornerRadius || child.borderRadius) }
            : {})
        },
        attrs: {
          x: childGeometry.x,
          y: childGeometry.y
        }
      },
      children: [] // 初始化空的子节点数组
    };

    // 处理文本节点
    if (child.type === 'TEXT' && child.text) {
      childNode.props.text = child.text;

      // 提取文本样式
      if (child.textStyle) {
        const textStyles = extractTextStyle(child.textStyle, child, globalVars);
        childNode.props.style = {
          ...childNode.props.style,
          ...textStyles
        };
      }

      // 处理文本颜色 - 从填充中提取
      if (typeof child.fills === 'string') {
        // 如果是全局填充引用
        const textColor = extractColor(child.fills, globalVars);
        if (textColor) {
          childNode.props.style.color = textColor;
        }
      } else if (Array.isArray(child.fills) && child.fills.length) {
        // 如果是直接填充数组
        const textColor = extractColor(child.fills);
        if (textColor) {
          childNode.props.style.color = textColor;
        }
      }
    }

    // 处理所有可能有背景色或填充的节点类型
    if (['RECTANGLE', 'ELLIPSE', 'IMAGE-SVG', 'VECTOR', 'BOOLEAN_OPERATION'].includes(child.type)) {
      let backgroundColor = null;

      // 如果有全局填充引用
      if (typeof child.fills === 'string') {
        backgroundColor = extractColor(child.fills, globalVars);
      }
      // 如果有直接填充数组
      else if (Array.isArray(child.fills) && child.fills.length) {
        backgroundColor = extractColor(child.fills);
      }

      if (backgroundColor) {
        // 如果是渐变颜色，使用backgroundImage而不是backgroundColor
        if (backgroundColor.startsWith('linear-gradient(')) {
          childNode.props.style.backgroundImage = backgroundColor;
          // 确保不设置backgroundColor，避免冲突
          delete childNode.props.style.backgroundColor;
        } else {
          childNode.props.style.backgroundColor = backgroundColor;
        }
      }

      // 确保处理圆角
      if (child.borderRadius) {
        childNode.props.style.borderRadius = processRadiusValue(child.borderRadius);
      }
    }

    // 对于向量/SVG节点
    if (child.type === 'VECTOR' || child.type === 'IMAGE-SVG') {
      // 可以添加SVG相关属性
      childNode.props.attrs.src = `data:image/svg+xml,${encodeURIComponent('<svg></svg>')}`;
    }

    // 对于图像节点
    if (child.type === 'IMAGE') {
      childNode.props.attrs.src = '';
    }

    // 如果有子节点，递归处理
    const children = transformChildren(child, childGeometry, globalVars);
    if (children.length > 0) {
      childNode.children = children;
    }

    return childNode;
  });
}

/**
 * 处理圆角值，确保不重复添加px后缀
 */
function processRadiusValue(radius: number | string | undefined): string {
  if (radius === undefined) {
    return '0px';
  }

  if (typeof radius === 'number') {
    return `${radius}px`;
  }

  // 字符串情况下，检查是否已包含px后缀
  const radiusStr = String(radius);
  if (radiusStr.endsWith('px')) {
    return radiusStr;
  }

  return `${radiusStr}px`;
}

/**
 * 转换Figma数据为标准化Schema
 * @param figmaData Figma原始数据
 * @returns 标准化Schema
 */
export function transformFigmaToSchema(figmaData: FigmaData): SchemaResult {
  console.log('开始转换Figma数据为标准Schema...');

  // 记录全局变量信息
  if (figmaData.globalVars && figmaData.globalVars.styles) {
    console.log(`找到全局样式变量，包含 ${Object.keys(figmaData.globalVars.styles).length} 个样式定义`);

    // 记录几个样式信息示例，如果存在
    const styleKeys = Object.keys(figmaData.globalVars.styles);
    if (styleKeys.length > 0) {
      // 查找文本样式和填充样式示例
      const textStyleKey = styleKeys.find(key => key.includes('style_'));
      const fillStyleKey = styleKeys.find(key => key.includes('fill_'));

      if (textStyleKey) {
        console.log(`文本样式示例: ${textStyleKey} =`, figmaData.globalVars.styles[textStyleKey]);
      }

      if (fillStyleKey) {
        console.log(`填充样式示例: ${fillStyleKey} =`, figmaData.globalVars.styles[fillStyleKey]);
      }
    }
  } else {
    console.log('未找到全局样式变量');
  }

  // 优先使用document中的节点，如果没有则使用nodes中的节点
  let nodes: FigmaNode[] = [];

  // 存储原始节点ID，用于后续检查
  const originalNodeIds = new Set<string>();

  if (figmaData.document && figmaData.document.children) {
    nodes = figmaData.document.children;
    console.log(`使用document中的${nodes.length}个节点`);
    // 收集节点ID
    nodes.forEach(node => originalNodeIds.add(node.id));
  } else if (figmaData.nodes) {
    // 检查nodes是数组还是对象
    if (Array.isArray(figmaData.nodes)) {
      // 如果nodes是数组，直接使用
      nodes = figmaData.nodes;
      console.log(`使用nodes数组中的${nodes.length}个节点`);
      // 收集节点ID
      nodes.forEach(node => originalNodeIds.add(node.id));
    } else {
      // 从nodes对象中提取document
      nodes = Object.values(figmaData.nodes).map(nodeContainer => nodeContainer.document);
      console.log(`使用nodes对象中的${nodes.length}个节点`);
      // 收集节点ID
      nodes.forEach(node => originalNodeIds.add(node.id));
    }
  }

  if (nodes.length === 0) {
    throw new Error('没有找到可用的节点数据');
  }

  // 查找所有Frame节点，通常这些是顶层容器
  let frameNodes = nodes.filter(node => node.type === 'FRAME');
  console.log(`找到${frameNodes.length}个Frame节点`);

  // 查找所有非Frame的顶层节点
  const nonFrameNodes = nodes.filter(node => node.type !== 'FRAME');
  console.log(`找到${nonFrameNodes.length}个非Frame顶层节点`);

  // 对Frame节点按照y坐标排序，以确保显示顺序符合视觉顺序
  frameNodes = frameNodes.sort((a, b) => {
    const aY = a.absoluteBoundingBox?.y || a.boundingBox?.y || 0;
    const bY = b.absoluteBoundingBox?.y || b.boundingBox?.y || 0;
    return aY - bY;  // 从上到下排序
  });

  let rootNode: FigmaNode;

  // 如果有多个Frame节点，创建一个根容器来包含它们
  if (frameNodes.length > 0) {
    // 计算包含所有Frame节点的边界框
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    frameNodes.forEach(frame => {
      if (frame.absoluteBoundingBox) {
        minX = Math.min(minX, frame.absoluteBoundingBox.x);
        minY = Math.min(minY, frame.absoluteBoundingBox.y);
        maxX = Math.max(maxX, frame.absoluteBoundingBox.x + (frame.absoluteBoundingBox.width || 0));
        maxY = Math.max(maxY, frame.absoluteBoundingBox.y + (frame.absoluteBoundingBox.height || 0));
      } else if (frame.boundingBox) {
        minX = Math.min(minX, frame.boundingBox.x);
        minY = Math.min(minY, frame.boundingBox.y);
        maxX = Math.max(maxX, frame.boundingBox.x + (frame.boundingBox.width || 0));
        maxY = Math.max(maxY, frame.boundingBox.y + (frame.boundingBox.height || 0));
      }
    });

    // 计算非Frame节点的边界框
    nonFrameNodes.forEach(node => {
      if (node.absoluteBoundingBox) {
        minX = Math.min(minX, node.absoluteBoundingBox.x);
        minY = Math.min(minY, node.absoluteBoundingBox.y);
        maxX = Math.max(maxX, node.absoluteBoundingBox.x + (node.absoluteBoundingBox.width || 0));
        maxY = Math.max(maxY, node.absoluteBoundingBox.y + (node.absoluteBoundingBox.height || 0));
      } else if (node.boundingBox) {
        minX = Math.min(minX, node.boundingBox.x);
        minY = Math.min(minY, node.boundingBox.y);
        maxX = Math.max(maxX, node.boundingBox.x + (node.boundingBox.width || 0));
        maxY = Math.max(maxY, node.boundingBox.y + (node.boundingBox.height || 0));
      }
    });

    // 创建一个根容器节点，包含所有Frame和非Frame节点
    rootNode = {
      id: 'root-container',
      name: 'Root Container',
      type: 'FRAME',
      children: [...frameNodes, ...nonFrameNodes], // 合并所有节点
      absoluteBoundingBox: {
        x: minX !== Number.MAX_SAFE_INTEGER ? minX : 0,
        y: minY !== Number.MAX_SAFE_INTEGER ? minY : 0,
        width: maxX - minX > 0 ? maxX - minX : 1000,
        height: maxY - minY > 0 ? maxY - minY : 1000
      }
    };
  } else {
    // 如果没有Frame节点，则使用所有顶层节点
    rootNode = {
      id: 'root-container',
      name: 'Root Container',
      type: 'FRAME',
      children: nodes,
      absoluteBoundingBox: {
        x: 0,
        y: 0,
        width: 1000,
        height: 1000
      }
    };
  }

  // 计算根节点的几何信息
  const rootGeometry = calculateGeometry(rootNode);

  // 创建最终的数据结构
  const result: SchemaResult = {
    taskId: generateUUID(),
    pluginVersion: '4.2.8',
    reference: 'sketch',
    type: 'Block',
    id: 'Block_1',
    __VERSION__: '2.0',
    props: {
      style: {
        width: rootGeometry.width,
        height: rootGeometry.height
      },
      attrs: {
        x: rootGeometry.x,
        y: rootGeometry.y
      }
    },
    children: transformChildren(rootNode, rootGeometry, figmaData.globalVars),
    name: rootNode.name
  };

  // 添加预览图片
  if (figmaData.previewImageURL) {
    result.previewImageURL = figmaData.previewImageURL;
  } else if (figmaData.thumbnailUrl) {
    result.previewImageURL = figmaData.thumbnailUrl;
  }

  console.log(`转换完成！生成了一个含有${result.children?.length || 0}个顶层子节点的Schema`);

  // 检查节点是否都被转换
  console.log(`原始共有 ${originalNodeIds.size} 个顶层节点`);

  // 验证节点是否丢失
  const convertedNodeIds = new Set<string>();

  // 递归收集转换后的节点ID
  function collectNodeIds(nodes: BlockNode[]) {
    nodes.forEach(node => {
      convertedNodeIds.add(node.id);
      if (node.children && node.children.length > 0) {
        collectNodeIds(node.children);
      }
    });
  }

  collectNodeIds(result.children);
  console.log(`转换后共有 ${convertedNodeIds.size} 个节点`);

  // 查找丢失的节点
  const missingNodeIds = Array.from(originalNodeIds).filter(id => !convertedNodeIds.has(id));
  if (missingNodeIds.length > 0) {
    console.warn(`警告：有 ${missingNodeIds.length} 个节点在转换过程中丢失！`);
    console.warn(`丢失的节点ID: ${missingNodeIds.join(', ')}`);
  } else {
    console.log('所有节点都已成功转换');
  }

  return result;
}

/**
 * 转换Figma数据字符串为标准化Schema
 * @param figmaDataJson Figma原始数据JSON字符串
 * @returns 标准化Schema
 */
export function transformFigmaJsonToSchema(figmaDataJson: string): SchemaResult {
  try {
    const figmaData = JSON.parse(figmaDataJson) as FigmaData;
    return transformFigmaToSchema(figmaData);
  } catch (error) {
    console.error("解析Figma数据JSON出错:", error);
    throw new Error(`解析Figma数据JSON出错: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 分析Figma数据和生成的Schema，生成诊断报告
 */
export function generateSchemaDiagnostics(figmaData: any, schema: SchemaResult): Record<string, any> {
  // 获取原始节点数组
  let originalNodes: FigmaNode[] = [];

  if (figmaData.document?.children) {
    originalNodes = figmaData.document.children;
  } else if (figmaData.nodes) {
    if (Array.isArray(figmaData.nodes)) {
      originalNodes = figmaData.nodes;
    } else {
      originalNodes = Object.values(figmaData.nodes).map((node: any) => node.document);
    }
  }

  // 计算原始文本节点数量
  const originalTextNodes = countTextNodes(originalNodes);

  // 计算转换后的文本节点数量
  const convertedTextNodes = countSchemaTextNodes(schema.children);

  // 统计节点类型
  const nodeTypeStats = getNodeTypeStats(originalNodes);
  const schemaTypeStats = getSchemaNodeTypeStats(schema.children);

  return {
    originalStats: {
      totalNodes: countNodes(originalNodes),
      textNodes: originalTextNodes,
      nodeTypes: nodeTypeStats
    },
    convertedStats: {
      totalNodes: countSchemaNodes(schema.children),
      textNodes: convertedTextNodes,
      nodeTypes: schemaTypeStats
    },
    conversionRate: {
      nodes: countSchemaNodes(schema.children) / countNodes(originalNodes),
      textNodes: convertedTextNodes / originalTextNodes
    },
    diagnostics: {
      missingTextNodes: originalTextNodes - convertedTextNodes > 0,
      missingNodeTypes: Object.keys(nodeTypeStats).filter(type => !schemaTypeStats[type])
    }
  };
}

// 工具函数：计数节点总数
function countNodes(nodes: FigmaNode[] = []): number {
  let count = nodes.length;

  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      count += countNodes(node.children);
    }
  }

  return count;
}

// 工具函数：计数Schema节点总数
function countSchemaNodes(nodes: BlockNode[] = []): number {
  let count = nodes.length;

  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      count += countSchemaNodes(node.children);
    }
  }

  return count;
}

// 工具函数：计数文本节点
function countTextNodes(nodes: FigmaNode[] = []): number {
  let count = 0;

  for (const node of nodes) {
    if (node.type === "TEXT") {
      count++;
    }

    if (node.children && node.children.length > 0) {
      count += countTextNodes(node.children);
    }
  }

  return count;
}

// 工具函数：计数Schema文本节点
function countSchemaTextNodes(nodes: BlockNode[] = []): number {
  let count = 0;

  for (const node of nodes) {
    if (node.type === "Text") {
      count++;
    }

    if (node.children && node.children.length > 0) {
      count += countSchemaTextNodes(node.children);
    }
  }

  return count;
}

// 工具函数：获取节点类型统计
function getNodeTypeStats(nodes: FigmaNode[] = []): Record<string, number> {
  const stats: Record<string, number> = {};

  for (const node of nodes) {
    stats[node.type] = (stats[node.type] || 0) + 1;

    if (node.children && node.children.length > 0) {
      const childStats = getNodeTypeStats(node.children);

      for (const [type, count] of Object.entries(childStats)) {
        stats[type] = (stats[type] || 0) + count;
      }
    }
  }

  return stats;
}

// 工具函数：获取Schema节点类型统计
function getSchemaNodeTypeStats(nodes: BlockNode[] = []): Record<string, number> {
  const stats: Record<string, number> = {};

  for (const node of nodes) {
    stats[node.type] = (stats[node.type] || 0) + 1;

    if (node.children && node.children.length > 0) {
      const childStats = getSchemaNodeTypeStats(node.children);

      for (const [type, count] of Object.entries(childStats)) {
        stats[type] = (stats[type] || 0) + count;
      }
    }
  }

  return stats;
} 