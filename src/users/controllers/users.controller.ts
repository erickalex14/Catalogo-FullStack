import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserRequest } from '../dto/create-user.request';
import { UpdateUserRequest } from '../dto/update-user.request';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


//obtener todos los usuarios
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  //obtener un usuario por id
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findById(Number(id));
  }

  //crear un nuevo usuario
  @Post()
  async create(@Body() dto: CreateUserRequest) {
    return this.usersService.create(dto);
  }

  //actualizar un usuario existente
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateUserRequest) {
    return this.usersService.update(Number(id), dto);
  }

  //eliminar un usuario por id
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.usersService.delete(Number(id));
    return { success: true };
  }
}
