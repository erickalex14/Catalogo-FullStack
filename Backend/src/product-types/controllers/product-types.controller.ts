import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductTypesService } from '../services/product-types.service';
import { CreateProductTypeRequest } from '../dto/create-product-type.request';
import { UpdateProductTypeRequest } from '../dto/update-product-type.request';

/**
 * Controlador de Tipos de Producto
 * 
 * Maneja las operaciones CRUD para las categorías/tipos de productos.
 * Base URL: /api/product-types
 */
@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly service: ProductTypesService) {}

  /**
   * GET /api/product-types
   * Obtiene todos los tipos de producto
   */
  @Get()
  async list() {
    return this.service.findAll();
  }

  /**
   * GET /api/product-types/:id
   * Obtiene un tipo de producto específico por su ID
   * @param id - ID del tipo de producto
   */
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.service.findById(Number(id));
  }

  /**
   * POST /api/product-types
   * Crea un nuevo tipo de producto
   * @param dto - Datos del tipo a crear
   */
  @Post()
  async create(@Body() dto: CreateProductTypeRequest) {
    return this.service.create(dto);
  }

  /**
   * PATCH /api/product-types/:id
   * Actualiza un tipo de producto existente
   * @param id - ID del tipo a actualizar
   * @param dto - Datos a actualizar
   */
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductTypeRequest) {
    return this.service.update(Number(id), dto);
  }

  /**
   * DELETE /api/product-types/:id
   * Elimina un tipo de producto por su ID
   * @param id - ID del tipo a eliminar
   */
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.service.delete(Number(id));
    return { success: true };
  }
}
