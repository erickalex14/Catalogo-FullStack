import { AuthService } from '../services/auth.service';
import { LoginRequest, RegisterRequest } from '../dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginRequest): Promise<import("../dto").AuthResponse>;
    register(dto: RegisterRequest): Promise<import("../dto").AuthResponse>;
    getProfile(user: any): Promise<any>;
}
