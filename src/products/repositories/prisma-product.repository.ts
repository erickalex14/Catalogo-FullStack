import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductRepositoryContract } from '../interfaces/product-repository.contract';
import { Product } from '../entities/product.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaProductRepository implements ProductRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const rows = await this.prisma.product.findMany();
    return rows.map((r) => ({
      ...r,
      price: (r as any).price as Prisma.Decimal | null,
      image: r.image as unknown as Buffer,
    })) as unknown as Product[];
  }

  async findById(id: number): Promise<Product | null> {
    const r = await this.prisma.product.findUnique({ where: { id } });
    if (!r) return null;
    return ({
      ...r,
      price: (r as any).price as Prisma.Decimal | null,
      image: r.image as unknown as Buffer,
    }) as unknown as Product;
  }

  async create(data: { productTypeId: number; discountId?: number | null; name: string; price?: Prisma.Decimal | null; description?: string | null; image: Buffer }): Promise<Product> {
    const created = await this.prisma.product.create({
      data: {
        productTypeId: data.productTypeId,
        discountId: data.discountId ?? null,
        name: data.name,
        price: (data as any).price ?? null,
        description: data.description ?? null,
        image: data.image,
      },
    });
    return {
      ...created,
      price: (created as any).price as Prisma.Decimal | null,
      image: created.image as unknown as Buffer,
    } as unknown as Product;
  }

  async update(id: number, data: { productTypeId?: number; discountId?: number | null; name?: string; price?: Prisma.Decimal | null; description?: string | null; image?: Buffer }): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id },
      data: {
        productTypeId: data.productTypeId,
        discountId: data.discountId,
        name: data.name,
        price: (data as any).price ?? undefined,
        description: data.description,
        image: data.image,
      },
    });
    return {
      ...updated,
      price: (updated as any).price as Prisma.Decimal | null,
      image: updated.image as unknown as Buffer,
    } as unknown as Product;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
