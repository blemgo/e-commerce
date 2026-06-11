import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class RegisterLocalUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @MinLength(2)
  @MaxLength(100)
  fullName: string;
}
