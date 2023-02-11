export const envConfig = () => ({
  environment: process.env.NODE_ENV ?? 'dev',
  dbURI: process.env.DB_URI,
  port: process.env.PORT ?? 3000,
  dataURL: process.env.DATA_URL,
})
