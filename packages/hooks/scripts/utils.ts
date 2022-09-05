import fs from 'fs-extra'
import { Logger } from 'vite'

const logPrefix = '[vite-plugin-move]'

export function move(originalUrl: string, targetUrl: string, log: Logger) {
  fs.move(originalUrl, targetUrl, err => {
    if (err) return log.error(JSON.stringify(err))
    log.info(`\n${cyan(logPrefix)} File successfully moved!!`)
  })
}

export function cyan(msg: string) {
  return `\x1B[36m${msg}\x1B[0m`
}
