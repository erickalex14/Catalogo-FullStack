import { ProductTypeRepositoryContract } from '../interfaces/product-type-repository.contract';
import { ProductType } from '../entities/product-type.entity';
import { CreateProductTypeRequest } from '../dto/create-product-type.request';
import { UpdateProductTypeRequest } from '../dto/update-product-type.request';
export declare class ProductTypesService {
    private readonly repo;
    constructor(repo: ProductTypeRepositoryContract);
    findAll(): Promise<ProductType[]>;
    findById(id: number): Promise<ProductType | null>;
    create(dto: CreateProductTypeRequest): Promise<ProductType>;
    update(id: number, dto: UpdateProductTypeRequest): Promise<ProductType>;
    delete(id: number): Promise<void>;
}
