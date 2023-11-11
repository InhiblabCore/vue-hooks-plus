import { baseParse, ElementNode, AttributeNode } from '@vue/compiler-core';

export function parseProps(content: string) {
  const ast = baseParse(content);
  const demoElement = ast.children[0] as ElementNode;

  const props = getPropsMap(demoElement.props as AttributeNode[]);

  return props;
}

function getPropsMap(attrs: AttributeNode[]) {
  const map: Record<string, string | undefined> = {};
  for (const { name, value } of attrs) {
    map[name] = value?.content;
  }
  return map;
}
