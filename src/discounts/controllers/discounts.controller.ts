import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DiscountsService } from '../services/discounts.service';
import { CreateDiscountRequest } from '../dto/create-discount.request';
import { UpdateDiscountRequest } from '../dto/update-discount.request';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly service: DiscountsService) {}

  @Get()
  async list() { return this.service.findAll(); }

  @Get(':id')
  async get(@Param('id') id: number) { return this.service.findById(Number(id)); }

  @Post()
  async create(@Body() dto: CreateDiscountRequest) { return this.service.create(dto); }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateDiscountRequest) { return this.service.update(Number(id), dto); }

  @Delete(':id')
  async remove(@Param('id') id: number) { await this.service.delete(Number(id)); return { success: true }; }
}
