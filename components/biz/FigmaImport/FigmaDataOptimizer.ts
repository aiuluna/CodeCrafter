import type {
  // GetFileNodesResponse,
  // Node as FigmaDocumentNode,
  // Paint,
  // Vector,
  // GetFileResponse,
} from "@figma/rest-api-spec";

// 定义通用的Figma节点类型，避免特定类型检查错误
export interface FigmaDocumentNode {
  id: string;
  name: string;
  type: string;
  visible?: boolean;
  children?: FigmaDocumentNode[];
  style?: any;
  fills?: any[];
  opacity?: number;
  cornerRadius?: number;
  rectangleCornerRadii?: number[];
  characters?: string;
  strokeWeight?: number;
  layoutMode?: string;
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
  [key: string]: any; // 允许任意其他属性
}

// 定义简化的Paint类型
export interface Paint {
  type: string;
  color?: {
    r: number;
    g: number;
    b: number;
  };
  opacity?: number;
  visible?: boolean;
  gradientHandlePositions?: Vector[];
  gradientStops?: {
    position: number;
    color: ColorValue | string;
  }[];
  [key: string]: any;
}

// 定义简化的Vector类型
export interface Vector {
  x: number;
  y: number;
}

// 定义简化的文件响应类型
export interface GetFileResponse {
  name: string;
  lastModified: string;
  thumbnailUrl?: string;
  document: {
    children: FigmaDocumentNode[];
  };
}

// 定义简化的节点响应类型
export interface GetFileNodesResponse {
  name: string;
  lastModified: string;
  thumbnailUrl?: string;
  nodes: {
    [key: string]: {
      document: FigmaDocumentNode;
    };
  };
}

// -------------------- 类型定义 --------------------

export type TextStyle = Partial<{
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: string;
  letterSpacing: string;
  textCase: string;
  textAlignHorizontal: string;
  textAlignVertical: string;
}>;

export type StrokeWeights = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type StyleId = string;

export interface SimplifiedLayout {
  direction?: string;
  spacing?: number;
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  alignment?: string;
  arrangement?: string;
  distribution?: string;
  // 可以按需添加更多布局属性
}

export type SimplifiedStroke = {
  colors: string[];
  width: number;
  style?: string;
  alignment?: string;
  weights?: StrokeWeights;
};

export type SimplifiedEffects = {
  dropShadow?: {
    color: string;
    offset: { x: number; y: number };
    radius: number;
    spread?: number;
  }[];
  innerShadow?: {
    color: string;
    offset: { x: number; y: number };
    radius: number;
    spread?: number;
  }[];
  blur?: {
    radius: number;
    type: string;
  };
};

type StyleTypes =
  | TextStyle
  | SimplifiedFill[]
  | SimplifiedLayout
  | SimplifiedStroke
  | SimplifiedEffects
  | string;

type GlobalVars = {
  styles: Record<StyleId, StyleTypes>;
};

export interface SimplifiedDesign {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  nodes: SimplifiedNode[];
  globalVars: GlobalVars;
}

export interface SimplifiedNode {
  id: string;
  name: string;
  type: string; // e.g. FRAME, TEXT, INSTANCE, RECTANGLE, etc.
  // geometry
  boundingBox?: BoundingBox;
  // text
  text?: string;
  textStyle?: string;
  // appearance
  fills?: string;
  styles?: string;
  strokes?: string;
  effects?: string;
  opacity?: number;
  borderRadius?: string;
  // layout & alignment
  layout?: string;
  // children
  children?: SimplifiedNode[];
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type CSSRGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`;
export type CSSHexColor = `#${string}`;
export type SimplifiedFill =
  | {
    type?: Paint["type"];
    hex?: string;
    rgba?: string;
    opacity?: number;
    imageRef?: string;
    scaleMode?: string;
    gradientHandlePositions?: Vector[];
    gradientStops?: {
      position: number;
      color: ColorValue | string;
    }[];
  }
  | CSSRGBAColor
  | CSSHexColor;

export interface ColorValue {
  hex: string;
  opacity: number;
}

// -------------------- 辅助函数 (占位实现) --------------------

// 这些函数是从原有代码中引用的，这里提供一个基础实现
// 实际开发中应该导入原始函数或实现完整功能

export function hasValue(key: string, obj: any, validator?: (val: any) => boolean): boolean {
  return obj && key in obj && obj[key] !== undefined && obj[key] !== null &&
    (validator ? validator(obj[key]) : true);
}

export function isRectangleCornerRadii(val: any): boolean {
  return Array.isArray(val) && val.length === 4 && val.every(v => typeof v === 'number');
}

export function isTruthy(val: any): boolean {
  return !!val;
}

export function removeEmptyKeys(obj: any): any {
  const result: any = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== null) {
      result[key] = obj[key];
    }
  });
  return result;
}

export function generateVarId(prefix: string): StyleId {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}

export function parsePaint(paint: Paint): SimplifiedFill {
  // 如果填充明确设置为不可见，直接返回空对象
  if (paint.visible === false) {
    return {};
  }

  switch (paint.type) {
    case "SOLID":
      if (paint.color) {
        const { r, g, b } = paint.color;
        const opacity = paint.opacity ?? 1;
        const rgba = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`;
        const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
        return { type: "SOLID", hex, rgba, opacity };
      }
      break;
    case "GRADIENT_LINEAR":
    case "GRADIENT_RADIAL":
    case "GRADIENT_ANGULAR":
    case "GRADIENT_DIAMOND":
      if (paint.gradientHandlePositions && paint.gradientStops) {
        return {
          type: paint.type,
          gradientHandlePositions: paint.gradientHandlePositions,
          gradientStops: paint.gradientStops.map((stop: any) => {
            // 确保颜色转换的十六进制值大小写与Figma导出保持一致（大写）
            const colorHex = stop.color ?
              `#${Math.round(stop.color.r * 255).toString(16).padStart(2, '0').toUpperCase()}${Math.round(stop.color.g * 255).toString(16).padStart(2, '0').toUpperCase()}${Math.round(stop.color.b * 255).toString(16).padStart(2, '0').toUpperCase()}` :
              "#000000";

            return {
              position: stop.position, // 保留原始位置信息，不做任何修改
              color: stop.color ? {
                hex: colorHex,
                opacity: stop.color.a ?? 1
              } : { hex: "#000000", opacity: 1 }
            };
          })
        };
      }
      break;
    // 其他类型的实现...
  }
  return {};
}

export function isVisible(node: FigmaDocumentNode): boolean {
  return node.visible !== false;
}

export function buildSimplifiedLayout(
  node: FigmaDocumentNode,
): SimplifiedLayout {
  // 简化版实现
  return { direction: node.layoutMode };
}

export function buildSimplifiedStrokes(node: FigmaDocumentNode): SimplifiedStroke {
  // 简化版实现
  if (!node.strokes || !Array.isArray(node.strokes) || node.strokes.length === 0) {
    return { colors: [], width: node.strokeWeight ?? 0 };
  }

  // 过滤可见的描边
  const visibleStrokes = node.strokes.filter(stroke => stroke.visible !== false);
  if (visibleStrokes.length === 0) {
    return { colors: [], width: node.strokeWeight ?? 0 };
  }

  // 提取颜色
  const colors = visibleStrokes.map(stroke => {
    if (stroke.type === 'SOLID' && stroke.color) {
      const { r, g, b } = stroke.color;
      const opacity = stroke.opacity ?? 1;
      return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`;
    }
    return '';
  }).filter(Boolean);

  return {
    colors,
    width: node.strokeWeight ?? 0,
    alignment: node.strokeAlign,
    // 可以根据需要添加更多属性
  };
}

export function buildSimplifiedEffects(
): SimplifiedEffects {
  // 简化版实现
  return {};
}

// -------------------- Level 1: 原始解析方法 --------------------

/**
 * 解析Figma API响应，转换为简化设计数据（原始版本）
 */
export function parseFigmaResponse(data: GetFileResponse | GetFileNodesResponse): SimplifiedDesign {
  const { name, lastModified, thumbnailUrl } = data;
  let nodes: FigmaDocumentNode[];
  if ("document" in data) {
    nodes = Object.values(data.document.children);
  } else {
    nodes = Object.values(data.nodes).map((n) => n.document);
  }
  const globalVars: GlobalVars = { // 改为const声明
    styles: {},
  };
  const simplifiedNodes: SimplifiedNode[] = nodes
    .filter(isVisible)
    .map((n) => parseNode(globalVars, n))
    .filter((child): child is SimplifiedNode => child !== null && child !== undefined);

  // 检查位置信息是否被保留
  const hasBoundingBoxes = simplifiedNodes.some(node => node.boundingBox !== undefined);
  console.log(`[FigmaDataOptimizer] 位置信息保留状态: ${hasBoundingBoxes ? '成功' : '失败'}`);
  if (hasBoundingBoxes) {
    const sampleNode = simplifiedNodes.find(node => node.boundingBox !== undefined);
    if (sampleNode) {
      console.log(`[FigmaDataOptimizer] 示例节点位置信息:`, sampleNode.boundingBox);
    }
  }

  return {
    name,
    lastModified,
    thumbnailUrl: thumbnailUrl || "",
    nodes: simplifiedNodes,
    globalVars,
  };
}

/**
 * 查找或创建全局变量
 * @param globalVars - 全局变量对象
 * @param value - 要存储的值
 * @param prefix - 变量ID前缀
 * @returns 变量ID
 */
function findOrCreateVar(globalVars: GlobalVars, value: any, prefix: string): StyleId {
  // 检查是否已存在相同值
  const [existingVarId] =
    Object.entries(globalVars.styles).find(
      ([, existingValue]) => JSON.stringify(existingValue) === JSON.stringify(value), // 使用空白标识符代替未使用的变量
    ) ?? [];

  if (existingVarId) {
    return existingVarId as StyleId;
  }

  // 创建新变量
  const varId = generateVarId(prefix);
  globalVars.styles[varId] = value;
  return varId;
}

/**
 * 解析Figma节点，转换为简化节点（原始版本）
 */
function parseNode(
  globalVars: GlobalVars,
  n: FigmaDocumentNode,
): SimplifiedNode | null {
  const { id, name, type } = n;

  const simplified: SimplifiedNode = {
    id,
    name,
    type,
  };

  // 处理位置信息
  if (hasValue("absoluteBoundingBox", n) && n.absoluteBoundingBox) {
    simplified.boundingBox = {
      x: n.absoluteBoundingBox.x,
      y: n.absoluteBoundingBox.y,
      width: n.absoluteBoundingBox.width,
      height: n.absoluteBoundingBox.height
    };
  } else if (hasValue("absoluteRenderBounds", n) && n.absoluteRenderBounds) {
    simplified.boundingBox = {
      x: n.absoluteRenderBounds.x,
      y: n.absoluteRenderBounds.y,
      width: n.absoluteRenderBounds.width,
      height: n.absoluteRenderBounds.height
    };
  }

  // 文本样式
  if (hasValue("style", n) && Object.keys(n.style).length) {
    const style = n.style;
    const textStyle = {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      fontSize: style.fontSize,
      lineHeight:
        style.lineHeightPx && style.fontSize
          ? `${style.lineHeightPx / style.fontSize}em`
          : undefined,
      letterSpacing:
        style.letterSpacing && style.letterSpacing !== 0 && style.fontSize
          ? `${(style.letterSpacing / style.fontSize) * 100}%`
          : undefined,
      textCase: style.textCase,
      textAlignHorizontal: style.textAlignHorizontal,
      textAlignVertical: style.textAlignVertical,
    };
    simplified.textStyle = findOrCreateVar(globalVars, textStyle, "style");
  }

  // 填充和描边
  if (hasValue("fills", n) && Array.isArray(n.fills) && n.fills.length) {
    // 过滤掉不可见的填充，并解析每个填充
    const fills = n.fills
      .filter(fill => fill.visible !== false)  // 只处理可见的填充
      .map(parsePaint)
      .filter(fill => Object.keys(fill).length > 0);  // 过滤掉空对象

    if (fills.length > 0) {  // 只有当有有效填充时才添加
      simplified.fills = findOrCreateVar(globalVars, fills, "fill");
    }
  }

  const strokes = buildSimplifiedStrokes(n);
  if (strokes.colors.length) {
    simplified.strokes = findOrCreateVar(globalVars, strokes, "stroke");
  }

  const effects = buildSimplifiedEffects();
  if (Object.keys(effects).length) {
    simplified.effects = findOrCreateVar(globalVars, effects, "effect");
  }

  // 处理布局
  const layout = buildSimplifiedLayout(n);
  if (Object.keys(layout).length > 1) {
    simplified.layout = findOrCreateVar(globalVars, layout, "layout");
  }

  // 保留其他简单属性
  if (hasValue("characters", n, isTruthy)) {
    simplified.text = n.characters;
  }

  // 不透明度
  if (hasValue("opacity", n) && typeof n.opacity === "number" && n.opacity !== 1) {
    simplified.opacity = n.opacity;
  }

  // 边框圆角
  if (hasValue("cornerRadius", n) && typeof n.cornerRadius === "number") {
    simplified.borderRadius = `${n.cornerRadius}px`;
  }
  if (hasValue("rectangleCornerRadii", n, isRectangleCornerRadii) && n.rectangleCornerRadii) {
    simplified.borderRadius = `${n.rectangleCornerRadii[0]}px ${n.rectangleCornerRadii[1]}px ${n.rectangleCornerRadii[2]}px ${n.rectangleCornerRadii[3]}px`;
  }

  // 递归处理子节点
  if (hasValue("children", n) && n.children && n.children.length > 0) {
    const children = n.children
      .filter(isVisible)
      .map((child) => parseNode(globalVars, child))
      .filter((child): child is SimplifiedNode => child !== null && child !== undefined);
    if (children.length) {
      simplified.children = children;
    }
  }

  // 将VECTOR转换为IMAGE-SVG
  if (type === "VECTOR") {
    simplified.type = "IMAGE-SVG";
  }

  return removeEmptyKeys(simplified);
}

// -------------------- Level 2: 优化版解析方法 --------------------

/**
 * 优化Figma设计数据，减少token占用（Level 2 - 中度优化）
 * @param figmaData 原始Figma数据
 * @param maxDepth 最大节点深度
 * @returns 优化后的设计数据
 */
export function optimizeFigmaData(
  figmaData: GetFileResponse | GetFileNodesResponse,
  maxDepth: number = 5
): SimplifiedDesign {
  // 先使用原始方法解析
  const simplifiedDesign = parseFigmaResponse(figmaData);

  // 然后应用优化
  return {
    ...simplifiedDesign,
    nodes: limitNodesDepth(simplifiedDesign.nodes, maxDepth),
    globalVars: deduplicateStyles(simplifiedDesign.globalVars),
  };
}

/**
 * 限制节点嵌套深度
 * @param nodes 节点数组
 * @param maxDepth 最大深度
 * @param currentDepth 当前深度
 * @returns 处理后的节点数组
 */
function limitNodesDepth(
  nodes: SimplifiedNode[],
  maxDepth: number,
  currentDepth: number = 0
): SimplifiedNode[] {
  if (currentDepth >= maxDepth) {
    // 到达最大深度，不再处理子节点
    return nodes.map(node => ({ ...node, children: undefined }));
  }

  return nodes.map(node => {
    if (!node.children || node.children.length === 0) {
      return node;
    }

    // 递归处理子节点，深度+1
    return {
      ...node,
      children: limitNodesDepth(node.children, maxDepth, currentDepth + 1),
    };
  });
}

/**
 * 更彻底地去除重复样式
 * @param globalVars 全局变量对象
 * @returns 优化后的全局变量对象
 */
function deduplicateStyles(globalVars: GlobalVars): GlobalVars {
  const { styles } = globalVars;
  const optimizedStyles: Record<StyleId, StyleTypes> = {};
  const stylesByType: Record<string, Record<string, StyleId>> = {};

  // 按类型分组样式
  Object.entries(styles).forEach(([styleId, styleValue]) => {
    const styleType = getStyleType(styleValue);
    if (!stylesByType[styleType]) {
      stylesByType[styleType] = {};
    }

    // 为样式创建简化的指纹，用于更宽松的相似度比较
    const styleFingerprint = createStyleFingerprint(styleValue, styleType);

    // 如果存在相似样式，复用之前的样式ID
    if (stylesByType[styleType][styleFingerprint]) {
      // 直接使用已存在的相似样式，不添加新样式
      const existingStyleId = stylesByType[styleType][styleFingerprint];
      optimizedStyles[styleId] = optimizedStyles[existingStyleId];
    } else {
      // 添加为新样式
      stylesByType[styleType][styleFingerprint] = styleId;
      optimizedStyles[styleId] = styleValue;
    }
  });

  return { styles: optimizedStyles };
}

/**
 * 获取样式类型
 * @param style 样式值
 * @returns 样式类型字符串
 */
function getStyleType(style: StyleTypes): string {
  if (typeof style === 'string') return 'reference';

  if (Array.isArray(style)) {
    if (style.length > 0) {
      // 安全地检查对象属性
      const firstItem = style[0];
      if (typeof firstItem === 'object' && firstItem !== null &&
        ('hex' in firstItem || 'rgba' in firstItem)) {
        return 'fill';
      }
    }
    return 'array';
  }

  if ('fontFamily' in style || 'fontSize' in style) {
    return 'text';
  }

  if ('colors' in style) {
    return 'stroke';
  }

  if ('dropShadow' in style || 'innerShadow' in style || 'blur' in style) {
    return 'effect';
  }

  if ('direction' in style || 'spacing' in style) {
    return 'layout';
  }

  return 'other';
}

/**
 * 创建样式指纹用于相似度比较
 * @param style 样式值
 * @param type 样式类型
 * @returns 样式指纹字符串
 */
function createStyleFingerprint(style: StyleTypes, type: string): string {
  if (typeof style === 'string') return style;

  switch (type) {
    case 'fill':
      if (Array.isArray(style)) {
        // 对于填充，只关注主色调和类型，确保类型安全
        return style.map(fill => {
          if (typeof fill === 'string') return fill;
          if (typeof fill === 'object' && fill !== null) {
            return `${(fill as any).type || ''}:${(fill as any).hex || (fill as any).rgba || ''}`;
          }
          return '';
        }).join('|');
      }
      return JSON.stringify(style);

    case 'text':
      // 对于文本样式，关注主要属性但忽略小的差异
      if ('fontFamily' in style && 'fontSize' in style) {
        const textStyle = style as TextStyle;
        // 忽略小的字号差异，取10的倍数
        const roundedSize = textStyle.fontSize ? Math.round(textStyle.fontSize / 10) * 10 : 0;
        return `${textStyle.fontFamily}:${roundedSize}:${textStyle.fontWeight || ''}`;
      }
      return JSON.stringify(style);

    case 'effect':
      // 可以简化效果，只保留类型和主要参数
      return JSON.stringify(style).substring(0, 100); // 简化表示

    default:
      return JSON.stringify(style);
  }
}

// -------------------- Level 3: 激进优化版解析方法 --------------------

/**
 * 优化Figma设计数据，极大减少token占用（Level 3 - 激进优化）
 * @param figmaData 原始Figma数据
 * @param maxDepth 最大节点深度，默认更小
 * @returns 优化后的设计数据
 */
export function aggressiveOptimizeFigmaData(
  figmaData: GetFileResponse | GetFileNodesResponse,
  maxDepth: number = 3
): SimplifiedDesign {
  // 先使用原始方法解析
  const simplifiedDesign = parseFigmaResponse(figmaData);

  // 然后应用更激进的优化
  return {
    ...simplifiedDesign,
    nodes: filterNonEssentialNodes(
      limitNodesDepth(simplifiedDesign.nodes, maxDepth)
    ),
    globalVars: extremeStyleOptimization(simplifiedDesign.globalVars),
  };
}

/**
 * 过滤非核心节点
 * @param nodes 节点数组
 * @returns 过滤后的节点数组
 */
function filterNonEssentialNodes(nodes: SimplifiedNode[]): SimplifiedNode[] {
  // 过滤可能的装饰节点、空容器或重复布局容器
  return nodes.filter(node => {
    // 跳过明显的装饰节点
    if (isDecorativeNode(node)) return false;

    // 跳过空容器
    if (isEmptyContainer(node)) return false;

    // 递归处理子节点
    if (node.children && node.children.length > 0) {
      node.children = filterNonEssentialNodes(node.children);
    }

    return true;
  });
}

/**
 * 判断节点是否为装饰节点
 * @param node 简化节点
 * @returns 是否为装饰节点
 */
function isDecorativeNode(node: SimplifiedNode): boolean {
  // 根据命名约定判断
  const decorativeNamePatterns = [
    /decoration/i, /ornament/i, /background/i, /bg-/i,
    /-bg$/i, /shadow/i, /gradient/i, /pattern/i
  ];

  if (decorativeNamePatterns.some(pattern => pattern.test(node.name))) {
    // 如果没有子节点且不是文本节点，可能是装饰
    return !node.children?.length && node.type !== 'TEXT';
  }

  return false;
}

/**
 * 判断节点是否为空容器
 * @param node 简化节点
 * @returns 是否为空容器
 */
function isEmptyContainer(node: SimplifiedNode): boolean {
  // 没有子节点的容器类型
  const containerTypes = ['FRAME', 'GROUP', 'SECTION'];
  return containerTypes.includes(node.type) &&
    (!node.children || node.children.length === 0) &&
    !node.text;
}

/**
 * 极端样式优化，最大程度减少样式变量
 * @param globalVars 全局变量对象
 * @returns 极端优化后的全局变量对象
 */
function extremeStyleOptimization(globalVars: GlobalVars): GlobalVars {
  // 首先应用常规样式去重
  const deduplicated = deduplicateStyles(globalVars);

  // 进一步合并类似的样式
  const { styles } = deduplicated;
  const extremeOptimized: Record<StyleId, StyleTypes> = {};
  const optimizationGroups: Record<string, StyleId[]> = {};

  // 按类型分组
  Object.entries(styles).forEach(([styleId, styleValue]) => {
    const styleType = getStyleType(styleValue);
    if (!optimizationGroups[styleType]) {
      optimizationGroups[styleType] = [];
    }
    optimizationGroups[styleType].push(styleId);
  });

  // 对每种类型的样式进行更激进的合并
  Object.entries(optimizationGroups).forEach(([type, styleIds]) => {
    // 对于文本样式，按字体族合并
    if (type === 'text') {
      const fontFamilyGroups: Record<string, StyleId> = {};

      styleIds.forEach(styleId => {
        const style = styles[styleId] as TextStyle;
        const fontFamily = style.fontFamily || 'default';

        if (!fontFamilyGroups[fontFamily]) {
          // 保留第一个该字体族的样式
          fontFamilyGroups[fontFamily] = styleId;
          extremeOptimized[styleId] = styles[styleId];
        } else {
          // 其他相同字体族的样式引用第一个
          const firstStyleId = fontFamilyGroups[fontFamily];
          extremeOptimized[styleId] = extremeOptimized[firstStyleId];
        }
      });
    }
    // 对于填充，只保留基本色调
    else if (type === 'fill') {
      const primaryColors: Record<string, StyleId> = {};

      styleIds.forEach(styleId => {
        const fills = styles[styleId];
        if (Array.isArray(fills) && fills.length > 0) {
          // 提取主要颜色
          const primaryColor = extractPrimaryColor(fills);

          if (!primaryColors[primaryColor]) {
            primaryColors[primaryColor] = styleId;
            // 简化填充，只保留第一个
            extremeOptimized[styleId] = Array.isArray(fills) && fills.length > 0
              ? [fills[0]]
              : fills;
          } else {
            // 复用相似颜色
            const similarStyleId = primaryColors[primaryColor];
            extremeOptimized[styleId] = extremeOptimized[similarStyleId];
          }
        } else {
          extremeOptimized[styleId] = fills;
        }
      });
    }
    // 其他类型样式，保持原样
    else {
      styleIds.forEach(styleId => {
        extremeOptimized[styleId] = styles[styleId];
      });
    }
  });

  return { styles: extremeOptimized };
}

/**
 * 从填充数组中提取主要颜色 - 确保类型安全
 */
function extractPrimaryColor(fills: any[]): string {
  if (fills.length === 0) return '';

  const fill = fills[0];
  if (typeof fill === 'string') return fill;
  if (typeof fill === 'object' && fill !== null) {
    return (fill.hex as string) || (fill.rgba as string) || '';
  }
  return '';
}

// -------------------- 入口函数 --------------------

/**
 * 多级别处理Figma设计数据
 * @param figmaData 原始Figma数据
 * @param optimizationLevel 优化级别
 * @returns 处理后的设计数据和估计token数
 */
export function processFigmaData(
  figmaData: any,
  optimizationLevel: 'none' | 'moderate' | 'aggressive' = 'moderate'
): { data: SimplifiedDesign; estimatedTokens: number } {
  let processedData: SimplifiedDesign;
  let maxDepth = 5;

  // 根据优化级别选择不同的处理方法
  switch (optimizationLevel) {
    case 'none':
      // 保持原始数据，不优化
      processedData = parseFigmaResponse(figmaData);
      break;

    case 'moderate':
      // 中度优化 - 深度限制和样式去重
      maxDepth = 4;
      processedData = optimizeFigmaData(figmaData, maxDepth);
      break;

    case 'aggressive':
      // 激进优化 - 深度限制、样式极简、非必要节点移除
      maxDepth = 2;
      processedData = aggressiveOptimizeFigmaData(figmaData, maxDepth);
      break;
  }

  // 估算token数量
  const jsonData = JSON.stringify(processedData);
  const estimatedTokens = Math.ceil(jsonData.length / 4); // 估计每个token约4个字符

  console.log(`[FigmaDataOptimizer] 优化级别: ${optimizationLevel}, 处理后数据大小: ${jsonData.length} 字符, 约 ${estimatedTokens} tokens`);
  console.log(processedData);
  return { data: processedData, estimatedTokens };
}

/**
 * 自适应优化Figma数据，根据数据大小自动选择优化级别
 * @param figmaData 原始Figma数据
 * @param maxTokens 最大允许的token数量
 * @returns 优化后的设计数据和使用的优化级别
 */
export function adaptiveOptimizeFigmaData(
  figmaData: any,
  maxTokens: number = 60000
): { data: SimplifiedDesign; level: string; estimatedTokens: number } {
  // 先尝试最低级别的优化
  let result = processFigmaData(figmaData, 'none');

  // 如果token数量超过限制，尝试中度优化
  if (result.estimatedTokens > maxTokens) {
    console.log(`[FigmaDataOptimizer] 无优化token数 (${result.estimatedTokens}) 超过限制 (${maxTokens})，尝试中度优化...`);
    result = processFigmaData(figmaData, 'moderate');
  }

  // 如果仍然超过限制，使用激进优化
  if (result.estimatedTokens > maxTokens) {
    console.log(`[FigmaDataOptimizer] 中度优化token数 (${result.estimatedTokens}) 超过限制 (${maxTokens})，尝试激进优化...`);
    result = processFigmaData(figmaData, 'aggressive');
  }

  // 如果激进优化后仍然超过限制，记录警告
  if (result.estimatedTokens > maxTokens) {
    console.warn(`[FigmaDataOptimizer] 警告：即使进行激进优化后，token数 (${result.estimatedTokens}) 仍超过限制 (${maxTokens})。可能需要手动干预。`);
  }

  // 返回最终结果以及使用的优化级别
  return {
    data: result.data,
    estimatedTokens: result.estimatedTokens,
    level: result.estimatedTokens > maxTokens ? 'critical' :
      result.estimatedTokens > maxTokens * 0.8 ? 'aggressive' :
        result.estimatedTokens > maxTokens * 0.5 ? 'moderate' : 'none'
  };
} 