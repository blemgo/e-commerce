import { IsBoolean, IsEmail, IsOptional, MinLength } from 'class-validator';

export class LoginLocalUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}
