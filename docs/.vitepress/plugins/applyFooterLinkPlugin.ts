import type { Plugin } from 'vite'
import fs from 'node:fs'
import matter from 'gray-matter'

const langTitleMap = {
  en: {
    document: 'Document',
    demo: 'Demo',
    source: 'Source'
  },
  zh: {
    document: '文档',
    demo: '示例',
    source: '源码'
  }
}

export function applyFooterLinkPlugin(): Plugin {
  return {
    name: 'vitepress-md-frontmatter-append',
    enforce: 'pre', // 确保在默认插件前执行

    load(id) {
      console.log("id", id);

      if (!id.endsWith('.md')) return

      const rawContent = fs.readFileSync(id, 'utf-8')

      const lang = id.includes('/zh/') ? 'zh' : 'en'
      const { data: frontmatter } = matter(rawContent)
      const mapPath = id.replace(process.cwd() + '/docs', '')

      console.log("frontmatter", frontmatter);

      if (!frontmatter?.map?.path || frontmatter?.source?.show === false) {
        return
      }

      // document
      const isShowDemo = frontmatter?.source?.showDemo ?? true
      const documentUrl = `https://github.com/InhiblabCore/vue-hooks-plus/blob/master/docs/${mapPath}`
      const document = `[${langTitleMap[lang].document}](${documentUrl})`

      // demo
      const srcMatches = [...rawContent.matchAll(/<demo[^>]*src="([^"]+)"/g)];
      const srcValues = srcMatches.map(match => match[1]);
      const isOneDemo = srcValues.length && srcValues.length === 1
      const demoUrl = `https://github.com/InhiblabCore/vue-hooks-plus/blob/master/docs/demo/${isOneDemo ? srcValues[0] : srcValues[0]?.split?.('/')[0]}`
      const demo = isShowDemo ? `[${langTitleMap[lang].demo}](${demoUrl})` : ''

      // source
      const isShowSource = frontmatter?.source?.showSource ?? true
      const sourceMapPath = frontmatter?.source?.path ? frontmatter.source.path : ''
      const sourceUrl = sourceMapPath ? sourceMapPath : frontmatter?.map?.path ? `https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src${frontmatter.map.path}` : `https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages`
      const source = isShowSource ? `[${langTitleMap[lang].source}](${sourceUrl})` : ''

      const appentFooter = `
       \n\n## Source
       \n\n${source ? `${source} ·` : ""} ${`${document}`} ${demo ? `· ${demo}` : ""}
      `
      return {
        code: rawContent + appentFooter,
        map: null
      }
    }
  }
}