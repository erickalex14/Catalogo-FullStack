import { Module } from '@nestjs/common';
import { ProductTypesController } from './controllers/product-types.controller';
import { ProductTypesService } from './services/product-types.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaProductTypeRepository } from './repositories/prisma-product-type.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductTypesController],
  providers: [ProductTypesService, { provide: 'ProductTypeRepository', useClass: PrismaProductTypeRepository }],
  exports: [ProductTypesService],
})
export class ProductTypesModule {}
