import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../users/services/users.service';
import { LoginRequest, RegisterRequest, AuthResponse } from '../dto';

/**
 * Servicio de Autenticación
 * 
 * Maneja el login, registro y validación de usuarios.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida las credenciales del usuario
   * @param email - Email del usuario
   * @param password - Contraseña en texto plano
   * @returns Usuario si las credenciales son válidas, null si no
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * POST /api/auth/login
   * Inicia sesión y retorna el token JWT
   * @param dto - Credenciales de login
   */
  async login(dto: LoginRequest): Promise<AuthResponse> {
    const user = await this.validateUser(dto.email, dto.password);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  /**
   * POST /api/auth/register
   * Registra un nuevo usuario y retorna el token JWT
   * @param dto - Datos de registro
   */
  async register(dto: RegisterRequest): Promise<AuthResponse> {
    // Verificar si el email ya existe
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Crear el usuario
    const user = await this.usersService.create({
      email: dto.email,
      password: dto.password,
      name: dto.name,
    });

    // Generar token
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
