export type Attr = { raw: string; key: string; value: { raw: string; start: number }; start: number; end: number }
export type ClassName = { result: string; start: number; end: number }

export class HTMLParser {
  html?: string

  constructor(html?: string) {
    this.html = html
  }

  removeComments() {
    if (!this.html) return []
    const regex = /\/\*[\s\S]*?\*\/|\/\*[\s\S]*$|([^\\:]|^)\/\/.*|<!--[\s\S]*?-->$/igm
    let match
    while ((match = regex.exec(this.html as string))) {
      if (match)
        this.html = (this.html as string).slice(0, match.index) + ' '.repeat(regex.lastIndex - match.index) + this.html.slice(regex.lastIndex)
    }
  }

  parseAttrs(): Attr[] {
    if (!this.html) return []
    const output: Attr[] = []
    const regex = /\S+\s*=\s*"[^"]+"|\S+\s*=\s*'[^']+'|\S+\s*=\s*[^>\s]+/igm
    let match
    while ((match = regex.exec(this.html as string))) {
      if (match) {
        const raw = match[0]
        const sep = raw.indexOf('=')
        const key = raw.slice(0, sep).trim()
        let value: string| string[] = raw.slice(sep + 1).trim()
        let vstart = match.index + (sep + 1 + (raw.slice(sep + 1).match(/\S/)?.index || 0))
        if (['"', '\''].includes(value.charAt(0))) {
          vstart++
          value = value.slice(1, -1)
        }

        output.push({
          raw,
          key,
          value: {
            raw: value,
            start: vstart,
          },
          start: match.index,
          end: regex.lastIndex,
        })
      }
    }
    return output
  }

  parseClasses(): ClassName[] {
    // Match all class properties
    if (!this.html) return []
    const classRegex = /\s(?:class|className|w:dark|w:light|w:active|w:after|w:before|w:checked|w:disabled|w:focus|w:hover|w:tw)=(["'])([^{}]+)\1/
    const quoteRegex = /["']/
    const classNames = []
    let _indexStart = 0
    let _htmlLeft = this.html
    let propStart = _htmlLeft.search(classRegex)
    while (propStart !== -1) {
      const afterMatch = _htmlLeft.substring(propStart)
      const relativeStart = afterMatch.search(quoteRegex)
      const relativeEnd = afterMatch
        .substring(relativeStart + 1)
        .search(quoteRegex)
      const absoluteStart = propStart + relativeStart + 1
      const absoluteEnd = absoluteStart + relativeEnd
      classNames.push({
        start: _indexStart + absoluteStart,
        end: _indexStart + absoluteEnd,
        result: _htmlLeft.substring(absoluteStart, absoluteEnd),
      })
      _htmlLeft = _htmlLeft.substring(absoluteEnd + 2)
      _indexStart += absoluteEnd + 2
      propStart = _htmlLeft.search(classRegex)
    }
    return classNames
  }

  parseApplies(): ClassName[] {
    if (!this.html) return []
    const output: ClassName[] = []
    const regex = /(?<=@apply\s+)[^;]+(?=\s+!important)|(?<=@apply\s+)[^;]+(?=;)/igm
    let match
    while ((match = regex.exec(this.html as string))) {
      if (match) {
        output.push({
          result: this.html.slice(match.index, regex.lastIndex),
          start: match.index,
          end: regex.lastIndex,
        })
      }
    }
    return output
  }
}
