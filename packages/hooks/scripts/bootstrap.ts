import { writeFile } from 'fs-extra'
import { resolve } from 'node:path'
import prettier from 'prettier'
import { hooks, logger, prettierConfig, rootDir } from './utils'

async function main() {
  const ignores = ['createUseStorageState', 'utils']
  const exportHooks = hooks.filter(c => !ignores.includes(c))
  const metaData = `
    {
      function: [
         ${exportHooks.map(name => `"${name}"`).join(',\n')},
      ],
    }
  `

  const metaDataPath = resolve(rootDir, 'meta-data.json')
  await writeFile(
    metaDataPath,
    prettier.format(metaData, { ...prettierConfig, parser: 'json' }),
    'utf-8',
  )
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
