import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductTypeRepositoryContract } from '../interfaces/product-type-repository.contract';
import { ProductType } from '../entities/product-type.entity';

@Injectable()
export class PrismaProductTypeRepository implements ProductTypeRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProductType[]> {
    const rows = await this.prisma.productType.findMany();
    return rows as unknown as ProductType[];
  }

  async findById(id: number): Promise<ProductType | null> {
    const row = await this.prisma.productType.findUnique({ where: { id } });
    return (row as unknown as ProductType) ?? null;
  }

  async create(data: { name: string; description?: string | null }): Promise<ProductType> {
    const r = await this.prisma.productType.create({ data });
    return r as unknown as ProductType;
  }

  async update(id: number, data: { name?: string; description?: string | null }): Promise<ProductType> {
    const r = await this.prisma.productType.update({ where: { id }, data });
    return r as unknown as ProductType;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.productType.delete({ where: { id } });
  }
}
