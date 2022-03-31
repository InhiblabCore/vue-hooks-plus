import { Processor } from 'windicss/lib'
import { ClassParser } from 'windicss/utils/parser'
import type { editor as Editor } from 'monaco-editor'
import * as monaco from 'monaco-editor'
import { hex2RGB } from 'windicss/utils'
import { isString } from '@antfu/utils'
import { flatColors, isAttrUtility, isAttrVariant, isValidColor, isDarkColor, rgb2Hex } from './utils'
import { generateCompletions } from './utils/completions'
import { HTMLParser } from './utils/parser'
import { EditorPlugin } from '~/monaco/plugins/types'
import { useStyleSheet } from '~/logic/useStyleSheet'

const processor = new Processor()
const windi = {
  colors: flatColors(processor.theme('colors', {})),
  variants: processor.resolveVariants(),
  completions: generateCompletions(processor, null, true),
}

interface State {
  decorations: string[]
}

interface Provider {
  color: string
  decoration: Editor.IModelDecoration[]
}

const { rules } = useStyleSheet('__windicss_styles__')
const state: State = {
  decorations: [],
}

function createColorCube(document: Editor.ITextModel, start: number, offset: number, raw: string, color: string | number[]): Editor.IModelDecoration {
  color = isString(color) ? color : rgb2Hex(color[0], color[1], color[2])

  const { lineNumber: startLine, column: startColumn } = document.getPositionAt(start + offset)
  const { lineNumber: endLine, column: endColumn } = document.getPositionAt(start + offset + raw.length)
  const [r, g, b] = hex2RGB(color)!

  return {
    ownerId: 0,
    id: raw,
    range: new monaco.Range(startLine, startColumn, endLine, endColumn),
    options: {
      beforeContentClassName: `editor-windicss-color-block ${isDarkColor(r, g, b) ? 'editor-windicss-color-block-dark' : 'editor-windicss-color-block-light'} color-${color.replace('#', '')})}`,
    },
  }
}

export const WindiDecoration: EditorPlugin = {
  language: 'html',
  onContentChanged(editor) {
    const documentText = editor.getValue()
    const parser = new HTMLParser(documentText)
    parser.removeComments()
    const attrs = parser.parseAttrs()
    const model = editor.getModel()!

    // Map Attribute Colors
    // @ts-ignore
    const attributeProviders: Provider[] = attrs
      .filter(attr => isAttrUtility(attr.key, windi.completions.attr.static))
      .map((attr) => {
        const matches = attr.value.raw.matchAll(/[^\s/]+/igm)

        return Array.from(matches)
          .map((match) => {
            const value = match[0].replace('dark:', '').replace('!', '')

            if (value in windi.colors || value.startsWith('hex-')) {
              const color = value in windi.colors ? windi.colors[value] : value.replace(/^hex-/, '#')

              return {
                color,
                decoration: createColorCube(model, attr.value.start, match.index!, match[0], color),
              }
            }

            return null
          }).filter(_ => _)
      })
      .flat()

    // @ts-ignore
    const classProviders: Provider[] = attrs
      .filter(attr => isAttrVariant(attr.key, windi.variants) || ['class', 'className'].includes(attr.key))
      .map((attr) => {
        const elements = new ClassParser(attr.value.raw, ':', Object.keys(windi.variants)).parse(false)
        const els = []

        for (const element of elements) {
          if (element.type === 'group' && Array.isArray(element.content)) {
            for (const e of element.content) {
              const color = isValidColor(e.raw, windi.colors)

              if (color && color.color) {
                els.push({
                  color: color.color,
                  decoration: createColorCube(model, attr.value.start, e.start, element.raw, color.color),
                })
              }
            }
          }

          const color = element.type === 'utility' && isValidColor(element.raw, windi.colors)

          if (color && color.color) {
            els.push({
              color: color.color,
              decoration: createColorCube(model, attr.value.start, element.start, element.raw, color.color),
            })
          }
        }

        return els
      })
      .flat()

    rules.value = [...attributeProviders, ...classProviders]
      .filter(({ color }) => color)
      .reduce((acc, color) => {
        const _color = isString(color.color) ? color.color : rgb2Hex(color.color[0], color.color[1], color.color[2])
        // @ts-ignore
        acc[`.color-${_color.replace('#', '')}`] = `background-color: ${_color}`
        return acc
      }, {})

    // @ts-ignore
    state.decorations = editor.deltaDecorations(state.decorations, [
      ...attributeProviders.map(({ decoration }) => decoration),
      ...classProviders.map(({ decoration }) => decoration),
    ])
  },
}
