import { UserRepositoryContract } from '../interfaces/user-repository.contract';
import { User } from '../entities/user.entity';
import { CreateUserRequest } from '../dto/create-user.request';
import { UpdateUserRequest } from '../dto/update-user.request';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryContract);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    create(payload: CreateUserRequest): Promise<User>;
    update(id: number, payload: UpdateUserRequest): Promise<User>;
    delete(id: number): Promise<void>;
}
