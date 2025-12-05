import { PrismaService } from '../../prisma/prisma.service';
import { UserRepositoryContract } from '../interfaces/user-repository.contract';
import { User } from '../entities/user.entity';
export declare class PrismaUserRepository implements UserRepositoryContract {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    create(data: {
        email: string;
        password: string;
        name?: string | null;
    }): Promise<User>;
    update(id: number, data: {
        password?: string;
        name?: string | null;
    }): Promise<User>;
    delete(id: number): Promise<void>;
}
