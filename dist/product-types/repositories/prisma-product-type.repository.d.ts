import { PrismaService } from '../../prisma/prisma.service';
import { ProductTypeRepositoryContract } from '../interfaces/product-type-repository.contract';
import { ProductType } from '../entities/product-type.entity';
export declare class PrismaProductTypeRepository implements ProductTypeRepositoryContract {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<ProductType[]>;
    findById(id: number): Promise<ProductType | null>;
    create(data: {
        name: string;
        description?: string | null;
    }): Promise<ProductType>;
    update(id: number, data: {
        name?: string;
        description?: string | null;
    }): Promise<ProductType>;
    delete(id: number): Promise<void>;
}
