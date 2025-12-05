import { Inject, Injectable } from '@nestjs/common';
import { DiscountRepositoryContract } from '../interfaces/discount-repository.contract';
import { Discount } from '../entities/discount.entity';
import { CreateDiscountRequest } from '../dto/create-discount.request';
import { UpdateDiscountRequest } from '../dto/update-discount.request';

@Injectable()
export class DiscountsService {
  constructor(@Inject('DiscountRepository') private readonly repo: DiscountRepositoryContract) {}
  async findAll(): Promise<Discount[]> { return this.repo.findAll(); }
  async findById(id: number): Promise<Discount | null> { return this.repo.findById(id); }
  async create(dto: CreateDiscountRequest): Promise<Discount> { return this.repo.create({ porcentaje: dto.porcentaje }); }
  async update(id: number, dto: UpdateDiscountRequest): Promise<Discount> { return this.repo.update(id, { porcentaje: dto.porcentaje }); }
  async delete(id: number): Promise<void> { return this.repo.delete(id); }
}
