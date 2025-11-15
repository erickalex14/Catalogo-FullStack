import { ProductRepositoryContract } from '../interfaces/product-repository.contract';
import { Product } from '../entities/product.entity';
import { CreateProductRequest } from '../dto/create-product.request';
import { UpdateProductRequest } from '../dto/update-product.request';
export declare class ProductsService {
    private readonly repo;
    constructor(repo: ProductRepositoryContract);
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
    create(dto: CreateProductRequest): Promise<Product>;
    update(id: number, dto: UpdateProductRequest): Promise<Product>;
    delete(id: number): Promise<void>;
}
