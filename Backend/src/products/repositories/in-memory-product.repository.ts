import { ProductRepositoryContract } from '../interfaces/product-repository.contract';
import { Product } from '../entities/product.entity';
import { Prisma } from '@prisma/client';

export class InMemoryProductRepository implements ProductRepositoryContract {
  private items: Product[] = [];
  async findAll(): Promise<Product[]> { return this.items; }
  async findById(id: number): Promise<Product | null> { return this.items.find(p => p.id === id) || null; }

  async create(data: { productTypeId: number; discountId?: number | null; name: string; price?: Prisma.Decimal | null; description?: string | null; image: Buffer }): Promise<Product> {
    const last = this.items.length ? this.items[this.items.length - 1] : undefined;
    const nextId = ((last?.id) ?? 0) + 1;
    const now = new Date();
    const item: Product = { id: nextId, productTypeId: data.productTypeId, discountId: data.discountId ?? null, name: data.name, price: data.price ?? null, description: data.description ?? null, image: data.image, createdAt: now, updatedAt: now };
    this.items.push(item);
    return item;
  }

  async update(id: number, data: { productTypeId?: number; discountId?: number | null; name?: string; price?: Prisma.Decimal | null; description?: string | null; image?: Buffer }): Promise<Product> {
    const idx = this.items.findIndex(p => p.id === id);
    if (idx < 0) throw new Error('Not found');
    const updated: Product = { ...this.items[idx], ...data, updatedAt: new Date() } as Product;
    this.items[idx] = updated;
    return updated;
  }

  async delete(id: number): Promise<void> {
    this.items = this.items.filter(p => p.id !== id);
  }
}
