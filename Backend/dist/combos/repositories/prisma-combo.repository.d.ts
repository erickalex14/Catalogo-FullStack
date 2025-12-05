import { PrismaService } from '../../prisma/prisma.service';
import { ComboRepositoryContract } from '../interfaces/combo-repository.contract';
import { Combo } from '../entities/combo.entity';
export declare class PrismaComboRepository implements ComboRepositoryContract {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Combo[]>;
    findById(id: number): Promise<Combo | null>;
    create(data: {
        productId: number;
        discountId?: number | null;
        nombre: string;
    }): Promise<Combo>;
    update(id: number, data: {
        productId?: number;
        discountId?: number | null;
        nombre?: string;
    }): Promise<Combo>;
    delete(id: number): Promise<void>;
}
