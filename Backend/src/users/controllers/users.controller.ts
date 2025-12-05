import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserRequest } from '../dto/create-user.request';
import { UpdateUserRequest } from '../dto/update-user.request';

/**
 * Controlador de Usuarios
 * 
 * Maneja las operaciones CRUD para la gestión de usuarios.
 * Base URL: /api/users
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /api/users
   * Obtiene todos los usuarios registrados
   */
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * GET /api/users/:id
   * Obtiene un usuario específico por su ID
   * @param id - ID del usuario
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findById(Number(id));
  }

  /**
   * POST /api/users
   * Crea un nuevo usuario
   * @param dto - Datos del usuario a crear
   */
  @Post()
  async create(@Body() dto: CreateUserRequest) {
    return this.usersService.create(dto);
  }

  /**
   * PATCH /api/users/:id
   * Actualiza un usuario existente
   * @param id - ID del usuario a actualizar
   * @param dto - Datos a actualizar
   */
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateUserRequest) {
    return this.usersService.update(Number(id), dto);
  }

  /**
   * DELETE /api/users/:id
   * Elimina un usuario por su ID
   * @param id - ID del usuario a eliminar
   */
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.usersService.delete(Number(id));
    return { success: true };
  }
}
