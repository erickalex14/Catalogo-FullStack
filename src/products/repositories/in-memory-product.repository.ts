import { ProductRepositoryContract } from '../interfaces/product-repository.contract';
import { Product } from '../entities/product.entity';

export class InMemoryProductRepository implements ProductRepositoryContract {
  private items: Product[] = [];
  async findAll(): Promise<Product[]> { return this.items; }
  async findById(id: number): Promise<Product | null> { return this.items.find(p => p.id === id) || null; }
}
