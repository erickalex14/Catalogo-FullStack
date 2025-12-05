import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/services/users.service';

/**
 * Payload del token JWT
 */
export interface JwtPayload {
  sub: number;    // ID del usuario
  email: string;  // Email del usuario
}

/**
 * Estrategia JWT para Passport
 * 
 * Valida el token JWT en cada request protegida.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'supersecretkey',
    });
  }

  /**
   * Valida el payload del token y retorna el usuario
   * Este método es llamado automáticamente por Passport
   */
  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);
    
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Retorna el usuario sin la contraseña
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
