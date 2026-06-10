import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressWithDefault } from './dto/address-with-default.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  getUserAddresses(
    @CurrentUser('id') userId: string,
  ): Promise<AddressWithDefault[]> {
    return this.addressService.getUserAddresses(userId);
  }

  @Post()
  createAddress(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateAddressDto,
  ): Promise<AddressWithDefault[]> {
    return this.addressService.createAddress(userId, dto);
  }

  @Patch(':addressId/default')
  setDefaultAddress(
    @CurrentUser('id') userId: string,
    @Param('addressId', ParseUUIDPipe) addressId: string,
  ): Promise<AddressWithDefault[]> {
    return this.addressService.setDefaultAddress(userId, addressId);
  }
}
