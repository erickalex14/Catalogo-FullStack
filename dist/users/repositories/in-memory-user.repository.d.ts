import { UserRepositoryContract } from '../interfaces/user-repository.contract';
import { User } from '../entities/user.entity';
export declare class InMemoryUserRepository implements UserRepositoryContract {
    private items;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
}
