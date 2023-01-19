import { execa } from 'execa'
import { bin, hooksRootDir, logger } from './utilts'

async function setup() {
  await execa('npm', ['run', 'clean'], {
    cwd: hooksRootDir,
    stdout: 'inherit',
  })
  await execa(bin('vue-tsc'), ['--noEmit'], {
    cwd: hooksRootDir,
    stdout: 'inherit',
  })
  await execa(bin('vite'), ['build'], {
    cwd: hooksRootDir,
    stdout: 'inherit',
  })
}

async function main() {
  await setup()
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
