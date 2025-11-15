import { ProductTypeRepositoryContract } from '../interfaces/product-type-repository.contract';
import { ProductType } from '../entities/product-type.entity';
export declare class InMemoryProductTypeRepository implements ProductTypeRepositoryContract {
    private items;
    findAll(): Promise<ProductType[]>;
    findById(id: number): Promise<ProductType | null>;
    create(data: {
        name: string;
        description?: string | null;
    }): Promise<ProductType>;
    update(id: number, data: {
        name?: string;
        description?: string | null;
    }): Promise<ProductType>;
    delete(id: number): Promise<void>;
}
