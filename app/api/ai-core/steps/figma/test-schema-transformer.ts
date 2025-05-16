/**
 * 测试Figma数据结构转换器
 * 这个文件用于测试新的Figma数据转换方法与现有方法的比较
 */

import { transformFigmaJsonToSchema, generateSchemaDiagnostics } from './figma-schema-transformer';

/**
 * 测试转换方法
 * @param figmaDataJson Figma原始数据JSON字符串
 */
export async function testSchemaTransformer(figmaDataJson: string) {
  console.log("开始测试Figma Schema转换...");

  try {
    // 解析Figma数据
    const figmaData = JSON.parse(figmaDataJson);
    console.log(`成功解析Figma数据，包含${figmaData.nodes?.length || 0}个顶层节点`);

    // 使用新方法转换
    console.time('schema-transform');
    const schema = transformFigmaJsonToSchema(figmaDataJson);
    console.timeEnd('schema-transform');

    // 生成诊断信息
    const diagnostics = generateSchemaDiagnostics(figmaData, schema);

    // 输出诊断结果
    console.log("转换诊断结果:", JSON.stringify(diagnostics, null, 2));

    // 输出schema的部分内容
    const schemaStr = JSON.stringify(schema, null, 2);
    console.log("转换后的Schema示例(前1000字符):\n", schemaStr.substring(0, 1000) + "...");

    // 输出完整schema到控制台，可以复制使用
    console.log("\n完整Schema (复制后可用于测试):\n", schemaStr);

    return {
      success: true,
      schema,
      diagnostics
    };
  } catch (error) {
    console.error("Schema转换测试失败:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * 命令行测试入口函数
 * 可以从命令行运行：
 * ts-node test-schema-transformer.ts [figmaJsonFilePath]
 */
async function main() {
  // 如果在命令行运行，读取文件
  if (process.argv.length > 2) {
    const fs = require('fs');
    const filePath = process.argv[2];

    try {
      const data = fs.readFileSync(filePath, 'utf8');
      await testSchemaTransformer(data);

      console.log(`\n转换完成，Schema已生成。可使用此Schema进行页面生成测试。`);
      process.exit(0);
    } catch (err) {
      console.error('读取文件或测试过程中出错:', err);
      process.exit(1);
    }
  } else {
    console.log('请提供Figma JSON文件路径作为参数');
    process.exit(1);
  }
}

// 如果直接运行此文件，则执行main函数
if (require.main === module) {
  main();
} 