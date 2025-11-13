import { Controller, Get, Param } from '@nestjs/common';
import { DiscountsService } from '../services/discounts.service';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly service: DiscountsService) {}

  @Get()
  async list() { return this.service.findAll(); }

  @Get(':id')
  async get(@Param('id') id: number) { return this.service.findById(Number(id)); }
}
