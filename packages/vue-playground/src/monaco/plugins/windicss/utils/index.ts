import { toRGBA } from 'windicss/utils'

export function flatColors(colors: any, head?: string) {
  let flatten: { [ key: string ]: string } = {}
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string')
      flatten[(head && key === 'DEFAULT') ? head : head ? `${head}-${key}` : key] = value
    else if (typeof value === 'function')
      flatten[(head && key === 'DEFAULT') ? head : head ? `${head}-${key}` : key] = 'currentColor'
    else
      flatten = { ...flatten, ...flatColors(value, head ? `${head}-${key}` : key) }
  }
  return flatten
}

export function isAttrVariant(word: string, variants: any): boolean {
  const lastKey = word.match(/[^:-]+$/)?.[0] || word
  return lastKey in variants
}

export function isAttrUtility(word: string, attrs: any): string | undefined {
  if (!word)
    return

  const lastKey = word.match(/[^:-]+$/)?.[0] || word
  return lastKey in attrs ? lastKey : undefined
}

export function hex2RGB(hex: string): number[] | undefined {
  const RGB_HEX = /^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i
  const [, short, long] = String(hex).match(RGB_HEX) || []

  if (long) {
    const value = Number.parseInt(long, 16)
    return [value >> 16, (value >> 8) & 0xFF, value & 0xFF]
  }
  else if (short) {
    return Array.from(short, s => Number.parseInt(s, 16)).map(
      n => (n << 4) | n,
    )
  }
}

export function rgb2Hex(r: number, g: number, b: number) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export function isValidColor(utility: string, colors: any, type = 'hex') {
  const sep = utility.search('/')
  if (sep !== -1) utility = utility.slice(0, sep)
  if (/hex-?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/.test(utility)) {
    const hex = utility.replace(/^\S*hex-/, '')
    return { color: (type === 'hex' ? hex2RGB : toRGBA)(`#${hex}`), key: `hex-${hex}` }
  }
  for (const [key, value] of Object.entries(colors)) {
    if (utility.endsWith(key))
      return { color: (type === 'hex' ? hex2RGB : toRGBA)(Array.isArray(value) ? value[0] : value), key }
  }
  return {}
}

function match(a: [r: number, g: number, b: number], b: [r: number, g: number, b: number]) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
}

export function isDarkColor(r: number, g: number, b: number) {
  if (match([r, g, b], [20, 184, 166]) || match([r, g, b], [245, 158, 11]) || match([r, g, b], [249, 115, 22]) || match([r, g, b], [217, 70, 239]) || match([r, g, b], [6, 182, 212]) || match([r, g, b], [132, 204, 22])) return true
  // special cases: orange-500 yellow-500 teal-500 fuchsia-500 cyan-500 lime-500, With 500 as the dividing line, the view is better

  const hsp = Math.sqrt(
    0.299 * (r * r)
    + 0.587 * (g * g)
    + 0.114 * (b * b),
  )

  return hsp <= 150
}
