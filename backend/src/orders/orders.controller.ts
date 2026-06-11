import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutDto } from './dto/checkout.dto';
import { GetAllOrdersQueryDto } from './dto/get-all-orders-query.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Order } from './entities/order.entity';
import { PaginatedResult } from 'src/common/interfaces/paginated-result.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AdminOnly } from 'src/auth/decorators/admin-only.decorator';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getUserOrders(@CurrentUser('id') userId: string): Promise<Order[]> {
    return this.ordersService.getUserOrders(userId);
  }

  @AdminOnly()
  @Get('all')
  getAllOrders(
    @Query() query: GetAllOrdersQueryDto,
  ): Promise<PaginatedResult<Order>> {
    return this.ordersService.getAllOrders(query);
  }

  @AdminOnly()
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) orderId: string,
    @Body() dto: UpdateOrderStatusDto,
  ): Promise<Order> {
    return this.ordersService.updateStatus(orderId, dto.status);
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
