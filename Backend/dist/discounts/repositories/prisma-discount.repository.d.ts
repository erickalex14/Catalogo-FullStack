import { PrismaService } from '../../prisma/prisma.service';
import { DiscountRepositoryContract } from '../interfaces/discount-repository.contract';
import { Discount } from '../entities/discount.entity';
export declare class PrismaDiscountRepository implements DiscountRepositoryContract {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Discount[]>;
    findById(id: number): Promise<Discount | null>;
    create(data: {
        porcentaje: number;
    }): Promise<Discount>;
    update(id: number, data: {
        porcentaje?: number;
    }): Promise<Discount>;
    delete(id: number): Promise<void>;
}
