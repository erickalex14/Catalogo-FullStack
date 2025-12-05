import { ProductTypeRepositoryContract } from '../interfaces/product-type-repository.contract';
import { ProductType } from '../entities/product-type.entity';

export class InMemoryProductTypeRepository implements ProductTypeRepositoryContract {
  private items: ProductType[] = [];

  async findAll(): Promise<ProductType[]> {
    return this.items;
  }

  async findById(id: number): Promise<ProductType | null> {
    return this.items.find(p => p.id === id) || null;
  }

  async create(data: { name: string; description?: string | null }): Promise<ProductType> {
    const last = this.items.length ? this.items[this.items.length - 1] : undefined;
    const nextId = ((last?.id) ?? 0) + 1;
    const now = new Date();
    const item: ProductType = { id: nextId, name: data.name, description: data.description ?? null, createdAt: now, updatedAt: now };
    this.items.push(item);
    return item;
  }

  async update(id: number, data: { name?: string; description?: string | null }): Promise<ProductType> {
    const idx = this.items.findIndex(p => p.id === id);
    if (idx < 0) throw new Error('Not found');
    const updated: ProductType = { ...this.items[idx], ...data, updatedAt: new Date() };
    this.items[idx] = updated;
    return updated;
  }

  async delete(id: number): Promise<void> {
    this.items = this.items.filter(p => p.id !== id);
  }
}
