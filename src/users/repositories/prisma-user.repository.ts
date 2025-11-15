import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRepositoryContract } from '../interfaces/user-repository.contract';
import { User } from '../entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const rows = await this.prisma.user.findMany();
    return rows as unknown as User[];
  }

  async findById(id: number): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return (row as unknown as User) ?? null;
  }

  async create(data: { email: string; password: string; name?: string | null }): Promise<User> {
    const u = await this.prisma.user.create({ data });
    return u as unknown as User;
  }

  async update(id: number, data: { password?: string; name?: string | null }): Promise<User> {
    const u = await this.prisma.user.update({ where: { id }, data });
    return u as unknown as User;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
