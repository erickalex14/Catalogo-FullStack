import { Discount } from '../entities/discount.entity';

export interface DiscountRepositoryContract {
  findAll(): Promise<Discount[]>;
  findById(id: number): Promise<Discount | null>;
  create(data: { porcentaje: number }): Promise<Discount>;
  update(id: number, data: { porcentaje?: number }): Promise<Discount>;
  delete(id: number): Promise<void>;
}
