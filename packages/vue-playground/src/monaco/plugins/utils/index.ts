import type { HTMLPluginCompletion } from '../types'

export function isCursorInHTMLAttribute({ html, document, position }: HTMLPluginCompletion) {
  const currentNode = html.findNodeAt(document.offsetAt(position))

  if (currentNode.start && currentNode.endTagStart) {
    const start = document.positionAt(currentNode.start)
    const end = document.positionAt(currentNode.endTagStart)
    const tag = document.getText({ start, end })

    if (!currentNode.attributes)
      return false

    const attrs = Object.entries(currentNode.attributes).map(([key, value]) => `${key}=${value}`)
    const indexes = attrs.map((attr) => {
      return [...tag.matchAll(new RegExp(attr, 'gi'))]
        .map(x => ({
          start: x.index,
          end: x[0].length + (x.index || 0),
        })).flat()
    }).flat()

    return indexes.some(({ start, end }) => position.character >= start! && position.character <= end!)
  }

  return false
}
