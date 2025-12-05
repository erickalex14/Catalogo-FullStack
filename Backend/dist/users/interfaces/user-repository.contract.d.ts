import { User } from '../entities/user.entity';
export interface UserRepositoryContract {
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
