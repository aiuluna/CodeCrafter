import {
  FigmaAnalysisWorkflowContext,
  InitialWorkflowContext,
} from "../../type"
import { getFigmaDesignContext } from "@/app/services/figma"
// 导入转换工具
import { transformFigmaJsonToSchema } from "./figma-schema-transformer"
import fs from "fs"

// 定义节点类型
interface SchemaNode {
  id: string;
  type: string;
  name?: string;
  props: {
    style?: {
      width?: number | null;
      height?: number | null;
      backgroundColor?: string;
      borderRadius?: string;
      [key: string]: any;
    };
    attrs?: {
      x?: number;
      y?: number;
      [key: string]: any;
    };
    [key: string]: any;
  };
  children?: SchemaNode[];
  layoutHints?: {
    horizontalFlex?: boolean;
    verticalFlex?: boolean;
    groupId?: string;
    centered?: boolean;
    horizontalArrangement?: boolean;
    verticalArrangement?: boolean;
    horizontalGroupMembers?: string[];
    verticalGroupMembers?: string[];
    [key: string]: any;
  };
  componentHints?: {
    type?: string;
    score?: number;
    styles?: {
      [key: string]: any;
    };
    [key: string]: any;
  };
  layoutRelationships?: LayoutRelationships;
  [key: string]: any;
}

/**
 * 布局特征类型
 */
type LayoutFeature = {
  type: 'layout' | 'component' | 'spacing' | 'alignment' | 'typography' | 'pattern';
  description: string;
  importance: number;
  elements?: string[];
  styles?: Record<string, any>;
};

/**
 * 布局关系结构
 */
interface LayoutRelationships {
  horizontalGroups: {
    id: string;
    members: string[];
    properties: {
      spacing?: number;
      alignment?: string;
    };
  }[];
  verticalGroups: {
    id: string;
    members: string[];
    properties: {
      spacing?: number;
      alignment?: string;
    };
  }[];
}

/**
 * 分析节点之间的布局关系
 */
function analyzeLayoutRelationships(node: SchemaNode): LayoutRelationships {
  // 初始化布局关系结构
  const layoutRelationships: LayoutRelationships = {
    horizontalGroups: [],
    verticalGroups: []
  };

  // 递归分析节点关系的函数
  function analyzeNode(currentNode: SchemaNode) {
    if (!currentNode) return;

    // 如果有子节点，分析它们之间的关系
    if (currentNode.children && currentNode.children.length > 1) {
      console.log(`[analyzeLayoutRelationships] 分析节点 ${currentNode.name || currentNode.id} 的子节点布局关系，共 ${currentNode.children.length} 个子节点`);

      // 1. 按Y坐标分组，找出同一水平线上的元素
      const horizontalGroups = groupNodesByYCoordinate(currentNode.children);
      console.log(`[analyzeLayoutRelationships] 按Y坐标分组后得到 ${horizontalGroups.length} 个水平组`);

      // 2. 检查每组水平元素的排列方式
      horizontalGroups.forEach((group, index) => {
        if (group.length >= 2) {
          console.log(`[analyzeLayoutRelationships] 检查水平组 ${index + 1}，包含 ${group.length} 个节点：${group.map(n => n.name || n.id).join(', ')}`);

          // 检查是否为水平排列
          const isHorizontal = checkHorizontalArrangement(group);
          console.log(`[analyzeLayoutRelationships] 水平组 ${index + 1} 是否为水平排列: ${isHorizontal}`);

          if (isHorizontal) {
            // 创建一个新的水平组
            const groupId = `horizontal-group-${layoutRelationships.horizontalGroups.length + 1}`;

            // 按X坐标排序节点，确保从左到右的顺序正确
            const sortedByX = [...group].sort((a, b) => {
              const aX = a.props?.attrs?.x || 0;
              const bX = b.props?.attrs?.x || 0;
              return aX - bX;
            });

            // 使用排序后的节点ID
            const memberIds = sortedByX.map(n => n.id);

            // 计算组内元素的平均间距
            const spacing = calculateAverageSpacing(group);

            // 添加到布局关系中
            layoutRelationships.horizontalGroups.push({
              id: groupId,
              members: memberIds,
              properties: {
                spacing: spacing,
                alignment: "center" // 默认居中对齐，可以根据实际情况调整
              }
            });

            console.log(`[analyzeLayoutRelationships] 添加水平组 ${groupId}，成员(按X坐标排序): ${memberIds.join(', ')}`);

            // 为了向后兼容，仍然在节点上添加layoutHints
            group.forEach(n => {
              n.layoutHints = n.layoutHints || {};
              n.layoutHints.horizontalArrangement = true;
              n.layoutHints.horizontalGroupMembers = group
                .filter(m => m.id !== n.id)
                .map(m => m.id);
            });
          }
        }
      });

      // 3. 检查垂直排列 (可以按类似方式实现)
      // 暂时省略垂直排列的代码...
    }

    // 递归处理子节点
    if (currentNode.children) {
      currentNode.children.forEach(child => analyzeNode(child));
    }
  }

  // 计算节点间的平均间距
  function calculateAverageSpacing(nodes: SchemaNode[]): number {
    if (nodes.length < 2) return 0;

    // 按X坐标排序
    const sortedByX = [...nodes].sort((a, b) => {
      const aX = a.props?.attrs?.x || 0;
      const bX = b.props?.attrs?.x || 0;
      return aX - bX;
    });

    // 计算相邻节点间的间距
    const spacings = [];
    for (let i = 1; i < sortedByX.length; i++) {
      const prevNode = sortedByX[i - 1];
      const currNode = sortedByX[i];
      const prevX = prevNode.props?.attrs?.x || 0;
      const prevWidth = prevNode.props?.style?.width || 0;
      const currX = currNode.props?.attrs?.x || 0;

      spacings.push(currX - (prevX + prevWidth));
    }

    // 计算平均间距
    if (spacings.length === 0) return 0;
    return Math.round(spacings.reduce((sum, spacing) => sum + spacing, 0) / spacings.length);
  }

  // 从根节点开始分析
  analyzeNode(node);

  return layoutRelationships;
}

/**
 * 根据Y坐标将节点分组 (可能在同一水平线上的元素)
 */
function groupNodesByYCoordinate(nodes: SchemaNode[]): SchemaNode[][] {
  const groups: SchemaNode[][] = [];
  const yThreshold = 2; // 阈值，Y坐标差在这个范围内视为同一水平线，从5减小到2，更精确地识别同一水平线上的元素

  // 按Y坐标排序
  const sortedNodes = [...nodes].sort((a, b) => {
    const aY = a.props?.attrs?.y || 0;
    const bY = b.props?.attrs?.y || 0;
    return aY - bY;
  });

  if (sortedNodes.length === 0) return groups;

  let currentGroup = [sortedNodes[0]];
  let lastY = sortedNodes[0]?.props?.attrs?.y || 0;

  console.log(`[groupNodesByYCoordinate] 开始分组，阈值=${yThreshold}px，共${sortedNodes.length}个节点`);

  // 根据Y坐标分组
  for (let i = 1; i < sortedNodes.length; i++) {
    const node = sortedNodes[i];
    const currentY = node.props?.attrs?.y || 0;
    const yDiff = Math.abs(currentY - lastY);

    if (yDiff <= yThreshold) {
      // 在同一水平线上
      currentGroup.push(node);
      console.log(`[groupNodesByYCoordinate] 节点 ${node.name || node.id} (Y=${currentY}) 与上一节点Y差值=${yDiff}，添加到当前组`);
    } else {
      // 新的一组
      if (currentGroup.length > 0) {
        console.log(`[groupNodesByYCoordinate] 完成一个组，包含 ${currentGroup.length} 个节点: ${currentGroup.map(n => n.name || n.id).join(', ')}`);
        groups.push(currentGroup);
      }
      currentGroup = [node];
      lastY = currentY;
      console.log(`[groupNodesByYCoordinate] 节点 ${node.name || node.id} (Y=${currentY}) 与上一节点Y差值=${yDiff}，开始新组`);
    }
  }

  if (currentGroup.length > 0) {
    console.log(`[groupNodesByYCoordinate] 完成最后一个组，包含 ${currentGroup.length} 个节点: ${currentGroup.map(n => n.name || n.id).join(', ')}`);
    groups.push(currentGroup);
  }

  console.log(`[groupNodesByYCoordinate] 总共分成 ${groups.length} 个水平组`);
  return groups;
}

/**
 * 根据X坐标将节点分组 (可能在同一垂直线上的元素)
 */
// 注释掉未使用的函数
/*
function groupNodesByXCoordinate(nodes: SchemaNode[]): SchemaNode[][] {
  // 函数实现...
}
*/

/**
 * 检查节点是否是水平排列
 */
function checkHorizontalArrangement(nodes: SchemaNode[]): boolean {
  // 判断水平排列的逻辑，例如检查节点之间的X坐标是否呈递增模式
  if (nodes.length < 2) return false;

  // 按X坐标排序
  const sortedByX = [...nodes].sort((a, b) => {
    const aX = a.props?.attrs?.x || 0;
    const bX = b.props?.attrs?.x || 0;
    return aX - bX;
  });

  console.log(`[checkHorizontalArrangement] 检查 ${nodes.length} 个节点是否水平排列: ${sortedByX.map(n => `${n.name || n.id}(X=${n.props?.attrs?.x})`).join(', ')}`);

  // 检查X坐标是否呈递增模式（基本要求）
  let isIncreasing = true;
  for (let i = 1; i < sortedByX.length; i++) {
    const prevNode = sortedByX[i - 1];
    const currNode = sortedByX[i];
    const prevX = prevNode.props?.attrs?.x || 0;
    const prevWidth = prevNode.props?.style?.width || 0;
    const currX = currNode.props?.attrs?.x || 0;
    const overlap = prevX + prevWidth - currX;

    // 如果当前节点的X坐标小于前一个节点的右边界，则不是递增模式
    if (currX < prevX + prevWidth - 5) { // 允许5px的重叠
      isIncreasing = false;
      console.log(`[checkHorizontalArrangement] X坐标不是递增模式: ${prevNode.name || prevNode.id}(${prevX}+${prevWidth}) 与 ${currNode.name || currNode.id}(${currX}) 重叠 ${overlap}px`);
      break;
    }
  }

  // 如果X坐标不是递增模式，则不是水平排列
  if (!isIncreasing) return false;

  // 检查节点的垂直对齐情况
  const yValues = sortedByX.map(node => node.props?.attrs?.y || 0);
  const avgY = yValues.reduce((sum, y) => sum + y, 0) / yValues.length;

  // 检查所有节点的Y坐标是否在平均值附近（允许一定的误差）
  const yThreshold = 5; // 垂直方向允许的误差范围
  const isVerticallyAligned = yValues.every(y => Math.abs(y - avgY) <= yThreshold);

  console.log(`[checkHorizontalArrangement] 垂直对齐检查: 平均Y=${avgY.toFixed(2)}, 阈值=${yThreshold}, 结果=${isVerticallyAligned}`);
  console.log(`[checkHorizontalArrangement] Y值列表: ${yValues.join(', ')}`);

  // 如果节点垂直对齐不好，则不太可能是水平排列
  if (!isVerticallyAligned) return false;

  // 检查节点的宽度和高度是否相似（可能是同类元素）
  const widths = sortedByX.map(node => node.props?.style?.width || 0);
  const heights = sortedByX.map(node => node.props?.style?.height || 0);

  // 计算宽高的变异系数（标准差/平均值）来判断一致性
  const widthCV = calculateCV(widths);
  const heightCV = calculateCV(heights);

  console.log(`[checkHorizontalArrangement] 宽度变异系数=${widthCV.toFixed(2)}, 高度变异系数=${heightCV.toFixed(2)}`);
  console.log(`[checkHorizontalArrangement] 宽度列表: ${widths.join(', ')}`);
  console.log(`[checkHorizontalArrangement] 高度列表: ${heights.join(', ')}`);

  // 如果高度非常一致（变异系数小），这是水平排列的强烈信号
  if (heightCV < 0.2) {
    console.log(`[checkHorizontalArrangement] 高度非常一致(CV<0.2)，判定为水平排列`);
    return true;
  }

  // 如果宽度也比较一致，增加水平排列的可能性
  if (widthCV < 0.3 && isVerticallyAligned) {
    console.log(`[checkHorizontalArrangement] 宽度比较一致(CV<0.3)且垂直对齐良好，判定为水平排列`);
    return true;
  }

  // 检查节点的类型是否相似（可能是同类元素）
  const sameType = sortedByX.every(node => node.type === sortedByX[0].type);

  console.log(`[checkHorizontalArrangement] 节点类型是否相同: ${sameType}, 类型=${sortedByX[0].type}`);

  // 如果节点类型相同，且垂直对齐良好，很可能是水平排列
  if (sameType && isVerticallyAligned) {
    console.log(`[checkHorizontalArrangement] 节点类型相同且垂直对齐良好，判定为水平排列`);
    return true;
  }

  // 检查节点间距是否相对均匀
  const spacings = [];
  for (let i = 1; i < sortedByX.length; i++) {
    const prevNode = sortedByX[i - 1];
    const currNode = sortedByX[i];
    const prevX = prevNode.props?.attrs?.x || 0;
    const prevWidth = prevNode.props?.style?.width || 0;
    const currX = currNode.props?.attrs?.x || 0;

    spacings.push(currX - (prevX + prevWidth));
  }

  // 如果间距的变异系数较小，说明间距比较一致
  const spacingCV = calculateCV(spacings);
  console.log(`[checkHorizontalArrangement] 间距变异系数=${spacingCV.toFixed(2)}, 间距列表: ${spacings.join(', ')}`);

  if (spacingCV < 0.3) {
    console.log(`[checkHorizontalArrangement] 间距比较一致(CV<0.3)，判定为水平排列`);
    return true;
  }

  // 如果节点数量少且垂直对齐良好，可能是水平排列
  if (nodes.length <= 3 && isVerticallyAligned) {
    console.log(`[checkHorizontalArrangement] 节点数量少(${nodes.length}<=3)且垂直对齐良好，判定为水平排列`);
    return true;
  }

  console.log(`[checkHorizontalArrangement] 不满足水平排列条件`);
  return false;
}

// 计算变异系数 (CV = 标准差/平均值)
function calculateCV(values: number[]): number {
  if (values.length === 0) return 0;
  const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
  if (avg === 0) return 0;

  const variance = values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  return stdDev / avg;
}

/**
 * 检查节点是否是垂直排列
 */
// 注释掉未使用的函数
/*
function checkVerticalArrangement(nodes: SchemaNode[]): boolean {
  // 函数实现...
}
*/

/**
 * 为一组节点生成唯一的组ID
 * 注意：此函数在当前实现中已不再使用，保留供未来扩展
 */
// function generateGroupId(nodes: SchemaNode[]): string {
//   // 使用节点ID组合生成唯一的组ID
//   return nodes.map(n => n.id).join('-');
// }

/**
 * 识别卡片组件
 * 注意：此函数在当前实现中已不再使用，保留供未来扩展
 */
// function identifyCardComponents(node: SchemaNode): void {
//   // 实现卡片组件识别逻辑
//   // 例如，检测具有特定样式特征的节点组合
// }

/**
 * 检测节点是否居中
 */
function detectCenteredElements(node: SchemaNode, parentNode: SchemaNode | null = null): boolean {
  if (!node || !parentNode || !parentNode.props?.style?.width) return false;

  const parentWidth = parentNode.props.style.width || 0;
  const nodeWidth = node.props?.style?.width || 0;
  const nodeX = node.props?.attrs?.x || 0;
  const parentX = parentNode.props?.attrs?.x || 0;

  // 计算相对位置
  const relativeX = nodeX - parentX;

  // 计算元素中心点与父元素中心点的距离
  const parentCenter = parentWidth / 2;
  const nodeCenter = relativeX + (nodeWidth / 2);

  // 允许一定误差
  const centeringThreshold = Math.min(20, parentWidth * 0.05);
  return Math.abs(parentCenter - nodeCenter) < centeringThreshold;
}

/**
 * 分析节点类型和语义
 */
function analyzeNodeSemantics(node: SchemaNode): { type: string; score: number } {
  // 检测是否为标题
  if (node.type === 'Text') {
    const fontSize = parseInt(node.props?.style?.fontSize || '0');
    const fontWeight = parseInt(node.props?.style?.fontWeight || '0');
    const yPosition = node.props?.attrs?.y || 0;

    // 标题评分：较大字号、较粗字重、位置靠上
    let titleScore = 0;
    if (fontSize >= 28) titleScore += 0.3;
    if (fontWeight >= 500) titleScore += 0.2;
    if (yPosition < 200) titleScore += 0.2;

    if (titleScore > 0.4) {
      return { type: 'title', score: titleScore };
    }
  }

  // 检测是否为数据指标组件
  if (node.type === 'Block' && node.children) {
    // 数值文本（通常较大字体）
    const hasNumericValue = node.children.some(child =>
      child.type === 'Text' &&
      /^\d+(\.\d+)?$/.test(child.props?.text || '') &&
      parseInt(child.props?.style?.fontSize || '0') > 30
    );

    // 单位文本
    const hasUnitText = node.children.some(child =>
      child.type === 'Text' &&
      ['kg', '%', '岁', 'cm'].some(unit => (child.props?.text || '').includes(unit))
    );

    // 状态文本
    const hasStatusText = node.children.some(child =>
      child.type === 'Text' &&
      ['偏高', '偏低', '正常'].some(status => (child.props?.text || '') === status)
    );

    if (hasNumericValue && (hasUnitText || hasStatusText)) {
      return { type: 'dataMetric', score: 0.8 };
    }
  }

  // 检测是否为卡片组件
  if (node.type === 'Block' && node.children && node.children.length > 3) {
    // 卡片特征：形状子元素、多个文本子元素
    const hasShapes = node.children.some(child => child.type === 'Shape');
    const textElements = node.children.filter(child => child.type === 'Text');

    if (hasShapes && textElements.length >= 2) {
      return { type: 'card', score: 0.7 };
    }
  }

  // 默认返回
  return { type: 'unknown', score: 0 };
}

/**
 * 增强的从Schema中提取布局特征
 */
function extractLayoutFeatures(enhancedSchema: SchemaNode): LayoutFeature[] {
  const features: LayoutFeature[] = [];

  // 节点遍历记录用于检测重复模式
  const nodePatterns = new Map<string, number>();

  // 记录水平排列组的信息
  const horizontalGroups: { id: string, nodes: SchemaNode[], description: string }[] = [];

  // 记录父子包含关系
  const containmentRelationships: { parentId: string, parentName: string, childIds: string[], description: string }[] = [];

  // 记录特殊UI组件，如标签组
  const tagGroups: { id: string, nodes: SchemaNode[], description: string }[] = [];

  // 递归提取特征
  function extractFromNode(node: SchemaNode, parent: SchemaNode | null = null, path: string[] = []) {
    if (!node) return;

    // 检测是否居中
    const isCentered = parent ? detectCenteredElements(node, parent) : false;
    if (isCentered) {
      node.layoutHints = node.layoutHints || {};
      node.layoutHints.centered = true;

      features.push({
        type: 'layout',
        description: `居中元素: ${node.name || node.id}`,
        importance: 8,
        elements: [node.id]
      });
    }

    // 分析节点语义
    const semantics = analyzeNodeSemantics(node);
    if (semantics.score > 0.4) {
      // 更新节点组件提示
      node.componentHints = node.componentHints || {};
      node.componentHints.type = semantics.type;
      node.componentHints.score = semantics.score;

      features.push({
        type: 'component',
        description: `${semantics.type === 'title' ? '标题' :
          semantics.type === 'dataMetric' ? '数据指标' :
            semantics.type === 'card' ? '卡片' : '组件'}: ${node.name || node.id}`,
        importance: 9,
        elements: [node.id]
      });
    }

    // 如果节点有组件提示，添加组件特征
    if (node.componentHints?.type && !semantics.type) {
      features.push({
        type: 'component',
        description: `发现${node.componentHints.type}组件`,
        importance: 8,
        elements: [node.id],
        styles: node.componentHints.styles
      });
    }

    // 如果节点有布局提示，添加布局特征
    if (node.layoutHints) {
      if (node.layoutHints.horizontalArrangement || node.layoutHints.horizontalFlex) {
        // 收集水平布局组信息
        const groupId = node.layoutHints.groupId || '';
        let group = horizontalGroups.find(g => g.id === groupId);

        if (!group) {
          group = {
            id: groupId || `horizontal-group-${horizontalGroups.length + 1}`,
            nodes: [],
            description: ''
          };
          horizontalGroups.push(group);
        }

        group.nodes.push(node);
        console.log(`[extractLayoutFeatures] 添加节点 ${node.name || node.id} 到水平布局组 ${groupId}`);

        features.push({
          type: 'layout',
          description: `水平布局元素: ${node.name || node.id}`,
          importance: 7,
          elements: [node.id]
        });
      }

      if (node.layoutHints.verticalArrangement || node.layoutHints.verticalFlex) {
        features.push({
          type: 'layout',
          description: `垂直布局组: ${node.layoutHints.groupId || node.id}`,
          importance: 7,
          elements: [node.id]
        });
      }
    }

    // 如果是文本节点，提取文本样式特征
    if (node.type === 'Text' && node.props?.style) {
      features.push({
        type: 'typography',
        description: `文本样式: ${node.name || node.id}`,
        importance: 6,
        styles: {
          fontSize: node.props.style.fontSize,
          fontFamily: node.props.style.fontFamily,
          fontWeight: node.props.style.fontWeight,
          color: node.props.style.color,
          lineHeight: node.props.style.lineHeight
        }
      });
    }

    // 分析父子包含关系
    if (parent && node.children && node.children.length > 0) {
      // 记录父子包含关系
      let relationshipDescription = "普通包含关系";
      let importance = 6;

      // 检查是否为标题+内容的包含关系
      const hasTitle = node.children.some(child =>
        child.type === 'Text' &&
        (child.name?.includes('标题') || child.name?.includes('title') ||
          (child.props?.style?.fontWeight && parseInt(child.props.style.fontWeight) >= 500))
      );

      if (hasTitle) {
        relationshipDescription = "标题+内容包含关系";
        importance = 8;
      }

      // 检查是否为表单项的包含关系
      const isFormItem =
        (node.name?.includes('表单') || node.name?.includes('form') || node.name?.includes('项')) &&
        node.children.some(child =>
          child.type === 'Text' &&
          (child.props?.text?.includes(':') || child.props?.text?.includes('：'))
        );

      if (isFormItem) {
        relationshipDescription = "表单项包含关系";
        importance = 8;
      }

      // 检查是否为消息框包含关系
      const isMessageBox =
        (node.name?.includes('留言') || node.name?.includes('message') || node.name?.includes('评论')) &&
        node.children.some(child => child.type === 'Shape') &&
        node.children.some(child => child.type === 'Text');

      if (isMessageBox) {
        relationshipDescription = "留言/评论框包含关系";
        importance = 9;
      }

      containmentRelationships.push({
        parentId: node.id,
        parentName: node.name || node.id,
        childIds: node.children.map(child => child.id),
        description: relationshipDescription
      });

      features.push({
        type: 'layout',
        description: `${relationshipDescription}: ${node.name || node.id} 包含 ${node.children.length} 个子元素`,
        importance: importance,
        elements: [node.id, ...node.children.map(child => child.id)]
      });
    }

    // 检测标签组
    if (node.children && node.children.length >= 2) {
      const childrenWithBg = node.children.filter(child =>
        child.props?.style?.backgroundColor &&
        child.props?.style?.borderRadius &&
        child.children?.some(grandChild => grandChild.type === 'Text')
      );

      // 检查是否为可能的标签组
      if (childrenWithBg.length >= 2) {
        // 检查这些元素是否有相似尺寸和样式
        const widths = childrenWithBg.map(c => c.props?.style?.width || 0);
        const heights = childrenWithBg.map(c => c.props?.style?.height || 0);
        const bgColors = childrenWithBg.map(c => c.props?.style?.backgroundColor);

        const widthCV = calculateCV(widths);
        const heightCV = calculateCV(heights);
        const hasSimilarSize = widthCV < 0.4 && heightCV < 0.2; // 允许宽度有较大差异

        // 检查是否有相似的背景色
        const uniqueColors = new Set(bgColors).size;
        const hasSimilarStyle = uniqueColors <= 2; // 允许有两种不同的背景色

        if (hasSimilarSize && hasSimilarStyle) {
          const tagGroup = {
            id: `tag-group-${tagGroups.length + 1}`,
            nodes: childrenWithBg,
            description: '标签组'
          };

          tagGroups.push(tagGroup);

          // 检查这些标签是否水平排列
          let isHorizontal = false;
          if (childrenWithBg.length >= 2) {
            const positions = childrenWithBg.map(c => ({
              x: c.props?.attrs?.x || 0,
              y: c.props?.attrs?.y || 0
            }));

            // 检查Y坐标是否相近
            const uniqueYs = new Set(positions.map(p => Math.round(p.y / 5) * 5)).size;
            isHorizontal = uniqueYs <= 2; // 允许有两行
          }

          if (isHorizontal) {
            features.push({
              type: 'layout',
              description: `水平排列的标签组: ${node.name || node.id}，⚠️ 注意保持水平排列，不要换行`,
              importance: 10, // 提高重要性
              elements: childrenWithBg.map(c => c.id)
            });
          } else {
            features.push({
              type: 'layout',
              description: `标签组: ${node.name || node.id}`,
              importance: 8,
              elements: childrenWithBg.map(c => c.id)
            });
          }
        }
      }
    }

    // 生成节点简化签名用于检测重复模式
    if (node.type === 'Block' && node.children && node.children.length > 2) {
      const signature = generateNodeSignature(node);
      nodePatterns.set(signature, (nodePatterns.get(signature) || 0) + 1);
    }

    // 递归处理子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach((child, index) => {
        extractFromNode(child, node, [...path, index.toString()]);
      });
    }
  }

  // 生成节点签名的辅助函数
  function generateNodeSignature(node: SchemaNode): string {
    if (!node || !node.children) return '';

    // 生成子节点类型统计，例如 "Block:2-Text:3-Shape:1"
    const childTypes: Record<string, number> = {};
    node.children.forEach(child => {
      childTypes[child.type] = (childTypes[child.type] || 0) + 1;
    });

    return Object.entries(childTypes)
      .map(([type, count]) => `${type}:${count}`)
      .join('-');
  }

  // 从根节点开始提取
  extractFromNode(enhancedSchema);

  // 添加水平组特征
  console.log(`[extractLayoutFeatures] 处理 ${horizontalGroups.length} 个水平组特征`);
  horizontalGroups.forEach((group, idx) => {
    if (group.nodes.length >= 2) {
      // 按X坐标排序节点，确保从左到右的顺序正确
      group.nodes.sort((a, b) => {
        const aX = a.props?.attrs?.x || 0;
        const bX = b.props?.attrs?.x || 0;
        return aX - bX;
      });

      console.log(`[extractLayoutFeatures] 水平组 ${idx + 1} (ID=${group.id}): 包含 ${group.nodes.length} 个节点`);
      console.log(`[extractLayoutFeatures] 节点列表(按X坐标排序): ${group.nodes.map(n => n.name || n.id).join(', ')}`);

      // 分析水平排列元素的特征 - 完全基于几何特性

      // 分析节点的几何特征
      const nodeWidths = group.nodes.map(n => n.props?.style?.width || 0);
      const nodeHeights = group.nodes.map(n => n.props?.style?.height || 0);
      const avgWidth = nodeWidths.reduce((sum, w) => sum + w, 0) / nodeWidths.length;
      const avgHeight = nodeHeights.reduce((sum, h) => sum + h, 0) / nodeHeights.length;
      const widthCV = calculateCV(nodeWidths);
      const heightCV = calculateCV(nodeHeights);

      // 检查是否为小型元素组（可能是标签、按钮等）
      const isSmallElements = avgWidth < 100 && avgHeight < 50;
      console.log(`[extractLayoutFeatures] 平均宽度=${avgWidth.toFixed(2)}, 平均高度=${avgHeight.toFixed(2)}, 是否小型元素=${isSmallElements}`);
      console.log(`[extractLayoutFeatures] 宽度CV=${widthCV.toFixed(2)}, 高度CV=${heightCV.toFixed(2)}`);

      // 检查是否有相似的样式特征（背景色、边框等）
      const hasSimilarStyles = group.nodes.filter(n =>
        n.props?.style?.backgroundColor ||
        n.props?.style?.borderRadius ||
        n.props?.style?.border
      ).length >= Math.floor(group.nodes.length / 2);

      console.log(`[extractLayoutFeatures] 是否有相似样式=${hasSimilarStyles}`);

      // 检查是否为文本元素组
      const textNodes = group.nodes.filter(n => n.type === 'Text');
      const isTextGroup = textNodes.length >= Math.floor(group.nodes.length / 2);
      console.log(`[extractLayoutFeatures] 文本节点数量=${textNodes.length}, 是否文本组=${isTextGroup}`);

      // 检查是否为标签组
      const isTagGroup = tagGroups.some(tg =>
        tg.nodes.some(n => group.nodes.includes(n))
      );

      // 检查元素间距是否非常小（紧密排列）
      const xPositions = group.nodes.map(n => n.props?.attrs?.x || 0);
      const widths = group.nodes.map(n => n.props?.style?.width || 0);
      let tightlyPacked = true;
      const gaps = [];

      for (let i = 1; i < group.nodes.length; i++) {
        const prevRight = (xPositions[i - 1] || 0) + (widths[i - 1] || 0);
        const currLeft = xPositions[i] || 0;
        const gap = currLeft - prevRight;
        gaps.push(gap);
        console.log(`[extractLayoutFeatures] 节点${i - 1}与节点${i}之间间距=${gap}px`);

        if (gap > 10) { // 如果间距大于10px，不算紧密排列
          tightlyPacked = false;
        }
      }

      // 计算间距的一致性
      const gapCV = calculateCV(gaps);
      console.log(`[extractLayoutFeatures] 间距变异系数=${gapCV.toFixed(2)}`);

      // 是否间距均匀
      const hasEvenSpacing = gapCV < 0.3 && gaps.length > 0;

      // 综合判断元素类型
      let elementTypeDesc = "水平组";
      let importanceScore = 7;

      if (isTagGroup) {
        elementTypeDesc = "标签组";
        importanceScore = 10; // 最高优先级
        console.log(`[extractLayoutFeatures] 判定为水平排列的标签组`);
      } else if (isSmallElements && hasSimilarStyles) {
        if (heightCV < 0.1) { // 高度非常一致
          elementTypeDesc = "相似UI元素组";
          importanceScore = 9; // 提高重要性
          console.log(`[extractLayoutFeatures] 判定为水平排列的相似元素组`);
        } else {
          elementTypeDesc = "交互元素组";
          importanceScore = 8;
          console.log(`[extractLayoutFeatures] 判定为水平排列的交互元素组`);
        }
      } else if (isTextGroup) {
        elementTypeDesc = "文本元素组";
        importanceScore = 8;
        console.log(`[extractLayoutFeatures] 判定为水平排列的文本元素组`);
      } else if (group.nodes.length >= 3) {
        elementTypeDesc = "多元素组";
        importanceScore = 8;
        console.log(`[extractLayoutFeatures] 判定为水平排列的多元素组`);
      }

      // 根据间距特征进一步细化描述
      let spacingDescription = "";
      if (tightlyPacked) {
        spacingDescription = "，元素紧密排列需保持在同一行";
        importanceScore = Math.min(importanceScore + 1, 10); // 提高重要性但不超过10
        console.log(`[extractLayoutFeatures] 元素紧密排列，需保持在同一行`);
      } else if (hasEvenSpacing) {
        // 间距一致但不紧密
        spacingDescription = "，元素间距均匀";
        console.log(`[extractLayoutFeatures] 元素间距均匀`);
      }

      // 如果元素大小非常一致，这是强烈的水平排列信号
      if (widthCV < 0.1 && heightCV < 0.1) {
        spacingDescription += "，元素大小一致";
        importanceScore = Math.min(importanceScore + 1, 10);
        console.log(`[extractLayoutFeatures] 元素大小一致，强烈的水平排列信号`);
      }

      // 组合生成最终描述
      const finalDescription = `水平排列的${elementTypeDesc}${spacingDescription}`;
      group.description = finalDescription;

      // 添加水平组布局特征
      features.push({
        type: 'layout',
        description: `${finalDescription}: 包含 ${group.nodes.length} 个元素`,
        importance: importanceScore,
        elements: group.nodes.map(n => n.id),
        styles: {
          tightlyPacked,
          hasEvenSpacing,
          averageGap: gaps.length ? gaps.reduce((sum, g) => sum + g, 0) / gaps.length : 0,
          elementType: elementTypeDesc
        }
      });
    }
  });

  // 分析重复模式
  Array.from(nodePatterns.entries())
    .filter(([, count]) => count > 1)
    .forEach(([signature, count]) => {
      console.log(`[extractLayoutFeatures] 检测到重复模式 "${signature}", 出现了 ${count} 次`);
      features.push({
        type: 'pattern',
        description: `重复模式: ${signature}, 出现 ${count} 次`,
        importance: Math.min(5 + count, 10)
      });
    });

  // 添加包含关系特征
  containmentRelationships.forEach(rel => {
    // 只添加重要的包含关系作为特征
    if (rel.description !== "普通包含关系") {
      features.push({
        type: 'layout',
        description: `${rel.description}: ${rel.parentName} 包含多个子元素`,
        importance: 8,
        elements: [rel.parentId, ...rel.childIds]
      });
    }
  });

  return features;
}

/**
 * 查找页面标题
 */
function findPageTitle(schema: SchemaNode): string {
  let bestTitle = '';
  let bestScore = 0;

  // 递归查找可能的标题文本
  function searchForTitle(node: SchemaNode) {
    if (!node) return;

    // 如果是文本节点，评估其作为标题的可能性
    if (node.type === 'Text' && node.props?.text) {
      const text = node.props.text;
      const fontSize = parseInt(node.props?.style?.fontSize || '0');
      const fontWeight = parseInt(node.props?.style?.fontWeight || '0');
      const yPos = node.props?.attrs?.y || 0;

      // 计算标题评分
      let score = 0;

      // 位置评分 - 标题通常在顶部
      if (yPos < 150) score += 0.3;

      // 字体大小评分 - 标题通常较大
      if (fontSize >= 28) score += 0.3;
      if (fontSize >= 32) score += 0.2;

      // 字体粗细评分 - 标题通常较粗
      if (fontWeight >= 500) score += 0.2;
      if (fontWeight >= 600) score += 0.1;

      // 文本长度评分 - 标题通常较短
      if (text.length > 0 && text.length <= 20) score += 0.2;

      // 居中评分 - 标题通常居中
      if (node.layoutHints?.centered) score += 0.3;

      // 更新最佳标题
      if (score > bestScore) {
        bestScore = score;
        bestTitle = text;
      }
    }

    // 递归处理子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach(searchForTitle);
    }
  }

  // 从根节点开始搜索
  searchForTitle(schema);

  return bestTitle;
}

/**
 * 分析页面主要区域结构
 */
function analyzePageStructure(schema: SchemaNode): {
  header: SchemaNode | null;
  content: SchemaNode[];
  footer: SchemaNode | null;
} {
  // 页面结构分析结果
  const structure: {
    header: SchemaNode | null;
    content: SchemaNode[];
    footer: SchemaNode | null;
  } = {
    header: null,
    content: [],
    footer: null
  };

  // 根据Y轴位置分析
  function analyzeByPosition(node: SchemaNode, depth = 0) {
    if (!node) return;

    const yPos = node.props?.attrs?.y || 0;
    const height = node.props?.style?.height || 0;

    // 头部区域通常在顶部
    if (yPos < 200 && node.type === 'Block') {
      if (!structure.header || yPos < ((structure.header.props?.attrs?.y as number) || 0)) {
        structure.header = node;
      }
    }

    // 内容区域通常在中部
    if (yPos >= 200 && yPos < 1500 && node.type === 'Block' && height > 200) {
      structure.content.push(node);
    }

    // 递归处理子节点(限制深度)
    if (node.children && node.children.length > 0 && depth < 3) {
      node.children.forEach(child => analyzeByPosition(child, depth + 1));
    }
  }

  // 从根节点开始分析
  analyzeByPosition(schema);

  // 按Y轴位置排序内容区域
  structure.content.sort((a, b) => {
    const aY = a.props?.attrs?.y as number || 0;
    const bY = b.props?.attrs?.y as number || 0;
    return aY - bY;
  });

  return structure;
}

/**
 * 分析布局模式
 */
function analyzeLayoutPatterns(schema: SchemaNode, layoutFeatures: LayoutFeature[]): string[] {
  const patterns: string[] = [];

  // 从布局特征中提取水平排列相关的模式
  const horizontalLayoutFeatures = layoutFeatures.filter(f =>
    f.type === 'layout' && f.description.includes('水平')
  );

  if (horizontalLayoutFeatures.length > 0) {
    patterns.push('检测到水平排列元素，应使用Flex布局或Row组件');

    // 检查是否有紧密排列的特征
    const tightHorizontalFeatures = horizontalLayoutFeatures.filter(f =>
      f.description.includes('紧密排列') || f.description.includes('元素紧密')
    );

    if (tightHorizontalFeatures.length > 0) {
      patterns.push('⚠️ 发现紧密水平排列元素，必须使用flex-wrap: nowrap确保元素不换行');
    }

    // 检查是否有均匀间距的特征
    const evenSpacedFeatures = horizontalLayoutFeatures.filter(f =>
      f.description.includes('均匀') || f.description.includes('一致')
    );

    if (evenSpacedFeatures.length > 0) {
      patterns.push('⚠️ 发现均匀间距的水平元素，应使用gap属性或justify-content: space-between');
    }

    // 检查是否有多元素水平排列
    const multiElementFeatures = horizontalLayoutFeatures.filter(f =>
      f.description.includes('多元素') && f.elements && f.elements.length >= 3
    );

    if (multiElementFeatures.length > 0) {
      patterns.push('⚠️ 发现多元素水平排列，注意元素间的精确间距和对齐，避免使用流式布局');
    }
  }

  // 提取居中对齐的模式
  const centeredFeatures = layoutFeatures.filter(f =>
    f.type === 'layout' && f.description.includes('居中')
  );

  if (centeredFeatures.length > 0) {
    patterns.push('检测到居中对齐元素，应使用适当的居中对齐CSS属性');

    // 检查是否有水平居中元素
    const horizontalCenteredFeatures = centeredFeatures.filter(f =>
      f.description.toLowerCase().includes('水平居中') ||
      (f.description.includes('居中') && f.description.includes('水平'))
    );

    if (horizontalCenteredFeatures.length > 0) {
      patterns.push('⚠️ 发现水平居中元素，使用justify-content: center实现');
    }

    // 检查是否有垂直居中元素
    const verticalCenteredFeatures = centeredFeatures.filter(f =>
      f.description.toLowerCase().includes('垂直居中') ||
      (f.description.includes('居中') && f.description.includes('垂直'))
    );

    if (verticalCenteredFeatures.length > 0) {
      patterns.push('⚠️ 发现垂直居中元素，使用align-items: center实现');
    }
  }

  // 检测网格布局模式
  function detectGridLayout(node: SchemaNode): boolean {
    if (!node.children || node.children.length < 4) return false;

    // 获取子节点的位置信息
    const childPositions = node.children.map(child => ({
      x: child.props?.attrs?.x || 0,
      y: child.props?.attrs?.y || 0,
      width: child.props?.style?.width || 0,
      height: child.props?.style?.height || 0
    }));

    // 按y坐标分组
    const rows = new Map<number, number>();
    childPositions.forEach(pos => {
      const roundedY = Math.round(pos.y / 10) * 10; // 允许10px的误差
      rows.set(roundedY, (rows.get(roundedY) || 0) + 1);
    });

    // 检查是否形成网格（至少2行，每行至少2个元素）
    const hasGrid = Array.from(rows.values()).filter(count => count >= 2).length >= 2;

    // 检查元素大小是否一致
    const widths = childPositions.map(p => p.width);
    const heights = childPositions.map(p => p.height);
    const widthCV = calculateCV(widths);
    const heightCV = calculateCV(heights);
    const hasSimilarSize = widthCV < 0.2 && heightCV < 0.2;

    return hasGrid && hasSimilarSize;
  }

  // 检测卡片列表布局
  function detectCardList(node: SchemaNode): boolean {
    if (!node.children || node.children.length < 2) return false;

    // 检查子节点是否具有卡片特征
    const cardLikeNodes = node.children.filter(child => {
      const style = child.props?.style || {};
      return (
        (style.backgroundColor || style.borderRadius || style.boxShadow) && // 视觉特征
        child.children && // 有内容
        child.children.length > 0 &&
        child.props?.style?.width && // 有固定宽度
        child.props?.style?.height // 有固定高度
      );
    });

    return cardLikeNodes.length >= 2;
  }

  // 检测表单布局
  function detectFormLayout(node: SchemaNode): boolean {
    if (!node.children) return false;

    // 计算可能的表单元素数量
    let formElementCount = 0;
    let hasSubmitButton = false;

    function isFormElement(n: SchemaNode): boolean {
      if (!n || !n.props?.style) return false;

      // 检查节点名称是否包含表单相关关键词
      const name = (n.name || '').toLowerCase();
      const hasFormName = name.includes('input') ||
        name.includes('select') ||
        name.includes('checkbox') ||
        name.includes('radio') ||
        name.includes('textarea') ||
        name.includes('form');

      // 检查是否是输入框样式（有边框和背景）
      const style = n.props.style;
      const hasInputStyle = Boolean(
        (style.border || style.borderRadius) &&
        style.backgroundColor
      );

      return hasFormName || hasInputStyle;
    }

    function isSubmitButton(n: SchemaNode): boolean {
      const name = (n.name || '').toLowerCase();
      return !!name.includes('submit') ||
        !!name.includes('button') ||
        !!(n.children && n.children.some(child =>
          child.type === 'Text' &&
          child.props?.text &&
          ['提交', '确定', '保存', '发送'].some(keyword =>
            child.props.text.includes(keyword)
          )
        ));
    }

    // 递归检查节点
    function checkNode(n: SchemaNode) {
      if (isFormElement(n)) formElementCount++;
      if (isSubmitButton(n)) hasSubmitButton = true;
      if (n.children) n.children.forEach(checkNode);
    }

    checkNode(node);

    // 判断是否是表单布局：至少有2个表单元素且有提交按钮
    return formElementCount >= 2 && hasSubmitButton;
  }

  // 递归检查布局模式
  function checkLayoutPatterns(node: SchemaNode) {
    if (!node) return;

    // 检测网格布局
    if (detectGridLayout(node)) {
      patterns.push('⚠️ 检测到网格布局，应使用Grid布局实现，注意：');
      patterns.push('  - 使用grid-template-columns定义列数');
      patterns.push('  - 使用gap属性设置网格间距');
      patterns.push('  - 考虑使用auto-fit/auto-fill实现响应式');
    }

    // 检测卡片列表
    if (detectCardList(node)) {
      patterns.push('⚠️ 检测到卡片列表布局，建议：');
      patterns.push('  - 使用Grid或Flex布局排列卡片');
      patterns.push('  - 统一卡片尺寸和间距');
      patterns.push('  - 实现响应式布局，根据屏幕宽度调整每行卡片数');
    }

    // 检测表单布局
    if (detectFormLayout(node)) {
      patterns.push('⚠️ 检测到表单布局，注意：');
      patterns.push('  - 使用语义化的form元素');
      patterns.push('  - 保持表单元素的垂直对齐');
      patterns.push('  - 统一表单元素的宽度和间距');
      patterns.push('  - 合理布局标签和输入框');
    }

    // 递归检查子节点
    if (node.children) {
      node.children.forEach(checkLayoutPatterns);
    }
  }

  // 从根节点开始检查布局模式
  checkLayoutPatterns(schema);

  // 从schema的layoutRelationships中提取模式
  if (schema.layoutRelationships) {
    // 分析水平组
    schema.layoutRelationships.horizontalGroups.forEach(group => {
      if (group.members.length >= 3) {
        patterns.push(`⚠️ 检测到水平组 ${group.id} 包含${group.members.length}个元素，应使用Flex容器`);
      }

      if (group.properties.spacing !== undefined) {
        const spacing = group.properties.spacing;
        if (spacing === 0) {
          patterns.push(`⚠️ 水平组 ${group.id} 的元素间距为0，元素应紧密相连`);
        } else if (spacing > 0 && spacing <= 8) {
          patterns.push(`⚠️ 水平组 ${group.id} 的元素间距较小(${spacing}px)，注意精确实现`);
        } else if (spacing > 8) {
          patterns.push(`⚠️ 水平组 ${group.id} 的元素间距为${spacing}px，应设置明确的gap或margin值`);
        }
      }

      // 检查对齐方式
      if (group.properties.alignment) {
        const alignment = group.properties.alignment;
        if (alignment === 'center') {
          patterns.push(`⚠️ 水平组 ${group.id} 元素居中对齐，应使用justify-content: center`);
        } else if (alignment === 'start' || alignment === 'left') {
          patterns.push(`⚠️ 水平组 ${group.id} 元素左对齐，应使用justify-content: flex-start`);
        } else if (alignment === 'end' || alignment === 'right') {
          patterns.push(`⚠️ 水平组 ${group.id} 元素右对齐，应使用justify-content: flex-end`);
        }
      }
    });

    // 分析垂直组
    if (schema.layoutRelationships.verticalGroups.length > 0) {
      patterns.push(`检测到${schema.layoutRelationships.verticalGroups.length}个垂直布局组，应使用纵向Flex布局`);

      schema.layoutRelationships.verticalGroups.forEach(group => {
        if (group.properties.spacing !== undefined && group.properties.spacing > 0) {
          patterns.push(`⚠️ 垂直组 ${group.id} 的元素间距为${group.properties.spacing}px，应设置明确的垂直间距`);
        }
      });
    }
  }

  // 检查重复元素模式
  const patternFeatures = layoutFeatures.filter(f => f.type === 'pattern');
  if (patternFeatures.length > 0) {
    patterns.push('⚠️ 检测到重复元素模式，应确保这些元素有一致的样式和布局实现');

    patternFeatures.forEach(pattern => {
      if (pattern.description.includes('出现') && /出现(\d+)次/.test(pattern.description)) {
        const match = pattern.description.match(/出现(\d+)次/);
        if (match && parseInt(match[1]) >= 3) {
          patterns.push('⚠️ 检测到大量重复元素，考虑使用列表组件或循环渲染');
        }
      }
    });
  }

  // 检查复杂的嵌套结构
  let maxDepth = 0;
  function calculateDepth(node: SchemaNode, depth = 0) {
    if (!node) return;

    if (depth > maxDepth) {
      maxDepth = depth;
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => calculateDepth(child, depth + 1));
    }
  }

  calculateDepth(schema);

  if (maxDepth >= 4) {
    patterns.push(`⚠️ 检测到复杂嵌套结构(深度${maxDepth})，注意保持正确的层级关系，不要扁平化处理`);
  }

  return patterns;
}

/**
 * 提取设计意图，帮助AI更好地理解设计师的目的
 */
function extractDesignIntent(schema: SchemaNode, layoutFeatures: LayoutFeature[]): {
  purpose: string;
  userFlow: string[];
  keyInteractions: string[];
  responsiveConsiderations: string[];
} {
  // 初始化结果结构
  const intent = {
    purpose: '未能明确确定页面目的',
    userFlow: [] as string[],
    keyInteractions: [] as string[],
    responsiveConsiderations: [] as string[]
  };

  // 尝试确定页面的目的
  // 1. 从页面标题推断
  const pageTitle = findPageTitle(schema);
  if (pageTitle) {
    // 根据标题关键词猜测页面目的
    const purposeKeywords: Record<string, string> = {
      '登录': '用户身份验证页面，目的是安全验证用户身份',
      '注册': '用户注册页面，目的是收集新用户信息',
      '首页': '应用主页，目的是提供核心功能入口和重要信息概览',
      '详情': '内容详情页，目的是展示特定项目的完整信息',
      '列表': '数据列表页，目的是展示多条数据记录',
      '设置': '设置页面，目的是允许用户自定义应用配置',
      '个人': '个人信息页，目的是展示和管理用户资料',
      '统计': '数据统计页，目的是可视化展示数据分析结果',
      '报告': '报告页面，目的是提供详细的数据或状态报告',
      '管理': '管理后台页面，目的是进行系统管理操作'
    };

    for (const [keyword, purpose] of Object.entries(purposeKeywords)) {
      if (pageTitle.includes(keyword)) {
        intent.purpose = purpose;
        break;
      }
    }
  }

  // 2. 从组件特征推断页面目的
  const componentFeatures = layoutFeatures.filter(f => f.type === 'component');

  // 检查是否有表单元素
  const hasFormElements = componentFeatures.some(f =>
    f.description.includes('表单') ||
    f.description.includes('输入') ||
    f.description.includes('按钮')
  );

  // 检查是否有数据展示元素
  const hasDataElements = componentFeatures.some(f =>
    f.description.includes('图表') ||
    f.description.includes('卡片') ||
    f.description.includes('指标')
  );

  // 检查是否有导航元素
  const hasNavElements = componentFeatures.some(f =>
    f.description.includes('导航') ||
    f.description.includes('菜单') ||
    f.description.includes('标签页')
  );

  if (intent.purpose === '未能明确确定页面目的') {
    if (hasFormElements && !hasDataElements) {
      intent.purpose = '数据输入页面，目的是收集用户输入的信息';
    } else if (hasDataElements && !hasFormElements) {
      intent.purpose = '数据展示页面，目的是向用户展示重要信息';
    } else if (hasNavElements) {
      intent.purpose = '导航页面，目的是帮助用户导航到不同功能区域';
    } else if (hasFormElements && hasDataElements) {
      intent.purpose = '交互式数据页面，目的是展示数据并允许用户进行操作';
    }
  }

  // 分析可能的用户流程
  // 查找按钮和可交互元素
  function findInteractiveElements(node: SchemaNode): string[] {
    const elements: string[] = [];

    if (!node) return elements;

    // 检查当前节点是否可能是交互元素
    if (node.type === 'Block' || node.type === 'Shape') {
      const hasInteractiveStyles = node.props?.style?.backgroundColor ||
        node.props?.style?.borderRadius ||
        node.props?.style?.boxShadow;

      const hasInteractiveName = node.name?.toLowerCase().includes('button') ||
        node.name?.toLowerCase().includes('btn') ||
        node.name?.toLowerCase().includes('link') ||
        node.name?.toLowerCase().includes('card');

      if (hasInteractiveStyles && hasInteractiveName) {
        // 尝试查找按钮文本
        let buttonText = '';
        if (node.children) {
          const textChild = node.children.find(c => c.type === 'Text');
          if (textChild && textChild.props?.text) {
            buttonText = textChild.props.text;
          }
        }

        elements.push(buttonText ? `交互元素: ${buttonText}` : `交互元素: ${node.name || '未命名'}`);
      }
    }

    // 递归处理子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        elements.push(...findInteractiveElements(child));
      });
    }

    return elements;
  }

  // 查找交互元素
  const interactiveElements = findInteractiveElements(schema);

  // 根据交互元素推断用户流程
  if (interactiveElements.length > 0) {
    intent.userFlow.push('用户可能的交互流程:');
    if (hasFormElements) {
      intent.userFlow.push('1. 用户填写表单数据');

      const submitButton = interactiveElements.find(e =>
        e.includes('提交') ||
        e.includes('确认') ||
        e.includes('保存') ||
        e.includes('登录') ||
        e.includes('注册')
      );

      if (submitButton) {
        intent.userFlow.push(`2. 点击"${submitButton.replace('交互元素: ', '')}"按钮提交数据`);
      } else {
        intent.userFlow.push('2. 点击提交按钮完成操作');
      }
    } else if (hasDataElements) {
      intent.userFlow.push('1. 用户查看数据展示');

      const detailButtons = interactiveElements.filter(e =>
        e.includes('详情') ||
        e.includes('查看') ||
        e.includes('展开')
      );

      if (detailButtons.length > 0) {
        intent.userFlow.push(`2. 点击"${detailButtons[0].replace('交互元素: ', '')}"查看详细信息`);
      }

      const actionButtons = interactiveElements.filter(e =>
        e.includes('操作') ||
        e.includes('编辑') ||
        e.includes('删除')
      );

      if (actionButtons.length > 0) {
        intent.userFlow.push(`3. 可能的操作: ${actionButtons.map(e => e.replace('交互元素: ', '')).join(', ')}`);
      }
    }
  }

  // 提取关键交互
  if (interactiveElements.length > 0) {
    intent.keyInteractions = interactiveElements.map(e => e.replace('交互元素: ', ''));
  }

  // 分析响应式考虑
  // 查找可能需要响应式处理的布局特征
  const horizontalLayoutFeatures = layoutFeatures.filter(f =>
    f.type === 'layout' && f.description.includes('水平')
  );

  if (horizontalLayoutFeatures.length > 0) {
    // 检查是否有多元素水平排列
    const multiElementHorizontal = horizontalLayoutFeatures.some(f =>
      (f.elements && f.elements.length >= 3) || f.description.includes('多元素')
    );

    if (multiElementHorizontal) {
      intent.responsiveConsiderations.push('⚠️ 水平排列的多元素组在小屏幕上可能需要调整为垂直排列');
    }

    // 检查是否有均匀间距的水平排列
    const evenSpacedHorizontal = horizontalLayoutFeatures.some(f =>
      f.description.includes('均匀') || f.description.includes('一致')
    );

    if (evenSpacedHorizontal) {
      intent.responsiveConsiderations.push('⚠️ 均匀间距的水平元素在不同屏幕宽度下应保持一致的间距比例');
    }
  }

  // 检查页面整体宽度
  const pageWidth = schema.props?.style?.width || 0;
  if (pageWidth > 1200) {
    intent.responsiveConsiderations.push('⚠️ 页面较宽，在小屏设备上需要适当调整布局和元素大小');
  }

  // 检查是否有卡片布局
  const hasCards = componentFeatures.some(f => f.description.includes('卡片'));
  if (hasCards) {
    intent.responsiveConsiderations.push('⚠️ 卡片布局应根据屏幕宽度调整每行显示的卡片数量');
  }

  return intent;
}

/**
 * 生成动态提示词
 */
async function generateDynamicPrompt(
  context: InitialWorkflowContext,
  enhancedSchema: SchemaNode,
  layoutFeatures: LayoutFeature[],
  pageStructure: { header: SchemaNode | null; content: SchemaNode[]; footer: SchemaNode | null }
): Promise<string> {
  // 提取布局模式
  const layoutPatterns = analyzeLayoutPatterns(enhancedSchema, layoutFeatures);
  // 提取设计意图
  const designIntent = extractDesignIntent(enhancedSchema, layoutFeatures);

  // 导入streamText
  const { streamText } = await import('ai');

  // 通知用户开始生成提示词
  context.stream.write("正在生成针对性的设计提示词...\n");

  // 系统提示词
  const systemPrompt = `你是一个专业的前端布局分析师，擅长分析设计稿的结构和布局关系。请基于我提供的设计分析信息，生成一个详细的布局描述和结构分析。

请以 Markdown 格式组织主要内容，按照以下结构：

## 输出内容结构
1. 开头简要总结页面的整体结构和核心功能
2. "水平排列组件分析"部分：
   - **重点分析并列出所有水平排列的元素ID**
   - **明确指出每个水平排列组中元素的前后顺序**
   - **提供水平排列元素的具体内容描述**
   - **强调必须严格按照设计稿中的水平排列关系实现**
   - 详细描述元素间的间距关系和对齐方式
3. "父子包含关系分析"部分：
   - **详细列出所有父子包含关系，精确到节点ID**
   - **明确警告哪些节点是父子包含关系而非平级关系**
   - **使用树状结构清晰展示节点的层级关系**
   - 强调父子关系实现的重要性
4. "区块组件分析"部分：
   - **识别卡片等区块组件，并强调这些组件应该让内容自动撑开高度**
   - **明确指出哪些组件不需要固定高度，应该由内容自然撑开**
   - 分析区块组件的边界和内部结构
5. "布局架构分析"部分：详细描述页面的整体布局结构，特别是：
   - 指出页面分区（头部、内容区、底部）的具体位置和特点
   - 明确说明关键节点的布局类型（水平、垂直、网格等）
   - 提供到具体节点ID级别的排版描述
   - 指出哪些元素需要居中对齐、两端对齐或其他特殊对齐方式
   - 分析重复出现的布局模式和组件结构
6. "关键组件详情"部分：重点分析特殊UI组件
   - 标签组：详细描述每组标签的排列方式，特别是需要水平排列的标签
   - 表单项：分析表单结构和输入区域
   - 留言框：分析留言相关区域的结构和包含关系
7. "实现优先级"部分：列出开发时应优先关注的关键点
   - 特别标注容易错误实现的布局点
   - 标注易被忽视的父子包含关系
8. "特别注意事项"部分：列出实现过程中容易被忽略的细节
   - 强调水平排列元素一定要保持水平且不换行
   - 标注父子包含关系的正确性
   - 提醒区块组件应自动撑开高度，不要固定高度

## 特别要求
1. **对于水平排列元素：必须明确列出每个水平组内部的所有节点ID及其从左到右的精确顺序，并强调每个组内部必须严格按照这种顺序实现，这决定了元素在页面上的实际视觉排列**
2. **对于父子包含关系：必须清晰说明哪些节点是包含关系，避免错误实现为平级关系，使用缩进或树状结构表示层级关系**
3. **对于卡片等区块组件：必须强调不要设置固定高度，让内部内容自然撑开高度**
4. **所有元素的具体间距和对齐方式应直接基于schema中的精确坐标数据，而非预计算的平均值**
5. **对于"水平组"的描述，强调的是组内元素的从左到右顺序，而不是水平组之间的关系**
6. 基于布局分析数据，精确指出哪些元素是水平排列、哪些是垂直排列
7. 详细分析每个水平/垂直布局组内部的节点顺序，这是正确实现布局的关键
6. 对容易被错误实现的布局提供明确警告
7. 明确指出哪些元素需要居中显示
8. 针对标签组等特殊UI组件提供详细的布局描述
9. 对重复出现的UI模式给出一致的描述
10. 注明响应式布局相关的考虑点
11. **严禁提供任何CSS、HTML或其他代码实现片段**
12. **不要提供任何具体的技术实现建议或代码片段**
13. **不要提及任何特定的CSS属性、类名或样式值**
14. **专注于"是什么"而非"怎么做"**
15. **不要生成任何代码示例，包括但不限于CSS、HTML、JavaScript、或任何前端框架代码**

## 注意事项与建议

为了确保开发者能够更好地理解设计，请在最后总结关键要点，提供具体的布局核心点和重点关注列表。

重点确保：
1. **清晰描述水平排列元素的ID、内容和顺序，强调严格按此布局实现**
2. **明确标识所有父子包含关系，避免错误实现为平级关系**
3. **强调区块组件(卡片等)应该让内容自然撑开高度，不设固定高度**
4. 提供清晰的布局结构描述，特别是对水平和垂直排列的元素
5. 指出容易出错的关键点，尤其是标签组、表单和父子包含关系
6. **绝对不要提供任何代码片段或技术实现方案**
7. 设计一个简单的核心点列表，帮助开发者理解设计结构

请基于提供的布局分析数据，生成一个全面、详细的布局描述文档。你的描述将直接影响开发者能否理解设计结构。`;

  // 用户消息构建
  const userMessage = `我需要你帮我分析一个设计稿的布局结构。以下是从设计稿中提取的布局特征和结构信息，请基于这些数据生成详细的布局描述：

## 页面整体结构
${pageStructure.header ? `头部区域: ${pageStructure.header.name || '未命名区域'} (类型: ${pageStructure.header.type}, ID: ${pageStructure.header.id})` : '未检测到明确的头部区域'}
内容区块: ${pageStructure.content.length}个主要内容区块
${pageStructure.content.map((node, index) => `  - 内容区块 ${index + 1}: ${node.name || '未命名区块'} (类型: ${node.type}, ID: ${node.id})`).join('\n')}
${pageStructure.footer ? `底部区域: ${pageStructure.footer.name || '未命名区域'} (类型: ${pageStructure.footer.type}, ID: ${pageStructure.footer.id})` : '未检测到明确的底部区域'}

## 布局模式分析
以下是识别出的关键布局模式：
${layoutPatterns.map(pattern => `- ${pattern}`).join('\n')}

## 关键布局特征
### 水平排列元素（重点关注！必须保持水平排列顺序）
${layoutFeatures
      .filter(f => f.type === 'layout' && f.description.includes('水平'))
      .map(f => `- ${f.description}${f.elements ? ` (节点ID: ${f.elements.join(', ')})` : ''}`)
      .join('\n') || '未检测到水平排列元素'}

⚠️ 特别注意：以上每个水平组内的节点必须按X坐标从左到右顺序排列，这决定了组件的实际视觉布局

### 垂直排列元素
${layoutFeatures
      .filter(f => f.type === 'layout' && f.description.includes('垂直'))
      .map(f => `- ${f.description}${f.elements ? ` (节点ID: ${f.elements.join(', ')})` : ''}`)
      .join('\n') || '未检测到垂直排列元素'}

### 居中对齐元素
${layoutFeatures
      .filter(f => f.type === 'layout' && (f.description.includes('居中') || f.description.includes('中心')))
      .map(f => `- ${f.description}${f.elements ? ` (节点ID: ${f.elements.join(', ')})` : ''}`)
      .join('\n') || '未检测到明确的居中对齐元素'}

### 父子包含关系（重点关注！避免错误实现为平级关系）
${layoutFeatures
      .filter(f => f.type === 'layout' && f.description.includes('包含关系'))
      .map(f => `- ${f.description}${f.elements ? ` (节点ID: ${f.elements.join(', ')})` : ''}`)
      .join('\n') || '未检测到明确的父子包含关系'}

### 标签组与特殊UI组件
${layoutFeatures
      .filter(f => f.type === 'layout' && (f.description.includes('标签组') || f.description.includes('表单项')))
      .map(f => `- ${f.description}${f.elements ? ` (节点ID: ${f.elements.join(', ')})` : ''}`)
      .join('\n') || '未检测到明确的标签组或特殊UI组件'}

## 布局关系详情
### 水平布局组内部节点详情（必须严格按照视觉顺序实现！）
${enhancedSchema.layoutRelationships?.horizontalGroups && enhancedSchema.layoutRelationships.horizontalGroups.length > 0 ?
      enhancedSchema.layoutRelationships.horizontalGroups.map((group) => {
        // 尝试获取组内节点的详细信息，包括X坐标和名称
        const nodeDetails = group.members.map(nodeId => {
          // 在schema中查找对应节点
          const findNode = (node: SchemaNode): SchemaNode | null => {
            if (node.id === nodeId) return node;
            if (node.children) {
              for (const child of node.children) {
                const found = findNode(child);
                if (found) return found;
              }
            }
            return null;
          };

          const node = findNode(enhancedSchema);
          return {
            id: nodeId,
            name: node?.name || '未命名元素',
            x: node?.props?.attrs?.x || 0
          };
        });

        // 按X坐标排序
        nodeDetails.sort((a, b) => a.x - b.x);

        // 构建有序的节点展示列表
        const orderedNodes = nodeDetails.map((node, index) =>
          `    ${index + 1}. ${node.id} ${node.name} (x: ${node.x})`
        ).join('\n');

        return `- **水平组 ${group.id}**（视觉从左到右顺序）：
  - 包含${group.members.length}个元素，按X坐标排序：
${orderedNodes}
  - ⚠️ 必须严格按照上述编号顺序排列元素，这决定了实际的视觉布局
    - ⚠️ 注意：不要机械地按照节点ID顺序处理，而是按照上面指定的视觉顺序实现`
      }).join('\n\n') : '未检测到水平布局组'}

### 垂直布局组内部节点详情
${enhancedSchema.layoutRelationships?.verticalGroups && enhancedSchema.layoutRelationships.verticalGroups.length > 0 ?
      enhancedSchema.layoutRelationships.verticalGroups.map(group => {
        // 尝试获取组内节点的详细信息，包括Y坐标和名称
        const nodeDetails = group.members.map(nodeId => {
          // 在schema中查找对应节点
          const findNode = (node: SchemaNode): SchemaNode | null => {
            if (node.id === nodeId) return node;
            if (node.children) {
              for (const child of node.children) {
                const found = findNode(child);
                if (found) return found;
              }
            }
            return null;
          };

          const node = findNode(enhancedSchema);
          return {
            id: nodeId,
            name: node?.name || '未命名元素',
            y: node?.props?.attrs?.y || 0
          };
        });

        // 按Y坐标排序
        nodeDetails.sort((a, b) => a.y - b.y);

        // 构建有序的节点展示列表
        const orderedNodes = nodeDetails.map((node, index) =>
          `    ${index + 1}. ${node.id} ${node.name} (y: ${node.y})`
        ).join('\n');

        return `- **垂直组 ${group.id}**（视觉从上到下顺序）：
  - 包含${group.members.length}个元素，按Y坐标排序：
${orderedNodes}
  - ⚠️ 必须严格按照上述编号顺序排列元素，这决定了实际的视觉布局
    - ⚠️ 注意：不要机械地按照节点ID顺序处理，而是按照上面指定的视觉顺序实现`
      }).join('\n\n') : '未检测到垂直布局组'}

### 节点级别layoutHints详情
${enhancedSchema.children && Array.isArray(enhancedSchema.children) ?
      enhancedSchema.children
        .filter((node: any) =>
          node.layoutHints?.horizontalArrangement ||
          node.layoutHints?.verticalArrangement ||
          node.layoutHints?.centered ||
          (node.layoutHints?.horizontalGroupMembers && node.layoutHints.horizontalGroupMembers.length > 0)
        )
        .map((node: any) =>
          `- 节点ID: ${node.id}, 名称: ${node.name || '未命名'}
  - 水平排列: ${node.layoutHints?.horizontalArrangement ? '是' : '否'}
  - 垂直排列: ${node.layoutHints?.verticalArrangement ? '是' : '否'}
  - 居中对齐: ${node.layoutHints?.centered ? '是' : '否'}
  - 水平组成员: ${node.layoutHints?.horizontalGroupMembers ? node.layoutHints.horizontalGroupMembers.join(', ') : '无'}`
        ).join('\n') : '未能获取layoutHints详情'}

### 区块组件分析（卡片等区块组件不应设置固定高度）
${layoutFeatures
      .filter(f => f.type === 'component' && (f.description.includes('卡片') || f.description.includes('区块') || f.description.includes('容器')))
      .map(f => `- ${f.description}${f.elements ? ` (节点ID: ${f.elements.join(', ')})` : ''}
  - ⚠️ 重要：这些区块组件应该让内容自然撑开高度，不要设置固定高度
  - ⚠️ 注意：只需设置宽度，高度应该由内容自动撑开`)
      .join('\n') || '未检测到明确的区块组件'}

### 间距和对齐特征
${layoutFeatures
      .filter(f => f.type === 'spacing')
      .map(f => `- ${f.description}`)
      .join('\n') || '未检测到明确的间距特征'}

## 特殊UI组件分析
${layoutFeatures
      .filter(f => f.type === 'layout' && (
        f.description.includes('标签组') ||
        f.description.includes('表单项') ||
        f.description.includes('留言/评论框')
      ))
      .map(f => {
        // 对于标签组特别强调水平排列
        if (f.description.includes('标签组') && f.description.includes('水平')) {
          return `- ${f.description}${f.elements ? ` (节点ID: ${f.elements.join(', ')})` : ''}
  - ⚠️ 重要：这些标签必须保持水平排列，不要换行
  - ⚠️ 注意：标签应该是同行显示，而不是垂直堆叠`;
        }
        // 对于留言框强调包含关系
        else if (f.description.includes('留言/评论框')) {
          return `- ${f.description}${f.elements ? ` (节点ID: ${f.elements.join(', ')})` : ''}
  - ⚠️ 重要：这是一个父子包含关系，不是平级关系
  - ⚠️ 注意：所有子元素都应该包含在父容器内`;
        }
        else {
          return `- ${f.description}${f.elements ? ` (节点ID: ${f.elements.join(', ')})` : ''}`;
        }
      })
      .join('\n') || '未检测到特殊UI组件'}

## 组件分析
识别到的关键组件：
${layoutFeatures
      .filter(f => f.type === 'component')
      .map(f => `- ${f.description}${f.elements ? ` (节点ID: ${f.elements.join(', ')})` : ''}`)
      .join('\n') || '未检测到明确的组件'}

## 设计令牌
### 颜色系统
${Object.entries((enhancedSchema as any).designTokens?.colors || {}).length > 0 ?
      Object.entries((enhancedSchema as any).designTokens?.colors || {})
        .map(([key, value]) => `- ${key}: ${value}`)
        .join('\n') :
      '未提取到颜色令牌'}

### 排版系统
${Object.entries((enhancedSchema as any).designTokens?.typography || {}).length > 0 ?
      Object.entries((enhancedSchema as any).designTokens?.typography || {})
        .map(([key, value]) => `- ${key}: ${value}`)
        .join('\n') :
      '未提取到排版令牌'}

### 间距系统
${Object.entries((enhancedSchema as any).designTokens?.spacing || {}).length > 0 ?
      Object.entries((enhancedSchema as any).designTokens?.spacing || {})
        .map(([key, value]) => `- ${key}: ${value}`)
        .join('\n') :
      '未提取到间距令牌'}

## 设计意图
${Array.isArray(designIntent) ?
      designIntent.map((intent: string) => `- ${intent}`).join('\n') :
      `- 目的: ${designIntent.purpose}
${designIntent.userFlow.length > 0 ? `- 用户流程: ${designIntent.userFlow.join(', ')}` : ''}
${designIntent.keyInteractions.length > 0 ? `- 关键交互: ${designIntent.keyInteractions.join(', ')}` : ''}
${designIntent.responsiveConsiderations.length > 0 ? `- 响应式考虑: ${designIntent.responsiveConsiderations.join(', ')}` : ''}`}

## 易错布局提示
1. ⚠️ 水平排列元素常被错误实现！必须严格保持水平排列且按照从左到右的顺序实现
2. ⚠️ 父子包含关系常被错误实现为平级关系！必须严格保持包含关系和层级结构
3. ⚠️ 区块组件(如卡片)常被错误设置固定高度！应该只设置宽度，让内容自然撑开高度

4. 检查水平组成员的方法：
   - 确认元素按照设计稿的顺序水平排列(从左到右)
   - 元素之间保持正确的间距
   - 严格按照提供的节点ID顺序实现

5. 检查父子包含关系的方法：
   - 确认父元素包含所有子元素，不要将父子元素实现为平级关系
   - 使用适当的嵌套结构表示父子关系
   - 特别注意ID为特殊UI组件的父子包含关系

6. 特别注意这些容易错误实现的布局点：
   - 间距很大的水平布局组(仍需保持水平排列)
   - 包含4个以上元素的水平组(必须保持水平顺序)
   - 间距为0的水平组(元素需紧密相连)
   - 卡片等区块组件(不要设置固定高度)


请基于以上信息，生成一个详细的布局描述文档，帮助开发者理解这个设计稿的结构。请着重分析：
1. 水平排列元素的ID、内容及前后顺序，并强调必须严格按此顺序实现
2. 所有父子包含关系，明确指出避免错误实现为平级关系
3. 区块组件(如卡片)应该让内容自然撑开高度，不设固定高度

请确保包含所有关键布局分析、组件结构描述、常见错误警告和核心点列表，以确保开发者能正确理解所有布局关系。

记住：不要提供任何具体的代码示例或技术实现方案，只描述"是什么"，不要描述"怎么做"。不要生成任何CSS、HTML或前端框架代码片段，也不要提及具体的CSS属性或样式值。`;

  // 创建流式生成
  const stream = await streamText({
    system: systemPrompt,
    model: context.query.aiModel,
    messages: [{
      role: 'user',
      content: userMessage
    }],
    temperature: 0.7,
  });

  // 用于存储完整生成结果
  let completion = "";

  // 逐步处理生成内容
  for await (const part of stream.textStream) {
    try {
      process.stdout.write(part || "");
      const chunk = part || "";
      // 将内容写入流
      // context.stream.write(chunk);
      // 同时保存到完整结果
      completion += chunk;
    } catch (e) {
      console.error(e);
    }
  }

  // 通知生成完成
  context.stream.write("\n\n设计提示词生成完成\n");

  // 保存到本地文件
  fs.writeFileSync("dynamic-prompt.md", completion);

  // 返回完整生成结果
  return completion;
}

/**
 * 深度分析Figma设计，将原始Figma数据转换为标准化Schema
 * 是Figma组件生成工作流的第一步
 */
export const analyzeFigmaDesign = async (
  context: InitialWorkflowContext
): Promise<FigmaAnalysisWorkflowContext> => {
  context.stream.write("开始处理Figma设计...\n")

  if (!context.query.figmaDesign) {
    throw new Error("Figma设计信息缺失，无法执行分析")
  }

  try {
    // 1. 获取和预处理Figma数据
    const figmaDesign = context.query.figmaDesign
    let nodeData = figmaDesign.nodeData

    // 如果没有节点数据，尝试获取设计上下文
    if (!nodeData) {
      context.stream.write("获取Figma设计数据...\n")
      try {
        const figmaContext = await getFigmaDesignContext({
          fileUrl: figmaDesign.figmaUrl,
          nodeId: figmaDesign.nodeId,
          includeStyles: true
        })

        // 确保我们有正确的JSON字符串
        if (typeof figmaContext.context === 'object') {
          nodeData = JSON.stringify(figmaContext.context, null, 2)
        } else {
          nodeData = figmaContext.context
        }
        console.log("获取到的Figma设计数据:", nodeData.substring(0, 200) + "...")
      } catch (error) {
        console.error("获取Figma设计上下文失败:", error)
        throw new Error("获取Figma设计数据失败")
      }
    } else if (typeof nodeData === 'object') {
      // 如果nodeData已经是对象，确保我们将其转换为字符串
      nodeData = JSON.stringify(nodeData, null, 2)
    }

    // 验证nodeData
    if (!nodeData || nodeData === '[object Object]') {
      throw new Error("Figma设计数据格式不正确，无法进行分析")
    }

    // 2. 使用转换工具将Figma数据转换为标准化Schema
    context.stream.write("转换Figma数据为标准Schema...\n");

    // 使用转换工具生成标准Schema
    console.log("开始转换Figma数据为标准Schema...");
    const previewImageUrl = figmaDesign.previewImage;

    // 使用 transformFigmaJsonToSchema 处理字符串形式的数据
    const standardSchema = transformFigmaJsonToSchema(nodeData);

    // 如果有预览图，添加到schema中
    if (previewImageUrl) {
      standardSchema.previewImageURL = previewImageUrl;
    }

    // 3. 深度分析Schema结构和布局关系
    context.stream.write("深度分析Schema布局关系...\n");
    console.log("开始分析布局关系和组件特征...");

    // 分析布局关系并添加到schema顶层
    const layoutRelationships = analyzeLayoutRelationships(standardSchema as unknown as SchemaNode);
    (standardSchema as any).layoutRelationships = layoutRelationships;

    console.log("布局分析完成，已添加布局关系到schema顶层");
    context.stream.write("布局分析完成\n");

    // 输出转换后的Schema示例（长度限制）
    const schemaStr = JSON.stringify(standardSchema, null, 2);
    // console.log("增强后的Schema示例(前1000字符):", schemaStr.substring(0, 1000) + "...");
    console.log(`转换和分析完成！生成了一个包含${standardSchema.children?.length || 0}个顶层节点的增强Schema`);

    // schema 存到本地
    fs.writeFileSync("enhanced-schema.json", schemaStr);

    // 4. 使用AI生成基于布局分析的动态提示词
    console.log("开始生成动态提示词...");

    // 提取布局特征
    const layoutFeatures = extractLayoutFeatures(standardSchema);
    console.log("layoutFeatures", layoutFeatures);

    // 新增：分析页面主结构
    const pageStructure = analyzePageStructure(standardSchema);

    // 使用用户指定的AI模型或默认模型
    const dynamicPrompt = await generateDynamicPrompt(
      context,
      standardSchema,
      layoutFeatures,
      pageStructure
    );

    console.log("动态提示词生成完成:", dynamicPrompt);

    // 保存动态提示词到本地，方便查看
    context.stream.write("设计提示词生成完成\n");

    // 移除了提示词评估部分，不再使用自动评分系统

    // 5. 返回包含增强Schema和动态提示词的上下文
    return {
      stream: context.stream,
      query: context.query,
      state: {
        figmaAnalysis: {
          // 创建最小化的布局结构，但包含增强的布局信息
          layout: {
            id: standardSchema.id,
            name: standardSchema.name || "Root Layout",
            type: "ROOT_LAYOUT",
            x: standardSchema.props?.attrs?.x || 0,
            y: standardSchema.props?.attrs?.y || 0,
            width: standardSchema.props?.style?.width || 0,
            height: standardSchema.props?.style?.height || 0,
            styles: {},
            children: []
          },
          uiElements: [],
          designTokens: {
            colors: {},
            typography: {},
            spacing: {}
          }
        },
        standardSchema: standardSchema,
        dynamicPrompt: dynamicPrompt  // 保持原始文本格式
      }
    } as unknown as FigmaAnalysisWorkflowContext;
  } catch (error) {
    console.error("Figma设计处理失败:", error)
    throw error
  }
}

// 评估提示词质量的代码已被移除，改为使用AI手动评估