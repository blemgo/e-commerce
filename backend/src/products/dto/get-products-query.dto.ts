import { IsOptional, Matches } from 'class-validator';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class GetProductsQueryDto {
  @IsOptional()
  @Matches(UUID_REGEX, { message: 'category must be a UUID' })
  category?: string;
}
