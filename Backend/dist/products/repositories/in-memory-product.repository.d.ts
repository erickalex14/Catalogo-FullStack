import { ProductRepositoryContract } from '../interfaces/product-repository.contract';
import { Product } from '../entities/product.entity';
import { Prisma } from '@prisma/client';
export declare class InMemoryProductRepository implements ProductRepositoryContract {
    private items;
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
    create(data: {
        productTypeId: number;
        discountId?: number | null;
        name: string;
        price?: Prisma.Decimal | null;
        description?: string | null;
        image: Buffer;
    }): Promise<Product>;
    update(id: number, data: {
        productTypeId?: number;
        discountId?: number | null;
        name?: string;
        price?: Prisma.Decimal | null;
        description?: string | null;
        image?: Buffer;
    }): Promise<Product>;
    delete(id: number): Promise<void>;
}
