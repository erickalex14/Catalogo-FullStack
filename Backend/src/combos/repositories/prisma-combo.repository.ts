import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ComboRepositoryContract } from '../interfaces/combo-repository.contract';
import { Combo } from '../entities/combo.entity';

@Injectable()
export class PrismaComboRepository implements ComboRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Combo[]> {
    const rows = await this.prisma.combo.findMany();
    return rows as unknown as Combo[];
  }

  async findById(id: number): Promise<Combo | null> {
    const row = await this.prisma.combo.findUnique({ where: { id } });
    return (row as unknown as Combo) ?? null;
  }

  async create(data: { productId: number; discountId?: number | null; nombre: string }): Promise<Combo> {
    const r = await this.prisma.combo.create({ data: { productId: data.productId, discountId: data.discountId ?? null, nombre: data.nombre } });
    return r as unknown as Combo;
  }

  async update(id: number, data: { productId?: number; discountId?: number | null; nombre?: string }): Promise<Combo> {
    const r = await this.prisma.combo.update({ where: { id }, data });
    return r as unknown as Combo;
  }

  async delete(id: number): Promise<void> { await this.prisma.combo.delete({ where: { id } }); }
}
