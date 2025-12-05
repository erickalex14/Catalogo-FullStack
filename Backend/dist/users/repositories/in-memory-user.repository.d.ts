import { UserRepositoryContract } from '../interfaces/user-repository.contract';
import { User } from '../entities/user.entity';
export declare class InMemoryUserRepository implements UserRepositoryContract {
    private items;
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
