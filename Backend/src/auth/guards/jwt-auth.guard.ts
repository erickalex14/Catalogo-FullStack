import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard de Autenticación JWT
 * 
 * Protege las rutas que requieren autenticación.
 * Uso: @UseGuards(JwtAuthGuard) en el controlador o método
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
