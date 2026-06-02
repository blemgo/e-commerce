import { DataSource } from 'typeorm';
import { env } from './env';
import { User } from '../users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  ssl: { rejectUnauthorized: false },

  synchronize: false,
  logging: false,
  entities: [User],
});

