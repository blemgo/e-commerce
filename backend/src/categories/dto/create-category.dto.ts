import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsOptional()
  @IsUUID()
  parentCategoryId?: string;
}
