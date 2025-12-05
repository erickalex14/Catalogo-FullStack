import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { LoginRequest, RegisterRequest, AuthResponse } from '../dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<import("../../users/entities/user.entity").User | null>;
    login(dto: LoginRequest): Promise<AuthResponse>;
    register(dto: RegisterRequest): Promise<AuthResponse>;
}
