const nanoid = require('nanoid-esm')

export const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function createId (length = 12) {

  return nanoid(length)
}

export const id = {
  type: String,
  maxlength: 36,
  default: () => createId(12)
}

export const DateTime = {
  default: () => new Date()
}
