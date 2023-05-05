const basicConnectionParameters = {
  autoIndex: true,
  autoReconnect: true,
  keepAlive: true,
  poolSize: 10,
  useCreateIndex: true,
  useNewUrlParser: true,
  socketTimeoutMS: 3600000,
  connectionTimeoutMS: 3600000
}

export default () => ({
  database: {
    blogDB: {
      credentials: process.env.MongoURL,
      primaryConnectionParameters: {
        ...basicConnectionParameters,
      }
    }
  }
})
