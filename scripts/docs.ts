import { execa } from 'execa'
import { existsSync } from 'node:fs'
import { bin, hooksRootDir, logger } from './utilts'

async function setup() {
  await execa(bin('initial-scan'), ['.docs'], {
    cwd: hooksRootDir,
    stdout: 'inherit',
  })
}

async function main() {
  const args = process.argv?.[2] ?? 'dev'

  await setup()
  if (!existsSync(`${hooksRootDir}/.docs/en`)) {
    await setup()
  }
  if (args === 'dev')
    await execa('pnpm', ['docs:dev'], {
      cwd: hooksRootDir,
      stdout: 'inherit',
    })
  if (args === 'build')
    await execa('pnpm', ['docs:build'], {
      cwd: hooksRootDir,
      stdout: 'inherit',
    })
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
