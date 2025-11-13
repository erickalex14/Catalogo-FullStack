import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { DiscountsModule } from './discounts/discounts.module';
import { ProductsModule } from './products/products.module';
import { CombosModule } from './combos/combos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    ProductTypesModule,
    DiscountsModule,
    ProductsModule,
    CombosModule,
  ],
})
export class AppModule {}
