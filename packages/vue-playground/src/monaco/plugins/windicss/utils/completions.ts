import type { Processor } from 'windicss/lib'
import type { Attr, Completion } from '../interfaces'
import { utilities, negative } from './utilities'
import { flatColors } from './index'

export function generateCompletions(processor: Processor, colors: any, attributify = true, prefix = '') {
  const completions: Completion = {
    static: [],
    color: [],
    bracket: [],
    dynamic: [],
    attr: {
      static: {},
      color: {},
      bracket: {},
      dynamic: {},
    },
  }
  const staticUtilities = processor.resolveStaticUtilities(true)
  // generate normal utilities completions
  for (const [config, list] of Object.entries({ ...utilities, ...processor._plugin.completions })) {
    for (const utility of list) {
      const bracket = utility.indexOf('[')
      if (bracket !== -1) {
        completions.bracket.push(utility)
        continue
      }
      const mark = utility.indexOf('{')
      if (mark === -1) {
        completions.static.push(utility)
      }
      else {
        const key = prefix + utility.slice(0, mark - 1)
        const suffix = utility.slice(mark)
        switch (suffix) {
          case '{static}':
            for (const i of Object.keys(processor.theme(config, {}) as any))
              completions.static.push(i === 'DEFAULT' ? key : i.charAt(0) === '-' ? `-${key}${i}` : `${key}-${i}`)

            break
          case '{color}':
            for (const [k, v] of Object.entries(flatColors(processor.theme(config, colors)))) {
              if (k === 'DEFAULT') continue
              completions.color.push({
                label: `${key}-${k}`,
                doc: v,
              })
            }
            break
          default:
            completions.dynamic.push({
              label: prefix + utility,
              pos: utility.length - mark,
            })
            if (config in negative) {
              completions.dynamic.push({
                label: `${prefix}-${utility}`,
                pos: utility.length + 1 - mark,
              })
            }
            break
        }
      }
    }
  }

  // generate attributify completions
  const attr: Attr = { static: {}, color: {}, bracket: {}, dynamic: {} }

  if (attributify) {
    const attrDisable = processor.config('attributify.disable') as string[] | undefined
    const addAttr = (key: string, value: any, type: 'static' | 'color' | 'bracket' | 'dynamic' = 'static') => {
      if (attrDisable && attrDisable.includes(key)) return
      key in attr[type] ? attr[type][key].push(value) : attr[type][key] = [value]
    }

    addAttr('flex', '~')
    addAttr('flex', 'inline')
    addAttr('grid', '~')
    addAttr('grid', 'inline')
    addAttr('gradient', 'none')
    addAttr('underline', '~')
    addAttr('underline', 'line-through')
    addAttr('underline', 'none')
    addAttr('filter', '~')
    addAttr('filter', 'none')
    addAttr('backdrop', '~')
    addAttr('backdrop', 'none')

    for (const [key, style] of Object.entries(staticUtilities)) {
      if (!style[0]) continue
      switch (style[0].meta.group) {
        case 'fontStyle':
        case 'fontSmoothing':
        case 'fontVariantNumeric':
          addAttr('font', key)
          break
        case 'textAlign':
          addAttr('text', key.slice(5)) // text-
          break
        case 'verticalAlign':
          addAttr('text', key.slice(6)) // align-
          break
        case 'textDecoration':
          addAttr('text', key)
          break
        case 'textTransform':
        case 'textOverflow':
        case 'wordBreak':
        case 'writingMode':
        case 'writingOrientation':
        case 'hyphens':
          addAttr('text', key)
          break
        case 'whitespace':
          addAttr('text', key.slice(5)) // whitespace -> space
          break
        case 'listStylePosition':
          addAttr('list', key.slice(5)) // list-
          break
        case 'backgroundAttachment':
        case 'backgroundRepeat':
        case 'backgroundClip':
        case 'backgroundOrigin':
        case 'backgroundBlendMode':
          addAttr('bg', key.slice(3)) // bg-
          break
        case 'borderStyle':
          addAttr('border', key.slice(7)) // border-
          addAttr('divide', key.slice(7)) // border-
          break
        case 'borderCollapse':
          addAttr('border', key.slice(7)) // border-
          break
        case 'strokeDashArray':
        case 'strokeDashOffset':
        case 'stroke':
          addAttr('icon', key)
          break
        case 'flexWrap':
        case 'flexDirection':
          addAttr('flex', key.slice(5)) // flex-
          break
        case 'gridAutoFlow':
          addAttr('grid', key.slice(5)) // grid-
          break
        case 'display':
          if (key.startsWith('table') || key === 'inline-table')
            addAttr('table', key.replace(/-?table-?/, '') || '~')
          else
            addAttr('display', key)

          break
        case 'position':
        case 'float':
        case 'clear':
          addAttr('pos', key)
          break
        case 'isolation':
          addAttr('pos', key)
          addAttr('isolation', key.replace('isolation-', ''))
          break
        case 'visibility':
        case 'backfaceVisibility':
          addAttr('display', key)
          break
        case 'tableLayout':
          addAttr('table', key.slice(6)) // table-
          break
        case 'captionSide':
        case 'emptyCells':
          addAttr('table', key)
          break
        case 'alignContent':
        case 'alignItems':
        case 'alignSelf':
          addAttr('align', key)
          break
        case 'justifyContent':
        case 'justifyItems':
        case 'justifySelf':
        case 'placeContent':
        case 'placeItems':
        case 'placeSelf':
        case 'userSelect':
        case 'resize':
        case 'overflow':
        case 'appearance':
        case 'textDecorationStyle':
        case 'overscrollBehavior':
          const splits = split(key)
          if (!splits.key) break
          addAttr(splits.key, splits.body)
          break
        case 'boxDecorationBreak':
          addAttr('box', key)
          break
        case 'boxSizing':
          addAttr('box', key.slice(4)) // box-
          break
        case 'objectFit':
          addAttr('object', key.slice(7)) // object-
          break
        case 'transform':
          if (key.startsWith('preserve'))
            addAttr('transform', key)
          else
            addAttr('transform', key.slice(10) || '~') // transform-

          break
        case 'perspectOrigin':
          addAttr('transform', key)
          break
        case 'pointerEvents':
          addAttr('pointer', key.slice(15)) // pointer-events-
          break
        case 'mixBlendMode':
          addAttr('blend', key.slice(10)) // mix-blend-
          break
        case 'accessibility':
          addAttr('sr', key.replace(/sr-/, ''))
          break
      }
    }

    for (const utility of completions.static) {
      const { key, body } = split(utility)
      if (key) {
        if (key === 'underline') addAttr('text', utility)
        addAttr(key, body)
      }
    }

    for (const { label, doc } of completions.color) {
      const { key, body } = split(label)
      if (key) {
        addAttr(key, { label: body, doc }, 'color')
        if (key === 'underline') addAttr('text', { label, doc }, 'color')
      }
    }

    for (const utility of completions.bracket) {
      const { key, body } = split(utility)
      if (key) addAttr(key, body, 'bracket')
    }

    for (const { label, pos } of completions.dynamic) {
      const { key, body } = split(label)
      if (key) addAttr(key, { label: body, pos }, 'dynamic')
    }
  }

  completions.static.push(...Object.keys(staticUtilities))
  completions.attr = attr
  return completions
}

function split(utility: string) {
  if (utility.startsWith('bg-gradient')) return { key: 'gradient', body: utility.replace(/^bg-gradient-/, '') }
  if (utility === 'w-min') return { key: 'w', body: 'min-content' }
  if (utility === 'w-max') return { key: 'w', body: 'max-content' }
  if (utility === 'h-min') return { key: 'h', body: 'min-content' }
  if (utility === 'h-max') return { key: 'h', body: 'max-content' }
  if (utility.startsWith('min-w')) return { key: 'w', body: utility.replace(/^min-w-/, 'min-') }
  if (utility.startsWith('max-w')) return { key: 'w', body: utility.replace(/^max-w-/, 'max-') }
  if (utility.startsWith('min-h')) return { key: 'h', body: utility.replace(/^min-h-/, 'min-') }
  if (utility.startsWith('max-h')) return { key: 'h', body: utility.replace(/^max-h-/, 'max-') }

  const key = utility.match(/[^-]+/)?.[0]
  if (key) {
    if (['duration', 'ease', 'delay'].includes(key)) return { key: 'transition', body: utility }
    if (['scale', 'rotate', 'translate', 'skew', 'origin', 'perspect'].includes(key)) return { key: 'transform', body: utility }
    if (['blur', 'brightness', 'contrast', 'drop', 'grayscale', 'hue', 'invert', 'saturate', 'sepia'].includes(key)) return { key: 'filter', body: utility }
    if (['inset', 'top', 'left', 'bottom', 'right'].includes(key)) return { key: 'pos', body: utility }
    if (['py', 'px', 'pt', 'pl', 'pb', 'pr'].includes(key)) return { key: 'p', body: utility.slice(1) }
    if (['my', 'mx', 'mt', 'ml', 'mb', 'mr'].includes(key)) return { key: 'm', body: utility.charAt(0) === '-' ? `-${utility.slice(2)}` : utility.slice(1) }
    if (['stroke', 'fill'].includes(key)) return { key: 'icon', body: utility }
    if (['from', 'via', 'to'].includes(key)) return { key: 'gradient', body: utility }
    if (['tracking', 'leading'].includes(key)) return { key: 'font', body: utility }
    if (['tab', 'indent'].includes(key)) return { key: 'text', body: utility }
    if (['col', 'row', 'auto', 'gap'].includes(key)) return { key: 'grid', body: utility }
    if (key === 'placeholder') return { key: 'text', body: utility }
    if (key === 'rounded') return { key: 'border', body: utility }
  }
  const negative = utility.charAt(0) === '-'
  const body = (negative ? utility.slice(1) : utility).match(/-.+/)?.[0].slice(1) || '~'
  return { key, body: negative ? `-${body}` : body }
}
