import { Inject, Injectable } from '@nestjs/common';
import { ComboRepositoryContract } from '../interfaces/combo-repository.contract';
import { Combo } from '../entities/combo.entity';
import { CreateComboRequest } from '../dto/create-combo.request';
import { UpdateComboRequest } from '../dto/update-combo.request';

@Injectable()
export class CombosService {
  constructor(@Inject('ComboRepository') private readonly repo: ComboRepositoryContract) {}
  async findAll(): Promise<Combo[]> { return this.repo.findAll(); }
  async findById(id: number): Promise<Combo | null> { return this.repo.findById(id); }
  async create(dto: CreateComboRequest): Promise<Combo> { return this.repo.create({ productId: dto.productId, discountId: dto.discountId ?? null, nombre: dto.nombre }); }
  async update(id: number, dto: UpdateComboRequest): Promise<Combo> { return this.repo.update(id, { productId: dto.productId, discountId: dto.discountId ?? null, nombre: dto.nombre }); }
  async delete(id: number): Promise<void> { return this.repo.delete(id); }
}
