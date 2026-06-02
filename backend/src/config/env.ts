export const env = {
    PORT: parseInt(process.env.PORT || '3000', 10),

    // Database
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASS: process.env.DB_PASS || 'postgres',
    DB_NAME: process.env.DB_NAME || 'postgres',

    // Auth
    JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '8h',
}
  