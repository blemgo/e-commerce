import { MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @MinLength(2)
  @MaxLength(100)
  fullName: string;
}
