import fs from 'fs-extra'
import { cyan } from 'kolorist'
import { Logger } from 'vite'

const logPrefix = '[vite-plugin-move]'

export function move(originalUrl: string, targetUrl: string, log: Logger) {
  fs.move(originalUrl, targetUrl, err => {
    if (err) return log.error(JSON.stringify(err))
    log.info(`\n${cyan(logPrefix)} File successfully moved!!`)
  })
}
