import { Controller, Get, Param } from '@nestjs/common';
import { CombosService } from '../services/combos.service';

@Controller('combos')
export class CombosController {
  constructor(private readonly service: CombosService) {}

  @Get()
  async list() { return this.service.findAll(); }

  @Get(':id')
  async get(@Param('id') id: number) { return this.service.findById(Number(id)); }
}
