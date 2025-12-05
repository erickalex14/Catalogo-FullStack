import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaProductRepository } from './repositories/prisma-product.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService, { provide: 'ProductRepository', useClass: PrismaProductRepository }],
  exports: [ProductsService],
})
export class ProductsModule {}
