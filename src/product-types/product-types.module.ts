import { Module } from '@nestjs/common';
import { ProductTypesController } from './controllers/product-types.controller';
import { ProductTypesService } from './services/product-types.service';
import { InMemoryProductTypeRepository } from './repositories/in-memory-product-type.repository';

@Module({
  controllers: [ProductTypesController],
  providers: [ProductTypesService, { provide: 'ProductTypeRepository', useClass: InMemoryProductTypeRepository }],
  exports: [ProductTypesService],
})
export class ProductTypesModule {}
