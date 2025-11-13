import { ProductRepositoryContract } from '../interfaces/product-repository.contract';
import { Product } from '../entities/product.entity';
export declare class ProductsService {
    private readonly repo;
    constructor(repo: ProductRepositoryContract);
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
}
