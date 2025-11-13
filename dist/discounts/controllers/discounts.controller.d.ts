import { DiscountsService } from '../services/discounts.service';
export declare class DiscountsController {
    private readonly service;
    constructor(service: DiscountsService);
    list(): Promise<import("../entities/discount.entity").Discount[]>;
    get(id: number): Promise<import("../entities/discount.entity").Discount | null>;
}
