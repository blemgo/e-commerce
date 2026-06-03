import { IsEmail, MinLength } from "class-validator";

export class LoginLocalUserDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;
}