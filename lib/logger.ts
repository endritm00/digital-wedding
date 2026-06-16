type Level = 'info' | 'warn' | 'error'
type LogFields = Record<string, unknown>

function emit(level: Level, fields: LogFields) {
  const entry = JSON.stringify({ ts: new Date().toISOString(), level, ...fields })
  level === 'error' ? console.error(entry) : console.log(entry)
}

export const logger = {
  info:  (fields: LogFields) => emit('info',  fields),
  warn:  (fields: LogFields) => emit('warn',  fields),
  error: (fields: LogFields) => emit('error', fields),
}
