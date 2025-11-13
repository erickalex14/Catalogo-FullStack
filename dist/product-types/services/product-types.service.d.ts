import { ProductTypeRepositoryContract } from '../interfaces/product-type-repository.contract';
import { ProductType } from '../entities/product-type.entity';
export declare class ProductTypesService {
    private readonly repo;
    constructor(repo: ProductTypeRepositoryContract);
    findAll(): Promise<ProductType[]>;
    findById(id: number): Promise<ProductType | null>;
}
