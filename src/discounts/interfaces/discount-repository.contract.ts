import { Discount } from '../entities/discount.entity';

export interface DiscountRepositoryContract {
  findAll(): Promise<Discount[]>;
  findById(id: number): Promise<Discount | null>;
}
