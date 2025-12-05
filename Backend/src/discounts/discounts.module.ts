import { Module } from '@nestjs/common';
import { DiscountsController } from './controllers/discounts.controller';
import { DiscountsService } from './services/discounts.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaDiscountRepository } from './repositories/prisma-discount.repository';

@Module({
  imports: [PrismaModule],
  controllers: [DiscountsController],
  providers: [DiscountsService, { provide: 'DiscountRepository', useClass: PrismaDiscountRepository }],
  exports: [DiscountsService],
})
export class DiscountsModule {}
