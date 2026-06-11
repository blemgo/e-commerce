import { IsNotEmpty, IsUUID } from 'class-validator';

export class CheckoutDto {
  @IsUUID()
  @IsNotEmpty()
  addressId: string;
}
