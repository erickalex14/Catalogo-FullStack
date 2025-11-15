import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DiscountRepositoryContract } from '../interfaces/discount-repository.contract';
import { Discount } from '../entities/discount.entity';

@Injectable()
export class PrismaDiscountRepository implements DiscountRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Discount[]> {
    const rows = await this.prisma.discount.findMany();
    return rows as unknown as Discount[];
  }

  async findById(id: number): Promise<Discount | null> {
    const row = await this.prisma.discount.findUnique({ where: { id } });
    return (row as unknown as Discount) ?? null;
  }

  async create(data: { porcentaje: number }): Promise<Discount> {
    const r = await this.prisma.discount.create({ data });
    return r as unknown as Discount;
  }

  async update(id: number, data: { porcentaje?: number }): Promise<Discount> {
    const r = await this.prisma.discount.update({ where: { id }, data });
    return r as unknown as Discount;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.discount.delete({ where: { id } });
  }
}
