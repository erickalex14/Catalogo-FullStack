/**
 * Módulo Principal de la Aplicación
 * 
 * Este es el módulo raíz que importa y configura todos los módulos
 * de la aplicación de catálogo de tienda.
 * 
 * Módulos incluidos:
 * - ConfigModule: Configuración global (.env)
 * - PrismaModule: Conexión a base de datos PostgreSQL
 * - AuthModule: Autenticación JWT (/api/auth)
 * - UsersModule: Gestión de usuarios (/api/users)
 * - ProductTypesModule: Tipos de productos (/api/product-types)
 * - DiscountsModule: Descuentos y promociones (/api/discounts)
 * - ProductsModule: Catálogo de productos (/api/products)
 * - CombosModule: Combos de productos (/api/combos)
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { DiscountsModule } from './discounts/discounts.module';
import { ProductsModule } from './products/products.module';
import { CombosModule } from './combos/combos.module';

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Módulo de base de datos (Prisma ORM)
    PrismaModule,
    
    // Módulo de autenticación
    AuthModule,         // Autenticación JWT
    
    // Módulos de funcionalidad
    UsersModule,        // Gestión de usuarios
    ProductTypesModule, // Categorías de productos
    DiscountsModule,    // Descuentos y promociones
    ProductsModule,     // Catálogo de productos
    CombosModule,       // Combos de productos
  ],
})
export class AppModule {}
