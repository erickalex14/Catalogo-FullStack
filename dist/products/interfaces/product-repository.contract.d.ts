import { Product } from '../entities/product.entity';
export interface ProductRepositoryContract {
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
}
