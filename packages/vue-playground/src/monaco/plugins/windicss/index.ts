import { Processor } from 'windicss/lib'
import { CompletionItemKind, CompletionItem, TextDocument, Position } from 'vscode-html-languageservice'
import type { HTMLPlugin } from '../types'
import { generateCompletions } from './utils/completions'
import { patterns } from './utils/fileTypes'
import { isAttrVariant, isAttrUtility } from './utils'

const pattern = patterns.html

const processor = new Processor()
const variants = processor.resolveVariants()
const _completions = generateCompletions(processor, null, true)

function attrKey(label: string, kind: CompletionItemKind, order: number): CompletionItem {
  return {
    label,
    kind,
    sortText: `${order}-${label}`,
    insertText: `${label}=""`,
  }
}

const resolveVariants = (document: TextDocument, position: Position) => {
  const text = document.getText({
    start: { line: 0, character: 0 },
    end: position,
  })

  if ((!pattern || text.match(pattern) === null) && text.match(patterns.html) === null) {
    const key = text.match(/\S+(?=\s*=\s*["']?[^"']*$)/)?.[0]
    if (!key || !(isAttrVariant(key, variants)))
      return []
  }

  return [
    ..._completions.static.map((classItem, index) => ({
      label: classItem,
      kind: CompletionItemKind.Constant,
      sortText: `1-${index.toString().padStart(8, '0')}`,
    })),

    ...Object.keys(variants).map((variant, index) => ({
      label: variant,
      kind: CompletionItemKind.Module,
      detail: variant,
      sortText: `2-${index.toString().padStart(8, '0')}`,
    })),

    ..._completions.color.map(({ label, doc }, index) => ({
      label,
      kind: CompletionItemKind.Color,
      sortText: `0-${index.toString().padStart(8, '0')}`,
      documentation: doc,
    })),

    ..._completions.bracket.map((label, index) => ({
      label,
      kind: CompletionItemKind.Struct,
      sortText: `3-${index.toString().padStart(8, '0')}`,
    })),

    ..._completions.dynamic.map(({ label }, index) => ({
      label,
      kind: CompletionItemKind.Variable,
      sortText: `4-${index.toString().padStart(8, '0')}`,
    })),
  ]
}

const resolveAttrKeys = (document: TextDocument, position: Position) => {
  const text = document.getText({
    start: { line: 0, character: 0 },
    end: position,
  })

  if (text.match(/(<\w+\s*)[^>]*$/) !== null) {
    if (!text.match(/\S+(?=\s*=\s*["']?[^"']*$)/) || text.match(/<\w+\s+$/)) {
      return [
        ...Object.keys(_completions.attr.static)
          .map(label => attrKey(label, CompletionItemKind.Field, 0)),

        ...Object.keys(variants)
          .map(label => attrKey(label, CompletionItemKind.Module, 1)),
      ]
    }
  }

  return []
}

const resolveAttrValues = (document: TextDocument, position: Position) => {
  const text = document.getText({
    start: { line: 0, character: 0 },
    end: position,
  })

  if (text.match(/(<\w+\s*)[^>]*$/) !== null) {
    const key = isAttrUtility(text.match(/\S+(?=\s*=\s*["']?[^"']*$)/)?.[0] as string, _completions.attr.static)

    if (!key)
      return []

    const completions: CompletionItem[] = []

    completions
      .push(..._completions.attr.static[key]
        .map((label, index) => ({
          label,
          kind: CompletionItemKind.Constant,
          detail: key,
          sortText: `1-${index.toString().padStart(8, '0')}`,
        })))

    if (key in _completions.attr.color) {
      completions
        .push(..._completions.attr.color[key]
          .map(({ label, doc }, index) => ({
            label,
            kind: CompletionItemKind.Color,
            detail: key,
            sortText: `0-${index.toString().padStart(8, '0')}`,
            documentation: doc,
          })))
    }

    completions.push(...Object.keys(variants).map((variant, index) => ({
      label: `${variant}:`,
      kind: CompletionItemKind.Module,
      detail: `${key},${variant}`,
      sortText: `2-${index.toString().padStart(8, '0')}`,
    })))

    if (key in _completions.attr.bracket) {
      completions.push(..._completions.attr.bracket[key].map((label, index) => ({
        label,
        kind: CompletionItemKind.Struct,
        detail: key,
        sortText: `3-${index.toString().padStart(8, '0')}`,
      })))
    }

    if (key in _completions.attr.dynamic) {
      completions.push(..._completions.attr.dynamic[key].map(({ label }, index) => ({
        label,
        kind: CompletionItemKind.Variable,
        detail: key,
        sortText: `4-${index.toString().padStart(8, '0')}`,
      })))
    }

    return completions
  }

  return []
}

export const windicssHTMLPlugin: HTMLPlugin = {
  completions({ document, position }) {
    return [
      ...resolveVariants(document, position),
      ...resolveAttrKeys(document, position),
      ...resolveAttrValues(document, position),
    ]
  },
}
