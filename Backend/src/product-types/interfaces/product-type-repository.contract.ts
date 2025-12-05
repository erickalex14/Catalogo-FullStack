import { ProductType } from '../entities/product-type.entity';

export interface ProductTypeRepositoryContract {
  findAll(): Promise<ProductType[]>;
  findById(id: number): Promise<ProductType | null>;
  create(data: { name: string; description?: string | null }): Promise<ProductType>;
  update(id: number, data: { name?: string; description?: string | null }): Promise<ProductType>;
  delete(id: number): Promise<void>;
}
