import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutDto } from './dto/checkout.dto';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getUserOrders(@CurrentUser('id') userId: string): Promise<Order[]> {
    return this.ordersService.getUserOrders(userId);
  }

  @Get(':id')
  getUserOrder(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) orderId: string,
  ): Promise<Order> {
    return this.ordersService.getUserOrder(userId, orderId);
  }

  @Post('checkout')
  checkout(
    @CurrentUser('id') userId: string,
    @Body() dto: CheckoutDto,
  ): Promise<Order> {
    return this.ordersService.checkout(userId, dto.addressId);
  }
}
