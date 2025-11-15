import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CombosService } from '../services/combos.service';
import { CreateComboRequest } from '../dto/create-combo.request';
import { UpdateComboRequest } from '../dto/update-combo.request';

@Controller('combos')
export class CombosController {
  constructor(private readonly service: CombosService) {}

  @Get()
  async list() { return this.service.findAll(); }

  @Get(':id')
  async get(@Param('id') id: number) { return this.service.findById(Number(id)); }

  @Post()
  async create(@Body() dto: CreateComboRequest) { return this.service.create(dto); }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateComboRequest) { return this.service.update(Number(id), dto); }

  @Delete(':id')
  async remove(@Param('id') id: number) { await this.service.delete(Number(id)); return { success: true }; }
}
