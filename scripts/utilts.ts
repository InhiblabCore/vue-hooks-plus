import { existsSync, readdirSync, statSync } from 'fs-extra'
import { resolve } from 'node:path'
import { bgYellow, bgCyan, bgGreen, bgRed, yellow, cyan, green, red } from 'kolorist'
import { Config } from 'prettier'
import { execa } from 'execa'
import type { Options } from 'execa'

export const prettierConfig: Config = {
  printWidth: 100,
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',
  bracketSameLine: false,
  quoteProps: 'as-needed',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: '*.md',
      options: {
        embeddedLanguageFormatting: 'off',
      },
    },
  ],
}

export const rootDir = resolve(__dirname, '..')
export const hooksRootDir = resolve(rootDir, 'packages/hooks')
export const hooksDir = resolve(hooksRootDir, 'src')

export const hooks = readdirSync(hooksDir).filter(f => {
  const path = resolve(hooksDir, f)
  if (!statSync(path).isDirectory()) {
    return false
  }

  return existsSync(`${path}/index.ts`)
})

type LogFn = () => void

export const logger = {
  ln: () => console.log(),
  withStartLn: (log: LogFn) => {
    logger.ln()
    log()
  },
  withEndLn: (log: LogFn) => {
    log()
    logger.ln()
  },
  withBothLn: (log: LogFn) => {
    logger.ln()
    log()
    logger.ln()
  },
  warning: (msg: string) => {
    console.warn(`${bgYellow(' WARNING ')} ${yellow(msg)}`)
  },
  info: (msg: string) => {
    console.log(`${bgCyan(' INFO ')} ${cyan(msg)}`)
  },
  success: (msg: string) => {
    console.log(`${bgGreen(' SUCCESS ')} ${green(msg)}`)
  },
  error: (msg: string) => {
    console.error(`${bgRed(' ERROR ')} ${red(msg)}`)
  },
  warningText: (msg: string) => {
    console.warn(`${yellow(msg)}`)
  },
  infoText: (msg: string) => {
    console.log(`${cyan(msg)}`)
  },
  successText: (msg: string) => {
    console.log(`${green(msg)}`)
  },
  errorText: (msg: string) => {
    console.error(`${red(msg)}`)
  },
}

export function bin(name: string) {
  return resolve(rootDir, 'node_modules/.bin/' + name)
}

export async function run(bin: string, args: string[], opts: Options = {}) {
  return execa(bin, args, { stdio: 'inherit', ...opts })
}
