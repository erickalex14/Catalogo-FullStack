import { ComboRepositoryContract } from '../interfaces/combo-repository.contract';
import { Combo } from '../entities/combo.entity';

export class InMemoryComboRepository implements ComboRepositoryContract {
  private items: Combo[] = [];
  async findAll(): Promise<Combo[]> { return this.items; }
  async findById(id: number): Promise<Combo | null> { return this.items.find(c => c.id === id) || null; }

  async create(data: { productId: number; discountId?: number | null; nombre: string }): Promise<Combo> {
    const last = this.items.length ? this.items[this.items.length - 1] : undefined;
    const nextId = ((last?.id) ?? 0) + 1;
    const now = new Date();
    const item: Combo = { id: nextId, productId: data.productId, discountId: data.discountId ?? null, nombre: data.nombre, createdAt: now, updatedAt: now };
    this.items.push(item);
    return item;
  }

  async update(id: number, data: { productId?: number; discountId?: number | null; nombre?: string }): Promise<Combo> {
    const idx = this.items.findIndex(c => c.id === id);
    if (idx < 0) throw new Error('Not found');
    const updated: Combo = { ...this.items[idx], ...data, updatedAt: new Date() };
    this.items[idx] = updated;
    return updated;
  }

  async delete(id: number): Promise<void> {
    this.items = this.items.filter(c => c.id !== id);
  }
}
