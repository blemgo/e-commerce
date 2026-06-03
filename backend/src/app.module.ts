import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { typeOrmModule } from './config/database';

@Module({
  imports: [UsersModule, typeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
