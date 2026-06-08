import { IsOptional, IsUUID } from 'class-validator';

export class GetProductsQueryDto {
  @IsOptional()
  @IsUUID()
  category?: string;
}
