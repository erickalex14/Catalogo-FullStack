import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CombosService } from '../services/combos.service';
import { CreateComboRequest } from '../dto/create-combo.request';
import { UpdateComboRequest } from '../dto/update-combo.request';

/**
 * Controlador de Combos
 * 
 * Maneja las operaciones CRUD para los combos de productos.
 * Base URL: /api/combos
 */
@Controller('combos')
export class CombosController {
  constructor(private readonly service: CombosService) {}

  /**
   * GET /api/combos
   * Obtiene todos los combos disponibles
   */
  @Get()
  async list() {
    return this.service.findAll();
  }

  /**
   * GET /api/combos/:id
   * Obtiene un combo específico por su ID
   * @param id - ID del combo
   */
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.service.findById(Number(id));
  }

  /**
   * POST /api/combos
   * Crea un nuevo combo
   * @param dto - Datos del combo a crear
   */
  @Post()
  async create(@Body() dto: CreateComboRequest) {
    return this.service.create(dto);
  }

  /**
   * PATCH /api/combos/:id
   * Actualiza un combo existente
   * @param id - ID del combo a actualizar
   * @param dto - Datos a actualizar
   */
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateComboRequest) {
    return this.service.update(Number(id), dto);
  }

  /**
   * DELETE /api/combos/:id
   * Elimina un combo por su ID
   * @param id - ID del combo a eliminar
   */
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.service.delete(Number(id));
    return { success: true };
  }
}
