import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryContract } from '../interfaces/user-repository.contract';
import { User } from '../entities/user.entity';
import { CreateUserRequest } from '../dto/create-user.request';
import { UpdateUserRequest } from '../dto/update-user.request';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepositoryContract,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async create(payload: CreateUserRequest): Promise<User> {
    const hashed = await bcrypt.hash(payload.password, 10);
    return this.userRepository.create({ email: payload.email, password: hashed, name: payload.name ?? null });
  }

  async update(id: number, payload: UpdateUserRequest): Promise<User> {
    const data: { password?: string; name?: string | null } = { name: payload.name ?? null };
    if (payload.password) {
      data.password = await bcrypt.hash(payload.password, 10);
    }
    return this.userRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
