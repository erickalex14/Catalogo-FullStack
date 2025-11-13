import { DiscountRepositoryContract } from '../interfaces/discount-repository.contract';
import { Discount } from '../entities/discount.entity';
export declare class InMemoryDiscountRepository implements DiscountRepositoryContract {
    private items;
    findAll(): Promise<Discount[]>;
    findById(id: number): Promise<Discount | null>;
}
