import { DiscountsService } from '../services/discounts.service';
import { CreateDiscountRequest } from '../dto/create-discount.request';
import { UpdateDiscountRequest } from '../dto/update-discount.request';
export declare class DiscountsController {
    private readonly service;
    constructor(service: DiscountsService);
    list(): Promise<import("../entities/discount.entity").Discount[]>;
    get(id: number): Promise<import("../entities/discount.entity").Discount | null>;
    create(dto: CreateDiscountRequest): Promise<import("../entities/discount.entity").Discount>;
    update(id: number, dto: UpdateDiscountRequest): Promise<import("../entities/discount.entity").Discount>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
