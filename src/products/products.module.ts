import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { InMemoryProductRepository } from './repositories/in-memory-product.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, { provide: 'ProductRepository', useClass: InMemoryProductRepository }],
  exports: [ProductsService],
})
export class ProductsModule {}
