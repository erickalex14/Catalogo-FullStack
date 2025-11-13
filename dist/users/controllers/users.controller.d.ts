import { UsersService } from '../services/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("../entities/user.entity").User[]>;
    findOne(id: number): Promise<import("../entities/user.entity").User | null>;
}
