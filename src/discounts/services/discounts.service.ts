import { Inject, Injectable } from '@nestjs/common';
import { DiscountRepositoryContract } from '../interfaces/discount-repository.contract';
import { Discount } from '../entities/discount.entity';

@Injectable()
export class DiscountsService {
  constructor(@Inject('DiscountRepository') private readonly repo: DiscountRepositoryContract) {}
  async findAll(): Promise<Discount[]> { return this.repo.findAll(); }
  async findById(id: number): Promise<Discount | null> { return this.repo.findById(id); }
}
