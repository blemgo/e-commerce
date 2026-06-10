import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CartModule } from 'src/cart/cart.module';
import { AddressModule } from 'src/address/address.module';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    CartModule,
    AddressModule,
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
