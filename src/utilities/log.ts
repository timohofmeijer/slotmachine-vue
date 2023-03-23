type Log = {
  log: (...args: any[]) => void
  logError: (...args: any[]) => void
  logGroup: (name?: string) => void
  logGroupEnd: () => void
  logTime: (name: string) => void
  logTimeEnd: (name: string) => void
}

export const createLog = (enable = true, prefix = '', color = '#426bff'): Log => {
  const log = (...args: any[]): void => {
    if (enable) console.log(`%c${prefix}`, `color: ${color}`, ...args)
  }
  const logError = (...args: any[]): void => console.error(prefix, ...args)
  const logGroup = enable ? (name?: string) => console.group(name || prefix) : () => ({})
  const logGroupEnd = enable ? console.groupEnd : () => ({})
  const logTime = enable ? (name: string) => console.time(`${prefix}/${name}`) : () => ({})
  const logTimeEnd = enable ? (name: string) => console.timeEnd(`${prefix}/${name}`) : () => ({})
  return { log, logError, logGroup, logGroupEnd, logTime, logTimeEnd }
}
