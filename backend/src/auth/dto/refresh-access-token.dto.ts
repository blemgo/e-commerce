import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshAccessTokenDto {
    @IsString()
    @IsNotEmpty()
    refreshToken: string;

    @IsString()
    @IsNotEmpty()
    accessToken: string;
}
