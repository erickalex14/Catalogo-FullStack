import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DiscountsService } from '../services/discounts.service';
import { CreateDiscountRequest } from '../dto/create-discount.request';
import { UpdateDiscountRequest } from '../dto/update-discount.request';

/**
 * Controlador de Descuentos
 * 
 * Maneja las operaciones CRUD para los descuentos y promociones.
 * Base URL: /api/discounts
 */
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly service: DiscountsService) {}

  /**
   * GET /api/discounts
   * Obtiene todos los descuentos disponibles
   */
  @Get()
  async list() {
    return this.service.findAll();
  }

  /**
   * GET /api/discounts/:id
   * Obtiene un descuento específico por su ID
   * @param id - ID del descuento
   */
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.service.findById(Number(id));
  }

  /**
   * POST /api/discounts
   * Crea un nuevo descuento
   * @param dto - Datos del descuento a crear
   */
  @Post()
  async create(@Body() dto: CreateDiscountRequest) {
    return this.service.create(dto);
  }

  /**
   * PATCH /api/discounts/:id
   * Actualiza un descuento existente
   * @param id - ID del descuento a actualizar
   * @param dto - Datos a actualizar
   */
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateDiscountRequest) {
    return this.service.update(Number(id), dto);
  }

  /**
   * DELETE /api/discounts/:id
   * Elimina un descuento por su ID
   * @param id - ID del descuento a eliminar
   */
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.service.delete(Number(id));
    return { success: true };
  }
}
