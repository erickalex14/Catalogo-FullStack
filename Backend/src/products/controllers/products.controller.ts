import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductRequest } from '../dto/create-product.request';
import { UpdateProductRequest } from '../dto/update-product.request';

/**
 * Controlador de Productos
 * 
 * Maneja las operaciones CRUD para los productos de la tienda.
 * Base URL: /api/products
 */
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  /**
   * GET /api/products
   * Obtiene todos los productos disponibles
   */
  @Get()
  async list() {
    return this.service.findAll();
  }

  /**
   * GET /api/products/:id
   * Obtiene un producto específico por su ID
   * @param id - ID del producto
   */
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.service.findById(Number(id));
  }

  /**
   * POST /api/products
   * Crea un nuevo producto
   * @param dto - Datos del producto a crear
   */
  @Post()
  async create(@Body() dto: CreateProductRequest) {
    return this.service.create(dto);
  }

  /**
   * PATCH /api/products/:id
   * Actualiza un producto existente
   * @param id - ID del producto a actualizar
   * @param dto - Datos a actualizar
   */
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductRequest) {
    return this.service.update(Number(id), dto);
  }

  /**
   * DELETE /api/products/:id
   * Elimina un producto por su ID
   * @param id - ID del producto a eliminar
   */
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.service.delete(Number(id));
    return { success: true };
  }
}
