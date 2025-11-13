import { ProductsService } from '../services/products.service';
export declare class ProductsController {
    private readonly service;
    constructor(service: ProductsService);
    list(): Promise<import("../entities/product.entity").Product[]>;
    get(id: number): Promise<import("../entities/product.entity").Product | null>;
}
