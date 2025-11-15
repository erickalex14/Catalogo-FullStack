import { DiscountRepositoryContract } from '../interfaces/discount-repository.contract';
import { Discount } from '../entities/discount.entity';
export declare class InMemoryDiscountRepository implements DiscountRepositoryContract {
    private items;
    findAll(): Promise<Discount[]>;
    findById(id: number): Promise<Discount | null>;
    create(data: {
        porcentaje: number;
    }): Promise<Discount>;
    update(id: number, data: {
        porcentaje?: number;
    }): Promise<Discount>;
    delete(id: number): Promise<void>;
}
