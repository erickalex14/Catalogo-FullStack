import { ProductTypesService } from '../services/product-types.service';
export declare class ProductTypesController {
    private readonly service;
    constructor(service: ProductTypesService);
    list(): Promise<import("../entities/product-type.entity").ProductType[]>;
    get(id: number): Promise<import("../entities/product-type.entity").ProductType | null>;
}
