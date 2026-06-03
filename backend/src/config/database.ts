import { env } from './env';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmModule = TypeOrmModule.forRoot({
    type: 'postgres',
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || 5432,
    username: env.DB_USER || 'postgres',
    password: env.DB_PASS || 'postgres',
    database: env.DB_NAME || 'postgres',
    ssl: { rejectUnauthorized: false },
    synchronize: false,
    logging: false,
    entities: [User],
  });

export { typeOrmModule };