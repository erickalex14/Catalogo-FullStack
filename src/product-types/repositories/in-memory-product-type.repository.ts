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
}
