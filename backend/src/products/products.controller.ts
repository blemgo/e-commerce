import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService, PaginatedProducts } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { Product } from './entities/product.entity';
import { AdminOnly } from 'src/auth/decorators/admin-only.decorator';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthorizedUser } from 'src/auth/dto/authorized-user.dto';
import { Role } from 'src/users/entities/enums/role.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @AdminOnly()
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  findAll(
    @Query() query: GetProductsQueryDto,
    @CurrentUser() user?: AuthorizedUser,
  ): Promise<PaginatedProducts> {
    const includeInactive =
      user?.role === Role.ADMIN && Boolean(query.includeInactive);

    return this.productsService.findAll(query, includeInactive);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @AdminOnly()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @AdminOnly()
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
