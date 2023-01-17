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
  const args = process.argv?.[2] ?? 'github'

  await setup()
  if (!existsSync(`${hooksRootDir}/.docs/en`)) {
    await setup()
  }
  if (args === 'github')
    await execa('pnpm', ['docs:build-github'], {
      cwd: hooksRootDir,
      stdout: 'inherit',
    })
  if (args === 'gitee')
    await execa('pnpm', ['docs:build-gitee'], {
      cwd: hooksRootDir,
      stdout: 'inherit',
    })
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
