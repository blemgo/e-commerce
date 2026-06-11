import { env } from './env';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
});

export { typeOrmModule };
