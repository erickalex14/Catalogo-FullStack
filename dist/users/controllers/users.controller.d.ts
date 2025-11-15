import { UsersService } from '../services/users.service';
import { CreateUserRequest } from '../dto/create-user.request';
import { UpdateUserRequest } from '../dto/update-user.request';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("../entities/user.entity").User[]>;
    findOne(id: number): Promise<import("../entities/user.entity").User | null>;
    create(dto: CreateUserRequest): Promise<import("../entities/user.entity").User>;
    update(id: number, dto: UpdateUserRequest): Promise<import("../entities/user.entity").User>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
