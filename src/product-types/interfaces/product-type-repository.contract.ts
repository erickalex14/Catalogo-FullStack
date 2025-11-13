import { ProductType } from '../entities/product-type.entity';

export interface ProductTypeRepositoryContract {
  findAll(): Promise<ProductType[]>;
  findById(id: number): Promise<ProductType | null>;
}
