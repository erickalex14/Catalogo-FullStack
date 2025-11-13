import { DiscountRepositoryContract } from '../interfaces/discount-repository.contract';
import { Discount } from '../entities/discount.entity';
export declare class DiscountsService {
    private readonly repo;
    constructor(repo: DiscountRepositoryContract);
    findAll(): Promise<Discount[]>;
    findById(id: number): Promise<Discount | null>;
}
