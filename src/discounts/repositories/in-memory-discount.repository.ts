import { DiscountRepositoryContract } from '../interfaces/discount-repository.contract';
import { Discount } from '../entities/discount.entity';

export class InMemoryDiscountRepository implements DiscountRepositoryContract {
  private items: Discount[] = [];
  async findAll(): Promise<Discount[]> { return this.items; }
  async findById(id: number): Promise<Discount | null> { return this.items.find(d => d.id === id) || null; }
}
