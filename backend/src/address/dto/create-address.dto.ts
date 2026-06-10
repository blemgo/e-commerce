import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  unitNumber?: string;

  @IsString()
  @IsOptional()
  streetNumber?: string;

  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  @IsOptional()
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  postalCode?: string;

  @IsUUID()
  @IsNotEmpty()
  countryId: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
