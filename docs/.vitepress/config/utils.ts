import { baseParse, ElementNode, AttributeNode } from '@vue/compiler-core';

export function parseProps(content: string) {
  const ast = baseParse(content);
  const demoElement = ast.children[0] as ElementNode;

  // 添加props存在性检查
  if (!demoElement.props || !Array.isArray(demoElement.props)) {
    return {};
  }

  const props = getPropsMap(demoElement.props as AttributeNode[]);
  return props;
}

function getPropsMap(attrs: AttributeNode[]) {
  const map: Record<string, string | undefined> = {};

  // 添加attrs可迭代检查
  if (!attrs || !Array.isArray(attrs)) {
    return map;
  }

  for (const { name, value } of attrs) {
    map[name] = value?.content;
  }
  return map;
}