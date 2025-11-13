import { ProductRepositoryContract } from '../interfaces/product-repository.contract';
import { Product } from '../entities/product.entity';
export declare class InMemoryProductRepository implements ProductRepositoryContract {
    private items;
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
}
