import { Module } from '@nestjs/common';
import { DiscountsController } from './controllers/discounts.controller';
import { DiscountsService } from './services/discounts.service';
import { InMemoryDiscountRepository } from './repositories/in-memory-discount.repository';

@Module({
  controllers: [DiscountsController],
  providers: [DiscountsService, { provide: 'DiscountRepository', useClass: InMemoryDiscountRepository }],
  exports: [DiscountsService],
})
export class DiscountsModule {}
