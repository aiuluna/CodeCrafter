// 基础工作流上下文接口
export interface WorkflowContext {
  stream: {
    write: (text: string) => void;
    close: () => void;
  };
  query: Record<string, any>;
  state?: Record<string, any>;
}

// 初始工作流上下文
export interface InitialWorkflowContext extends WorkflowContext {
  query: {
    figmaDesign?: {
      figmaUrl: string;
      nodeId?: string;
      nodeData?: string | object;
      previewImage?: string;
    };
    [key: string]: any;
  };
  state?: Record<string, any>;
}

// 添加DynamicPrompt接口定义
export interface DynamicPrompt {
  content: string;  // 添加content属性，存储完整的提示词文本
  instructions: string[];
  layoutTips?: string[];  // 设为可选
  styleTips?: string[];   // 设为可选
  componentTips?: string[];  // 设为可选
  spacingTips?: string[];  // 设为可选
  accessibilityTips?: string[]; // 添加可访问性提示
  responsiveTips?: string[]; // 添加响应式设计提示
}

// 在FigmaAnalysisWorkflowContext的state类型中添加dynamicPrompt
export interface FigmaAnalysisWorkflowContext extends WorkflowContext {
  state: {
    figmaAnalysis: {
      layout: {
        id: string;
        name: string;
        type: string;
        x: number;
        y: number;
        width: number;
        height: number;
        styles: Record<string, any>;
        children: any[];
      };
      uiElements: any[];
      designTokens: {
        colors: Record<string, any>;
        typography: Record<string, any>;
        spacing: Record<string, any>;
      };
    };
    standardSchema: any;
    dynamicPrompt?: DynamicPrompt; // 添加动态提示词字段
  };
}

// 设计处理工作流上下文
export interface DesignProcessingWorkflowContext extends WorkflowContext {
  state: {
    figmaAnalysis?: FigmaAnalysisWorkflowContext['state']['figmaAnalysis'];
    designTask?: {
      componentName?: string;
      componentDescription?: string;
      library?: Array<{
        name: string;
        components: string[];
        description: string;
      }>;
      retrievedAugmentationContent?: any;
    };
    standardSchema?: any;
    dynamicPrompt?: DynamicPrompt;
  };
}

// 生成处理工作流上下文
export interface GenerateProcessingWorkflowContext extends WorkflowContext {
  state: {
    designTask?: DesignProcessingWorkflowContext['state']['designTask'];
    generatedCode?: string;
  };
}


import { CodegenRule } from "@/lib/db/codegen/types"
import { LanguageModel } from "ai"
import { Prompt } from "@/lib/db/componentCode/types"

// 添加DynamicPrompt接口定义
export interface DynamicPrompt {
  content: string;  // 保存完整的提示词文本
  instructions: string[];
  layoutTips?: string[];  // 设为可选
  styleTips?: string[];   // 设为可选
  componentTips?: string[];  // 设为可选
  spacingTips?: string[];  // 设为可选
  accessibilityTips?: string[]; // 添加可访问性提示
  responsiveTips?: string[]; // 添加响应式设计提示
}
export interface FigmaDesign {
  figmaUrl: string
  previewImage?: string
  nodeId?: string
  designContext?: string
  nodeData?: string
}

// 基础的查询类型
type WorkflowQuery = {
  prompt: Prompt[]
  aiModel: LanguageModel
  rules: CodegenRule[]
  userId: string
  codegenId?: string
  figmaDesign?: FigmaDesign
  component?: {
    id: string
    name: string
    code: string
    prompt: Prompt[]
  }
}



// Figma相关类型

// 布局元素类型
export interface LayoutElement {
  id: string
  name: string
  type: string
  x: number
  y: number
  width: number
  height: number
  styles?: Record<string, any>
  children?: LayoutElement[]
}

// UI元素类型
export interface UIElement {
  id: string
  name: string
  type: string
  x: number
  y: number
  width: number
  height: number
  styles?: Record<string, any>
  properties?: Record<string, any>
  children?: UIElement[]
}

// Figma结构化数据类型
export interface StructuredFigmaData {
  texts?: Array<{
    id: string
    content: string
    type?: string
  }>
  measurements?: Array<{
    id: string
    value: string
    unit?: string
    status?: string
  }>
  labels?: Array<{
    id: string
    text: string
    category?: string
  }>
  buttons?: Array<{
    id: string
    text: string
  }>
}

// Figma分析结果
export interface FigmaAnalysisResult {
  layout: LayoutElement
  uiElements: UIElement[]
  designTokens: {
    colors: Record<string, string>
    typography: Record<string, any>
    spacing: Record<string, any>
  }
  interactionPatterns?: Array<any>
  componentMapping?: Array<any>
  accessibilityNotes?: Record<string, any>
  structuredData?: StructuredFigmaData
}

// 组件映射结果
export interface ComponentMappingResult {
  mappings: Array<{
    uiElementId: string
    componentName: string
    componentLibrary: string
    properties: Record<string, any>
  }>
  componentStructure: {
    root: string // 根组件ID
    hierarchy: Record<string, string[]> // 记录每个组件的子组件
  }
}

// Figma工作流状态类型
export interface FigmaWorkflowState {
  figmaAnalysis?: FigmaAnalysisResult
  componentMapping?: ComponentMappingResult
  generatedCode?: string
}


// 组件映射阶段的工作流上下文
export type ComponentMappingWorkflowContext = {
  stream: {
    write: (chunk: string) => void
    close: () => void
  }
  query: WorkflowQuery
  state: {
    figmaAnalysis: FigmaAnalysisResult
    componentMapping: ComponentMappingResult
  }
}

// Figma工作流上下文
export type FigmaWorkflowContext = {
  stream: {
    write: (chunk: string) => void
    close: () => void
  }
  query: WorkflowQuery
  state: FigmaWorkflowState
}
