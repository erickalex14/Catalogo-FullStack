import { DiscountRepositoryContract } from '../interfaces/discount-repository.contract';
import { Discount } from '../entities/discount.entity';
import { CreateDiscountRequest } from '../dto/create-discount.request';
import { UpdateDiscountRequest } from '../dto/update-discount.request';
export declare class DiscountsService {
    private readonly repo;
    constructor(repo: DiscountRepositoryContract);
    findAll(): Promise<Discount[]>;
    findById(id: number): Promise<Discount | null>;
    create(dto: CreateDiscountRequest): Promise<Discount>;
    update(id: number, dto: UpdateDiscountRequest): Promise<Discount>;
    delete(id: number): Promise<void>;
}
