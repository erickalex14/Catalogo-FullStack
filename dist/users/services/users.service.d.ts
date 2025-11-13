import { UserRepositoryContract } from '../interfaces/user-repository.contract';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryContract);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
}
