/**
 * Punto de entrada principal de la aplicación
 * 
 * Este archivo configura e inicializa el servidor NestJS.
 * 
 * Configuración:
 * - Puerto: Definido en variable de entorno PORT (default: 3000)
 * - Prefijo global: /api (todas las rutas empiezan con /api)
 * - Validación: Habilitada con whitelist y transform
 * 
 * Rutas disponibles:
 * - /api/users         - Gestión de usuarios
 * - /api/products      - Gestión de productos
 * - /api/product-types - Gestión de tipos/categorías de productos
 * - /api/combos        - Gestión de combos de productos
 * - /api/discounts     - Gestión de descuentos y promociones
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Crear instancia de la aplicación NestJS
  const app = await NestFactory.create(AppModule);
  
  // Obtener configuración del servicio
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 4000;

  // Habilitar CORS para permitir solicitudes desde el frontend en localhost:3000
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  
  // Configurar prefijo global para todas las rutas API
  app.setGlobalPrefix('api');
  
  // Configurar validación global de DTOs
  // whitelist: elimina propiedades no definidas en el DTO
  // transform: convierte automáticamente los tipos
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  // Iniciar servidor
  await app.listen(port);
  console.log(`Servidor iniciado en http://localhost:${port}`);
}

bootstrap();
