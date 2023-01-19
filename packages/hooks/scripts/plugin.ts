import { cyan } from 'kolorist'
import { Logger, Plugin } from 'vite'
import { move } from './utils'

export function movePlugin({ from, to }: { from: string; to: string }): Plugin {
  let logger: Logger

  const logPrefix = '[vite-plugin-move]'
  return {
    name: 'vite-plugin-move',
    apply: 'build',
    enforce: 'pre',
    configResolved: config => {
      logger = config.logger
    },
    buildEnd() {
      move(from, to, logger)
    },
    async closeBundle() {
      logger.info(`\n${cyan(logPrefix)} File successfully!`)
    },
  }
}
