const env = process.env.NODE_ENV
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 4010
const SECRET_KEY = process.env.SECRET_KEY || 'secretKey'
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10

export default () => ({
  host: HOST,
  port: PORT,
  env,
  serverUrl: process.env.SERVER_URL || `http://${HOST}:${PORT}`,
  SECRET_KEY: SECRET_KEY,
  SALT_ROUNDS: SALT_ROUNDS,
})
