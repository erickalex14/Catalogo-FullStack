import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductTypesService } from '../services/product-types.service';
import { CreateProductTypeRequest } from '../dto/create-product-type.request';
import { UpdateProductTypeRequest } from '../dto/update-product-type.request';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly service: ProductTypesService) {}

  @Get()
  async list() { return this.service.findAll(); }

  @Get(':id')
  async get(@Param('id') id: number) { return this.service.findById(Number(id)); }

  @Post()
  async create(@Body() dto: CreateProductTypeRequest) { return this.service.create(dto); }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductTypeRequest) { return this.service.update(Number(id), dto); }

  @Delete(':id')
  async remove(@Param('id') id: number) { await this.service.delete(Number(id)); return { success: true }; }
}
