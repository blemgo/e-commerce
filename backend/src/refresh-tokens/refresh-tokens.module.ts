import { Module } from '@nestjs/common';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
  ],
})
export class RefreshTokensModule {}
