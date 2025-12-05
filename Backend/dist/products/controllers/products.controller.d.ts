import { ProductsService } from '../services/products.service';
import { CreateProductRequest } from '../dto/create-product.request';
import { UpdateProductRequest } from '../dto/update-product.request';
export declare class ProductsController {
    private readonly service;
    constructor(service: ProductsService);
    list(): Promise<import("../entities/product.entity").Product[]>;
    get(id: number): Promise<import("../entities/product.entity").Product | null>;
    create(dto: CreateProductRequest): Promise<import("../entities/product.entity").Product>;
    update(id: number, dto: UpdateProductRequest): Promise<import("../entities/product.entity").Product>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
