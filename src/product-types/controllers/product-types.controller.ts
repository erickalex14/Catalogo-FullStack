import { Controller, Get, Param } from '@nestjs/common';
import { ProductTypesService } from '../services/product-types.service';

@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly service: ProductTypesService) {}

  @Get()
  async list() { return this.service.findAll(); }

  @Get(':id')
  async get(@Param('id') id: number) { return this.service.findById(Number(id)); }
}
