import { ProductTypesService } from '../services/product-types.service';
import { CreateProductTypeRequest } from '../dto/create-product-type.request';
import { UpdateProductTypeRequest } from '../dto/update-product-type.request';
export declare class ProductTypesController {
    private readonly service;
    constructor(service: ProductTypesService);
    list(): Promise<import("../entities/product-type.entity").ProductType[]>;
    get(id: number): Promise<import("../entities/product-type.entity").ProductType | null>;
    create(dto: CreateProductTypeRequest): Promise<import("../entities/product-type.entity").ProductType>;
    update(id: number, dto: UpdateProductTypeRequest): Promise<import("../entities/product-type.entity").ProductType>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
