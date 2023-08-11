import { execa } from 'execa'
import { bin, hooksRootDir, logger } from './utilts'

async function setup() {
  await execa('pnpm', ['run', 'clean'], {
    cwd: hooksRootDir,
    stdout: 'inherit',
  })
  await execa(bin('vue-tsc'), ['--noEmit'], {
    cwd: hooksRootDir,
    stdout: 'inherit',
  })
  await execa("pnpm", ['recursive', 'exec', 'pnpm', 'run', 'build'], {
    cwd: "./",
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
