import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { typeOrmModule } from './config/database';
import { AuthModule } from './auth/auth.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    typeOrmModule,
    RefreshTokensModule,
  ], 
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
