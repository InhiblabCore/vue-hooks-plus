import * as fs from 'node:fs'
import { resolve } from 'node:path'
import prettier from 'prettier'
import { hooks, hooksRootDir, logger, prettierConfig } from './utilts'

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

  const metaDataPath = resolve(hooksRootDir, 'meta-data.json')
  await fs.promises.writeFile(
    metaDataPath,
    prettier.format(metaData, { ...prettierConfig, parser: 'json' }),
    'utf-8',
  )
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
