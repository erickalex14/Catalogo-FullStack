import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

/**
 * Módulo de Autenticación
 * 
 * Configura JWT, Passport y provee los servicios de autenticación.
 * 
 * Rutas:
 * - POST /api/auth/login    - Iniciar sesión
 * - POST /api/auth/register - Registrar usuario
 * - GET  /api/auth/profile  - Obtener perfil (protegido)
 */
@Module({
  imports: [
    // Módulo de usuarios para acceder al servicio
    UsersModule,
    
    // Configuración de Passport
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // Configuración de JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.get<string>('JWT_SECRET') || 'supersecretkey',
        signOptions: {
          expiresIn: '24h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
