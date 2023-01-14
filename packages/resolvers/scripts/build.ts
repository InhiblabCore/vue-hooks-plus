import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'
import { red } from 'kolorist'

const rootDir = resolve(fileURLToPath(import.meta.url), '../..')

const bin = (name: string) => resolve(rootDir, 'node_modules/.bin/' + name)

async function main() {
  await execa(
    bin('tsup-node'),
    [
      'src/index.ts',
      '--dts',
      '--format',
      'cjs,esm'
    ],
    { stdio: 'inherit' }
  )
}

main().catch(error => {
  console.error(red(error))
  process.exit(1)
})
