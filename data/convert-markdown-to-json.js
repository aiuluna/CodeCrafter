const fs = require('fs');
const path = require('path');

// 读取Markdown文件
const markdownPath = path.join(__dirname, 'arieui-markdown.md');
const markdownContent = fs.readFileSync(markdownPath, 'utf8');

// 读取JSON文件
const jsonPath = path.join(__dirname, 'ariesui-codegen.json');
const jsonContent = fs.readFileSync(jsonPath, 'utf8');
const jsonData = JSON.parse(jsonContent);

// 提取组件文档
function extractComponentDocs(markdown) {
  const componentDocs = {};

  // 使用<!-- RAG SPLIT -->分隔各个组件文档
  const componentSections = markdown.split('<!-- RAG SPLIT -->');

  for (const section of componentSections) {
    if (!section.trim()) continue;

    // 提取组件名称 - 查找形如 "# ArButton 按钮" 或 "# Button 按钮" 的标题
    const titleMatch = section.match(/^# ([\w]+)[\s]*(.*)/m);
    if (!titleMatch) continue;

    let componentName = titleMatch[1];
    // 如果组件名称不是以Ar开头，则添加Ar前缀
    if (!componentName.startsWith('Ar')) {
      componentName = 'Ar' + componentName;
    }

    // 提取描述信息 - 在"## 描述信息（When to use）"后的第一段非空文本
    let description = "";
    const descriptionMatch = section.match(/## 描述信息[（(]When to use[)）]\s*\n\n([^\n]+)/);
    if (descriptionMatch) {
      description = descriptionMatch[1].trim();
    }

    // 提取使用示例部分 - 从"## 使用示例（Examples）"开始到"## API"或下一个主标题
    let examples = "";
    // 这里改进正则表达式，确保它可以捕获包括代码块在内的所有内容
    const examplesSection = section.match(/## 使用示例[（(]Examples[)）]([\s\S]*?)(?=## API|$)/);
    if (examplesSection && examplesSection[1]) {
      examples = examplesSection[1].trim();
    }

    // 提取API部分 - 从"## API"开始到下一个主标题或文档结束
    let apiContent = "";
    const apiMatch = section.match(/## API([\s\S]*?)(?=$)/);
    if (apiMatch) {
      apiContent = apiMatch[1].trim();
    }

    // 合并使用示例和API，如果两者都存在
    let fullApiContent = "";
    if (examples && apiContent) {
      fullApiContent = `## 使用示例（Examples）\n\n${examples}\n\n## API\n\n${apiContent}`;
    } else if (examples) {
      fullApiContent = `## 使用示例（Examples）\n\n${examples}`;
    } else if (apiContent) {
      fullApiContent = apiContent;
    }

    // 如果组件名称有效且不是类似"快速开始"这样的非组件内容
    if (componentName && !componentName.match(/Ar快速开始|Ar主题与全局变量|Ar字体|Ar更新日志/)) {
      componentDocs[componentName] = {
        description,
        api: fullApiContent
      };
    }
  }

  return componentDocs;
}

// 获取组件文档
const componentDocs = extractComponentDocs(markdownContent);

// 更新JSON数据
if (jsonData.rules && jsonData.rules.length > 0) {
  const privateComponentsRule = jsonData.rules.find(rule => rule.type === 'private-components');
  if (privateComponentsRule && privateComponentsRule.docs && privateComponentsRule.docs['@lefit/aries-ui']) {
    const components = privateComponentsRule.docs['@lefit/aries-ui'];

    // 合并组件文档
    for (const [componentName, componentDoc] of Object.entries(componentDocs)) {
      if (components[componentName]) {
        // 更新现有组件
        components[componentName].description = componentDoc.description;
        components[componentName].api = componentDoc.api;
        console.log(`Updated ${componentName}`);
      } else {
        // 添加新组件
        components[componentName] = componentDoc;
        console.log(`Added ${componentName}`);
      }
    }
  }
}

// 写入JSON文件 - 保持整体JSON的格式化
fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8');

console.log('Conversion completed. Components added to JSON file.'); 