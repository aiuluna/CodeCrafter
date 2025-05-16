import { pipe } from "./utils/pipe"
import { withErrorHandling } from "./utils/errorHandling"
import { designComponent, generateComponent, storeComponent } from "./steps"
import {
  InitialWorkflowContext
} from "./type"
import { analyzeFigmaDesign, mapComponentLibrary } from "./steps/figma"

// 普通组件工作流
export const componentWorkflow = pipe(
  withErrorHandling(designComponent),
  withErrorHandling(generateComponent),
  withErrorHandling(storeComponent),
)

// Figma组件工作流
export const figmaComponentWorkflow = pipe(
  withErrorHandling(analyzeFigmaDesign),
  withErrorHandling(mapComponentLibrary),
  withErrorHandling(storeComponent)
)

export async function run(context: InitialWorkflowContext) {
  try {
    // 根据是否有Figma设计信息决定使用哪个工作流
    if (context.query.figmaDesign) {
      console.log("使用Figma组件工作流")
      const result: any = await figmaComponentWorkflow(context)
      return {
        success: true,
        data: result.state,
      }
    } else {
      console.log("使用标准组件工作流")
      const result: any = await componentWorkflow(context)
      return {
        success: true,
        data: result.state,
      }
    }
  } catch (error: any) {
    console.error("Workflow failed:", error)
    context.stream.write(error.toString())
    context.stream.close()
    return {
      success: false,
      error: error.message || "未知错误",
    }
  }
}
