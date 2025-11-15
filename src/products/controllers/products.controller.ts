import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductRequest } from '../dto/create-product.request';
import { UpdateProductRequest } from '../dto/update-product.request';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  async list() { return this.service.findAll(); }

  @Get(':id')
  async get(@Param('id') id: number) { return this.service.findById(Number(id)); }

  @Post()
  async create(@Body() dto: CreateProductRequest) { return this.service.create(dto); }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductRequest) { return this.service.update(Number(id), dto); }

  @Delete(':id')
  async remove(@Param('id') id: number) { await this.service.delete(Number(id)); return { success: true }; }
}
