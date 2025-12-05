import { DiscountRepositoryContract } from '../interfaces/discount-repository.contract';
import { Discount } from '../entities/discount.entity';

export class InMemoryDiscountRepository implements DiscountRepositoryContract {
  private items: Discount[] = [];
  async findAll(): Promise<Discount[]> { return this.items; }
  async findById(id: number): Promise<Discount | null> { return this.items.find(d => d.id === id) || null; }

  async create(data: { porcentaje: number }): Promise<Discount> {
    const last = this.items.length ? this.items[this.items.length - 1] : undefined;
    const nextId = ((last?.id) ?? 0) + 1;
    const now = new Date();
    const item: Discount = { id: nextId, porcentaje: data.porcentaje, createdAt: now, updatedAt: now };
    this.items.push(item);
    return item;
  }

  async update(id: number, data: { porcentaje?: number }): Promise<Discount> {
    const idx = this.items.findIndex(d => d.id === id);
    if (idx < 0) throw new Error('Not found');
    const updated: Discount = { ...this.items[idx], ...data, updatedAt: new Date() };
    this.items[idx] = updated;
    return updated;
  }

  async delete(id: number): Promise<void> {
    this.items = this.items.filter(d => d.id !== id);
  }
}
