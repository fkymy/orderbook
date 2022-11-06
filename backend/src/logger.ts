import { create } from 'domain'
import { createLogger, format, transports } from 'winston'

const log = (level: 'debug' | 'error' | 'info' | 'warn') => {
  let network = 'unknown'
  switch (Number(process.env.CHAIN_ID)) {
    case 1:
      network = 'mainnet'
      break

    case 5:
      network = 'goerli'
      break
  }

  const logger = createLogger({
    exitOnError: false,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.json(),
    ),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  })

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.Console({
        format: format.simple(),
      }),
    )
  }

  return (component: string, message: string) =>
    logger.log(level, message, { component })
}

export const logger = {
  debug: log('debug'),
  error: log('error'),
  info: log('info'),
  warn: log('warn'),
}
