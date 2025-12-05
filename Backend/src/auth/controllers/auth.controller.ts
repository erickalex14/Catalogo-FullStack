import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginRequest, RegisterRequest } from '../dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

/**
 * Controlador de Autenticación
 * 
 * Maneja el login, registro y perfil del usuario.
 * Base URL: /api/auth
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /api/auth/login
   * Inicia sesión con email y contraseña
   * @param dto - Credenciales de login
   * @returns Token JWT y datos del usuario
   */
  @Post('login')
  async login(@Body() dto: LoginRequest) {
    return this.authService.login(dto);
  }

  /**
   * POST /api/auth/register
   * Registra un nuevo usuario
   * @param dto - Datos de registro
   * @returns Token JWT y datos del usuario
   */
  @Post('register')
  async register(@Body() dto: RegisterRequest) {
    return this.authService.register(dto);
  }

  /**
   * GET /api/auth/profile
   * Obtiene el perfil del usuario autenticado
   * Requiere: Bearer Token en header Authorization
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return user;
  }
}
