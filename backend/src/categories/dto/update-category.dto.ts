import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  categoryName?: string;

  @IsOptional()
  @IsUUID()
  parentCategoryId?: string | null;
}
